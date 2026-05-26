import React, { useRef, useEffect, useState } from "react";

const communityCards = [
{
  num: "01",
  title: "A Village That Understands",
  description: "Connect with mothers building alongside you, asking questions, sharing wins, and navigating real motherhood life together.",
  items: ["Private peer community", "Cohort-based milestone support", "Monthly live community calls", "Phase-organized groups"]
},
{
  num: "02",
  title: "Built to Keep You Moving",
  description: "Mama Launch helps you continue making progress with guided accountability, milestone momentum, and support woven into every phase.",
  items: ["Phase-by-phase checklists", "Progress tracking", "Guided action steps", "Implementation sprints"]
},
{
  num: "03",
  title: "Support Beyond Motivation",
  description: "Real answers to real questions — operational, licensing, family, and business challenges addressed with people who understand your path.",
  items: ["Ask-anything community threads", "Expert Q&A sessions", "Peer accountability pairs", "Implementation feedback"]
}];


export default function EcosystemSection() {
  const headerRef = useRef(null);
  const quoteRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setHeaderVisible(true);}, { threshold: 0.08 });
    const o2 = new IntersectionObserver(([e]) => {if (e.isIntersecting) setQuoteVisible(true);}, { threshold: 0.08 });
    if (headerRef.current) o1.observe(headerRef.current);
    if (quoteRef.current) o2.observe(quoteRef.current);
    return () => {o1.disconnect();o2.disconnect();};
  }, []);

  return null;


































































































}