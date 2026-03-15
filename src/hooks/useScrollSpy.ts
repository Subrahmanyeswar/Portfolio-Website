"use client";

import { useState, useEffect, useCallback } from "react";

export function useScrollSpy(
  sectionIds: string[],
  offset: number = 200
): string {
  const [activeSection, setActiveSection] = useState<string>("");

  const handleScroll = useCallback(() => {
    let current = "";
    const scrollPosition = window.scrollY + offset;

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        const top = element.offsetTop;
        const height = element.offsetHeight;
        
        // If scroll position is within this section
        if (scrollPosition >= top && scrollPosition < top + height) {
          current = id;
        }
      }
    }

    // Special case for reaching the bottom of the page
    if (
      window.innerHeight + Math.round(window.scrollY) >=
      document.body.offsetHeight - 50
    ) {
      // Set to the last section
      current = sectionIds[sectionIds.length - 1];
    }
    
    // Default to the first section if at top
    if (window.scrollY === 0 && sectionIds.length > 0) {
      current = sectionIds[0];
    }

    // Only update state if it changed
    if (current && current !== activeSection) {
      setActiveSection(current);
    }
  }, [sectionIds, offset, activeSection]);

  useEffect(() => {
    // Initial check
    handleScroll();

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Re-check on resize as section heights might change
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return activeSection || (sectionIds.length > 0 ? sectionIds[0] : "");
}
