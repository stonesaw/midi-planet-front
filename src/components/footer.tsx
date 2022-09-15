import {
  Box,
  Stack,
  Heading,
  Link,
  Text,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { Title } from "@/components/title";

const Footer = () => {
  return (
    <Box as="header" bgColor="white">
      <Grid
        as="nav"
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(4, 1fr)",
        }}
        gap={4}
        maxW="4xl"
        mx="auto"
        p={4}
        flexDir={{
          base: "column",
          md: "row",
        }}
      >
        <GridItem colSpan={2}>
          <Flex flexDir="column" align="center" justify="center" height="100%">
            <Title />
            <Text fontSize="lg" color="gray.500">
              Powered by
            </Text>
            <Text fontSize="lg" color="gray.500">
              Serpent
            </Text>
          </Flex>
        </GridItem>

        <GridItem colSpan={1}>
          <Stack mx="auto" w="fit-content">
            <Heading as="h2" size="lg" letterSpacing={"tighter"}>
              Meta
            </Heading>
            <NextLink href="/home" passHref>
              <Link fontSize="lg">Home</Link>
            </NextLink>
            <NextLink href="/home" passHref>
              <Link fontSize="lg">Home</Link>
            </NextLink>
            <NextLink href="/home" passHref>
              <Link fontSize="lg">Home</Link>
            </NextLink>
            <NextLink href="/home" passHref>
              <Link fontSize="lg">Home</Link>
            </NextLink>
          </Stack>
        </GridItem>

        <GridItem colSpan={1}>
          <Stack mx="auto" w="fit-content">
            <Heading as="h2" size="lg" letterSpacing={"tighter"}>
              Page
            </Heading>
            <NextLink href="/home" passHref>
              <Link fontSize="lg">Home</Link>
            </NextLink>
            <NextLink href="/home" passHref>
              <Link fontSize="lg">Home</Link>
            </NextLink>
            <NextLink href="/home" passHref>
              <Link fontSize="lg">Home</Link>
            </NextLink>
            <NextLink href="/home" passHref>
              <Link fontSize="lg">Home</Link>
            </NextLink>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Footer;
