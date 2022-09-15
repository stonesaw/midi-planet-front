import { NextPage } from "next";
import { Session } from "next-auth";
import { ReactElement, ReactNode } from "react";

interface BasePageProps {
  session: Session;
  title?: string;
  description?: string;
  keywords?: string;
  isIndex: boolean;
}

export type CustomPageProps = BasePageProps;

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
