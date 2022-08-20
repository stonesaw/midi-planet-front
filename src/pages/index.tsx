import React, { ReactElement } from "react";

import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      isIndex: true,
    },
  };
};

const HomePage = () => {
  return <p>hello world</p>;
};

export default HomePage;
