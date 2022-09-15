import { ChakraProvider } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import type { AppProps } from "next/app";

import Meta from "@/components/meta";
import { theme } from "@/libs/theme";
import { CustomPageProps, NextPageWithLayout } from "@/types/page";

import "../styles/global.css";

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
      <Meta
        title={title}
        description={description}
        keywords={keywords}
        isIndex={isIndex}
      />
      <ChakraProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          {getLayout(<Component {...otherPageProps} />)}
        </DndProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
