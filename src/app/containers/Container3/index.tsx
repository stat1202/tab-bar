import styles from "./Container3.module.scss";
import Title from "@/app/components/Title";
import classNames from "classnames/bind";
import React, { RefObject } from "react";

type Props = {
  index: number;
  sectionRefs: RefObject<Record<string, HTMLElement | null>>;
};

const cx = classNames.bind(styles);

const Container3 = ({ index, sectionRefs }: Props) => {
  return (
    <div className={cx("wrap")}>
      <Title
        index={index}
        ref={(el) => {
          if (sectionRefs.current) {
            sectionRefs.current["section3"] = el; // 반환값 없음
          }
        }}
      />
      Container3
    </div>
  );
};

export default Container3;
