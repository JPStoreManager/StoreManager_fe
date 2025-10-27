import { ReactNode } from "react";

interface ContentLayoutComp {
  title: JSX.Element;
  content: JSX.Element;
  footer?: ReactNode;
  showLoading?: boolean;
}


export type {ContentLayoutComp};