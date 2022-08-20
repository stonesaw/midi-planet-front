import { Box, Grid } from "@chakra-ui/react";
import { ReactElement } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";

interface Props {
  children: ReactElement;
}

const HeaderFooterLayout = ({ children }: Props) => {
  return (
    <Grid templateColumns="100%" templateRows="auto 1fr auto" minH="100vh">
      <Header />
      <Box as="main">{children}</Box>
      <Footer />
    </Grid>
  );
};

export default HeaderFooterLayout;
