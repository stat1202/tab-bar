import classNames from "classnames/bind";
import styles from "./SectionList.module.scss";

import React from "react";

import Header from "../Header";
import Footer from "../Footer";
import Container from "../Container";
import { FILTER } from "../Navigation";

const cx = classNames.bind(styles);

const SectionList = () => {
  return (
    <div className={cx("wrap")}>
      <Header />
      {FILTER.map((f) => {
        return <Container key={f.id} index={f.index} id={f.id} />;
      })}
      <Footer />
    </div>
  );
};

export default SectionList;
