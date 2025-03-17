"use client";
import React from "react";

type Props = {
  index: number;
};

const Title = ({ index }: Props) => {
  return <h2>Title {index}</h2>;
};

export default Title;
