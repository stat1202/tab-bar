"use client";
import classNames from "classnames/bind";
import styles from "./Navigation.module.scss";
import { useEffect, useState } from "react";

export const FILTER = [
  {
    id: "section_1",
    index: 0,
  },
  {
    id: "section_2",
    index: 1,
  },
  {
    id: "section_3",
    index: 2,
  },
  {
    id: "section_4",
    index: 3,
  },
  {
    id: "section_5",
    index: 4,
  },
];

const cx = classNames.bind(styles);

const debounce = (func: () => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
};

const Navigation = () => {
  const [tab, setTab] = useState(-1);
  const handleTabClick = (index: number) => {
    const section = FILTER.find((filter) => filter.index === index);
    if (section) {
      const sectionElement = document.getElementById(section?.id);
      const navElement = document.getElementById(`nav-${section?.id}`);
      sectionElement?.scrollIntoView({ behavior: "smooth" });
      navElement?.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
    setTab(index);
  };

  useEffect(() => {
    const sectionOffsets = Object.values(FILTER).map((section) => {
      const sectionElement = document.getElementById(section.id);
      const positionY = sectionElement?.getBoundingClientRect().bottom ?? 0;

      return {
        absPositionY: positionY + window.scrollY,
      };
    });

    const handleScroll = debounce(() => {
      console.log("scoll Event!!");
      const currentScrollY = window.scrollY;
      let nextTab = -1;

      for (const filterInfo of FILTER) {
        const absPositionY = sectionOffsets[filterInfo.index].absPositionY;
        if (absPositionY < currentScrollY + 64) {
          nextTab = filterInfo.index;
        }
      }
      const section = FILTER.find((filter) => filter.index === nextTab);
      const navElement = document.getElementById(`nav-${section?.id}`);
      navElement?.scrollIntoView({ behavior: "smooth", inline: "center" });
      setTab(nextTab);
    }, 50);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={cx("wrap")}>
      <div
        className={cx(
          "border",
          { active_tab0: tab === 0 },
          { active_tab1: tab === 1 },
          { active_tab2: tab === 2 },
          { active_tab3: tab === 3 },
          { active_tab4: tab === 4 }
        )}
      />
      {FILTER.map((section) => {
        const isActive = section.index === tab;
        return (
          <button
            key={section.id}
            id={`nav-${section.id}`}
            className={cx("button", { active: isActive })}
            onClick={() => {
              handleTabClick(section.index);
            }}
          >
            {section.id}
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
