import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

interface BasePageProps {
  title?: string;
  description?: string;
  keywords?: string;
  isIndex: boolean;
}

export type CustomPageProps = BasePageProps;

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
