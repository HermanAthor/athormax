"use client";
import React from "react";
import { RecoilRoot } from "recoil";

export default function RecoilProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
