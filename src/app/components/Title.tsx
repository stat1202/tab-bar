"use client";
import React, { forwardRef, Ref } from "react";

type Props = {
  index: number;
};

const Title = forwardRef(({ index }: Props, ref: Ref<HTMLHeadingElement>) => {
  return <h2 ref={ref}>Title {index}</h2>;
});

Title.displayName = "Title";

export default Title;
