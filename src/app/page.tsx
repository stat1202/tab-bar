"use client";
import SectionList from "./containers/SectionList";
import Navigation from "./containers/Navigation";

export interface Section {
  id: string;
  title: string;
}

export default function Home() {
  return (
    <>
      <Navigation />
      <SectionList />
    </>
  );
}
