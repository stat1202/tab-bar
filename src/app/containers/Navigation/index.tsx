"use client";
import { Section } from "@/app/page";
import classNames from "classnames/bind";
import styles from "./Navigation.module.scss";
import { RefObject } from "react";
// import { useRef } from "react";

interface NavigationProps {
  sections: Section[];
  activeTab: string;
  onNavClick: (id: string) => void;
  navRef: RefObject<HTMLElement | null>; // 추가된 네비게이션 ref
}

const cx = classNames.bind(styles);

const Navigation = ({
  sections,
  activeTab,
  onNavClick,
  navRef,
}: // refs,
NavigationProps) => {
  // const navRef = useRef<HTMLDivElement | null>(null);

  const handleNavClick = (id: string) => {
    onNavClick(id);

    // 해당 섹션으로 스크롤 이동
    // const targetElement = refs.current?.[id];
    // if (targetElement) {
    //   targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    // }

    // 현재 클릭된 버튼 위치로 nav 내부 스크롤 이동
    const buttonElement = document.getElementById(`nav-btn-${id}`);
    if (buttonElement && navRef.current) {
      navRef.current.scrollTo({
        left:
          buttonElement.offsetLeft -
          navRef.current.clientWidth / 2 +
          buttonElement.clientWidth / 2,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav ref={navRef} className={cx("wrap")}>
      {sections.map((section) => (
        <button
          key={section.id}
          id={`nav-btn-${section.id}`}
          onClick={() => handleNavClick(section.id)}
          className={cx("button", { active: activeTab === section.id })}
        >
          {section.title}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
