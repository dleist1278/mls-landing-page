import React, { useRef, useEffect, useState } from "react";

const studioCards = [
{ title: "Interactive Guide", sub: "Step-by-step implementation", body: "Know exactly what to do next through guided phases, prompts, and progress tracking designed to keep you moving.", accent: "#4D5E49" },
{ title: "Done-for-You Tools", sub: "Templates that save time", body: "Open ready-made templates, checklists, parent resources, and operational tools without starting from scratch.", accent: "#6B7E67" },
{ title: "The Village", sub: "Community support built in", body: "Ask questions, get unstuck, and build alongside mothers walking through the same process with you.", accent: "#C4956A" }];


export default function WalkAwaySection() {
  const headerRef = useRef(null);
  const portalRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [portalVisible, setPortalVisible] = useState(false);

  useEffect(() => {
    const makeObs = (setter) => new IntersectionObserver(([e]) => {if (e.isIntersecting) setter(true);}, { threshold: 0.06 });
    const o1 = makeObs(setHeaderVisible);
    const o2 = makeObs(setPortalVisible);
    if (headerRef.current) o1.observe(headerRef.current);
    if (portalRef.current) o2.observe(portalRef.current);
    return () => {o1.disconnect();o2.disconnect();};
  }, []);

  return null;




























































































}