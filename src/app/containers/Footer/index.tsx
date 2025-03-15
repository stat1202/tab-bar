import React from "react";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Footer = () => {
  return <div className={cx("wrap")}>Footer</div>;
};

export default Footer;
