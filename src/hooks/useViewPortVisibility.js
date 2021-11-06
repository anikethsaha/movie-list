import { useEffect, useState } from "react";

/**
 * hook to check for the visibility of an element (ref) in the viewport
 * @param {React.Ref} ref
 * @param {Array} dep
 */
export default function useViewPortVisibility(ref, dep = []) {
  const [isVisible, setVisibity] = useState(false);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => setVisibity(entry.isIntersecting));
    },
    /** Half of the element should be visible */
    { threshold: 0.5 }
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible, ...dep]);

  return { isVisible };
}
