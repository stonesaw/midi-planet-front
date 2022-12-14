import { Box, Text, Flex, HStack } from "@chakra-ui/react";
import Image from "next/image";

import { Title } from "@/components/title";

const Footer = () => {
  return (
    <Box as="header" bgColor="white">
      {/* <Grid
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
      > */}
      {/* <GridItem colSpan={2}> */}
      <Flex
        py="6"
        flexDir="column"
        align="center"
        justify="center"
        height="100%"
      >
        <Title />
        <Text fontSize="sm" color="gray.400" textAlign="center">
          Powered by
        </Text>
        <HStack>
          <Image src="/serpent.png" alt="Serpent Logo" width={32} height={32} />
          <Text
            fontSize="md"
            fontWeight="bold"
            color="gray.600"
            textAlign="center"
          >
            Serpent
          </Text>
        </HStack>
      </Flex>
      {/* </GridItem> */}

      {/* <GridItem colSpan={1}>
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
        </GridItem> */}
      {/* </Grid> */}
    </Box>
  );
};

export default Footer;
