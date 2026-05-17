import { useEffect, useRef } from "react";
import { trackScrollDepth } from "@/lib/analytics";

/**
 * Fires scroll-depth analytics events at 25%, 50%, 75%, and 100%.
 * Mount once at the page level.
 */
export default function useScrollDepth() {
  const fired = useRef(new Set());

  useEffect(() => {
    const milestones = [25, 50, 75, 100];

    function handleScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = Math.round((scrolled / total) * 100);

      milestones.forEach((m) => {
        if (pct >= m && !fired.current.has(m)) {
          fired.current.add(m);
          trackScrollDepth(m);
        }
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}