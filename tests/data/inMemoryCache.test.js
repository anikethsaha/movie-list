import { InMemoryCache } from "../../src/data/inMemoryCache";

describe("InMemoryCache", () => {
  const fetchOBj = new InMemoryCache();
  it("should fetch once ", async () => {
    await fetchOBj.fetch("https://reqres.in/api/products/3");
    await fetchOBj.fetch("https://reqres.in/api/products/3");
    expect(fetchOBj.queue.length).toBe(1);
    expect(fetchOBj.cache.size).toBe(1);
  });
});
