import { atom } from "jotai";

export const testCaseAtom = atom({
  testCaseName: "", // 初始值为空字符串
  description: "", // 初始值为空字符串
});
export const isCreatingAtom = atom(false);
