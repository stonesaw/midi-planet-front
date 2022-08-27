import { Box, Grid } from "@chakra-ui/react";
import { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

export const VanillaLayout = ({ children }: Props) => {
  return (
    <Grid templateColumns="100%" templateRows="1fr" minH="100vh">
      <Box as="main">{children}</Box>
    </Grid>
  );
};

export default VanillaLayout;
