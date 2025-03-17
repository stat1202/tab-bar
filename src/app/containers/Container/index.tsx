import React from "react";
import styles from "./Container.module.scss";
import classNames from "classnames/bind";
import Title from "@/app/components/Title";

const cx = classNames.bind(styles);

type Props = {
  id: string;
  index: number;
};

export default function Container({ id, index }: Props) {
  return (
    <div className={cx("wrap")}>
      <div id={id} style={{ scrollMarginTop: "32px" }}>
        <Title index={index + 1} />
      </div>
    </div>
  );
}
