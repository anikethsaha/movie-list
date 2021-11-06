import axios from "axios";

/** This replicate a LRU caching */
export class InMemoryCache {
  constructor(options) {
    this.cache = new Map();
    this.queue = [];
    this.cacheSize = options?.cacheSize ?? 10;
  }

  /**
   * Check whether the item is present or not in the memory
   * If present, then move the item at the end of the queue
   * @param {string} item
   */
  check(item) {
    if (this.cache.has(item)) {
      const idx = this.queue.indexOf(item);
      if (idx > -1) {
        this.queue.splice(idx, 1);
      }
      this.queue.push(item);
      return { val: this.cache.get(item), isPresent: true };
    }

    return { isPresent: false, val: null };
  }

  /**
   * Set the item in the cache and update the queue
   * @param {string} item
   * @param {string} val
   */
  _set(item, val) {
    const idx = this.queue.indexOf(item);
    if (idx > -1) {
      // if the item is already present in the queue, we need to move it at the end
      this.queue.splice(idx, 1);
    }

    if (this.queue.length > this.cacheSize) {
      // if the cache size exceeding, remove the least recently cached item
      this.queue.shift();
    }

    this.queue.push(item);
    this.cache.set(item, val);
    return val;
  }

  /**
   * remove the item from the cache and queue
   * @param {string} item
   */
  _clear(item) {
    if (this.cache.has(item)) {
      this.cache.delete(item);
    }
    const idx = this.queue.indexOf(item);
    if (idx > -1) {
      this.queue.splice(idx, ``);
    }
  }

  /**
   * Fetch the URL with proper cache checks and response checks
   * @param {string} url
   */
  async fetch(url) {
    const { isPresent, val } = this.check(url);
    if (isPresent) return val;
    /** Else, Fetch first and then update the cache */

    try {
      const res = axios.get(url);
      this._set(url, res);
      return res;
    } catch (err) {
      console.error(err);
      this.clear(url);
      return;
    }
  }
}
