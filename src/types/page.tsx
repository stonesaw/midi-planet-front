import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

interface BasePageProps {
  title?: string;
  description?: string;
  keywords?: string;
  isIndex: boolean;
}

export type CustomPageProps = BasePageProps;

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
