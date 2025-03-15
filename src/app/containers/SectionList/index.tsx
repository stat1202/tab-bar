import classNames from "classnames/bind";
import styles from "./SectionList.module.scss";

import React from "react";

import { RefObject } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Container5 from "../Container5";
import Container4 from "../Container4";
import Container3 from "../Container3";
import Container2 from "../Container2";
import Container1 from "../Container1";

interface SectionListProps {
  sectionRefs: RefObject<Record<string, HTMLElement | null>>;
}

const cx = classNames.bind(styles);

const SectionList = ({ sectionRefs }: SectionListProps) => {
  return (
    <div className={cx("wrap")}>
      <Header />
      <Container1 index={1} sectionRefs={sectionRefs} />
      <Container2 index={2} sectionRefs={sectionRefs} />
      <Container3 index={3} sectionRefs={sectionRefs} />
      <Container4 index={4} sectionRefs={sectionRefs} />
      <Container5 index={5} sectionRefs={sectionRefs} />
      <Footer />
    </div>
  );
};

export default SectionList;
