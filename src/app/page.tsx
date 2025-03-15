"use client";
import { useState, useRef } from "react";
// import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import SectionList from "./containers/SectionList";
import Navigation from "./containers/Navigation";
import { useScroll } from "@/hooks/useScroll";

export interface Section {
  id: string;
  title: string;
}

const NAV_HEIGHT = 64;
const SECTIONS: Section[] = [
  { id: "section1", title: "Section 1" },
  { id: "section2", title: "Section 2" },
  { id: "section3", title: "Section 3" },
  { id: "section4", title: "Section 4" },
  { id: "section5", title: "Section 5" },
];

export default function Home() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeTab, setActiveTab] = useState(SECTIONS[0].id);
  const navRef = useRef<HTMLDivElement | null>(null);

  const handleNavClick = (id: string) => {
    const section = sectionRefs.current[id];
    if (section) {
      const sectionBottom =
        section.getBoundingClientRect().bottom + window.scrollY;
      window.scrollTo({
        top: sectionBottom - NAV_HEIGHT,
        behavior: "smooth",
      });
      setActiveTab(id);
    }
  };

  useScroll({
    refs: sectionRefs,
    sections: SECTIONS,
    onChange: (id) => setActiveTab(id),
    navHeight: NAV_HEIGHT,
    navRef,
  });
  // useIntersectionObserver({
  //   refs: sectionRefs,
  //   sections: SECTIONS,
  //   onChange: (id) => setActiveTab(id),
  //   navHeight: NAV_HEIGHT,
  // });

  return (
    <>
      <Navigation
        sections={SECTIONS}
        activeTab={activeTab}
        onNavClick={handleNavClick}
        navRef={navRef}
      />
      <SectionList sectionRefs={sectionRefs} />
    </>
  );
}
