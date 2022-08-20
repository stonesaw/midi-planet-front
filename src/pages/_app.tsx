import { ChakraProvider } from "@chakra-ui/react";
import { useReducer } from "react";

import type { AppProps } from "next/app";

import { CustomPageProps, NextPageWithLayout } from "@/types/page";
import { theme } from "@/libs/theme";

interface CustomAppProps extends AppProps {
  Component: NextPageWithLayout;
  pageProps: CustomPageProps;
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  const { title, description, keywords, isIndex, ...otherPageProps } =
    pageProps;

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <ChakraProvider theme={theme}>
        {getLayout(<Component {...otherPageProps} />)}
      </ChakraProvider>
    </>
  );
}

export default MyApp;
