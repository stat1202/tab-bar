import styles from "./Container2.module.scss";
import Title from "@/app/components/Title";
import classNames from "classnames/bind";
import React, { RefObject } from "react";

type Props = {
  index: number;
  sectionRefs: RefObject<Record<string, HTMLElement | null>>;
};

const cx = classNames.bind(styles);

const Container2 = ({ index, sectionRefs }: Props) => {
  return (
    <div className={cx("wrap")}>
      <Title
        index={index}
        ref={(el) => {
          if (sectionRefs.current) {
            sectionRefs.current["section2"] = el; // 반환값 없음
          }
        }}
      />
      Container2
    </div>
  );
};

export default Container2;
