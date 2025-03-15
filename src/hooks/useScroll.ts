import { useEffect, useRef, useState, RefObject, useCallback } from "react";
import { Section } from "@/app/page";

interface UseIntersectionObserverProps {
  refs: RefObject<Record<string, HTMLElement | null>>;
  sections: Section[];
  onChange: (id: string) => void;
  navHeight: number;
  navRef: RefObject<HTMLElement | null>; // 네비게이션 ref 추가
}

export function useScroll({
  refs,
  sections,
  onChange,
  navHeight,
  navRef,
}: UseIntersectionObserverProps) {
  const [index, setIndex] = useState(0);
  const sectionPositions = useRef<number[]>([]);

  useEffect(() => {
    // 각 섹션의 top 위치를 계산
    sectionPositions.current = sections.map((section) => {
      const el = refs.current[section.id];
      return el ? el.getBoundingClientRect().top + window.scrollY : 0;
    });
  }, [sections, refs]);

  const handleScroll = useCallback(() => {
    if (sectionPositions.current.length === 0) return;

    const scrollPosition = window.scrollY + navHeight;
    let newIndex = index;

    // 다음 섹션으로 이동 (다음 섹션의 top 위치보다 아래로 스크롤됐을 때)
    if (
      newIndex < sections.length - 1 &&
      scrollPosition >= sectionPositions.current[newIndex + 1]
    ) {
      newIndex += 1;
    }

    // 이전 섹션으로 이동 (현재 섹션의 top 위치보다 위로 스크롤됐을 때)
    if (newIndex > 0 && scrollPosition < sectionPositions.current[newIndex]) {
      newIndex -= 1;
    }

    if (newIndex !== index) {
      setIndex(newIndex);
      onChange(sections[newIndex].id);

      // ✅ 네비게이션 버튼을 중앙으로 이동하는 로직 추가
      const activeSectionId = sections[newIndex]?.id;
      const buttonElement = document.getElementById(
        `nav-btn-${activeSectionId}`
      );

      if (buttonElement && navRef.current) {
        navRef.current.scrollTo({
          left:
            buttonElement.offsetLeft -
            navRef.current.clientWidth / 2 +
            buttonElement.clientWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [index, sections, navHeight, onChange, navRef]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return index;
}
