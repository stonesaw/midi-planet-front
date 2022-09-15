import { ChakraProvider } from "@chakra-ui/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import type { AppProps } from "next/app";

import Meta from "@/components/meta";
import { theme } from "@/libs/theme";
import { CustomPageProps, NextPageWithLayout } from "@/types/page";

interface CustomAppProps extends AppProps {
  Component: NextPageWithLayout;
  pageProps: CustomPageProps & {
    session: Session;
  };
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  const { title, description, keywords, isIndex, session, ...otherPageProps } =
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
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <DndProvider backend={HTML5Backend}>
            {getLayout(<Component {...otherPageProps} />)}
          </DndProvider>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
