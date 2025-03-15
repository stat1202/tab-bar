import { Section } from "@/app/page";
import { useEffect, RefObject } from "react";

interface UseIntersectionObserverProps {
  refs: RefObject<Record<string, HTMLElement | null>>;
  sections: Section[];
  onChange: (id: string) => void;
  navHeight: number;
}

export function useIntersectionObserver({
  refs,
  sections,
  onChange,
  navHeight,
}: UseIntersectionObserverProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Object.keys(refs.current ?? {}).find(
            (key) => refs.current![key] === entry.target
          );
          if (!id) return;

          const index = sections.findIndex((section) => section.id === id);
          if (index === -1) return;

          if (!entry.isIntersecting) {
            if (entry.boundingClientRect.top < navHeight) {
              onChange(id);
            }
          } else {
            if (entry.boundingClientRect.top > 0) {
              console.log(index, entry.boundingClientRect.top, navHeight);
              if (index === 0 && entry.boundingClientRect.top > navHeight) {
                onChange("section0"); // Section 1 위로 올라가면 'none'
              } else if (index > 0) {
                onChange(sections[index - 1].id); // 이전 섹션 ID
              }
            }
          }
        });
      },
      {
        root: null,
        rootMargin: `-${navHeight}px 0px 0px 0px`,
        threshold: 1,
      }
    );

    Object.values(refs.current ?? {}).forEach(
      (ref) => ref && observer.observe(ref)
    );
    return () => {
      Object.values(refs.current ?? {}).forEach(
        (ref) => ref && observer.unobserve(ref)
      );
    };
  }, [refs, sections, onChange, navHeight]);
}
