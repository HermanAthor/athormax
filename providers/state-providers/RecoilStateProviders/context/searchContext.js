"use client";
import { atom } from "recoil";
export const searchState = atom({
  key: "searchState",
  default: "",
});

export const movieDataState = atom({
  key: "movieData",
  default: [],
});
