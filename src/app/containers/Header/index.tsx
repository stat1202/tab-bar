import React from "react";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Header = () => {
  return <div className={cx("wrap")}>Header</div>;
};

export default Header;
