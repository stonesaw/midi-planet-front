import React, { ReactElement } from "react";

import type { GetServerSideProps } from "next";

import HeaderFooterLayout from "@/components/layouts/headerFooter";
import { CustomPageProps, NextPageWithLayout } from "@/types/page";

export const getServerSideProps: GetServerSideProps<
  CustomPageProps
> = async () => {
  return {
    props: {
      isIndex: true,
    },
  };
};

const HomePage: NextPageWithLayout = () => {
  return <p>hello world</p>;
};

HomePage.getLayout = (page: ReactElement) => {
  return <HeaderFooterLayout>{page}</HeaderFooterLayout>;
};

export default HomePage;
