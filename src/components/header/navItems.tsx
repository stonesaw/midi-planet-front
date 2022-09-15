import { AddIcon } from "@chakra-ui/icons";
import { Link, Button } from "@chakra-ui/react";
import NextLink from "next/link";

const NavItems = () => {
  return (
    <>
      <NextLink href="/" passHref>
        <Button colorScheme="brand" variant="ghost">
          Home
        </Button>
      </NextLink>

      <NextLink href="/home" passHref>
        <Button colorScheme="brand" variant="ghost">
          Find
        </Button>
      </NextLink>

      <NextLink href="/editor" passHref>
        <Button leftIcon={<AddIcon />} colorScheme="brand" variant="outline">
          Create
        </Button>
      </NextLink>

      <NextLink href="/login" passHref>
        <Link
          _hover={{ bg: "brand.500" }}
          backgroundColor="brand.400"
          color="white"
          fontSize="lg"
          px={4}
          py={1.5}
          borderRadius="md"
          fontWeight={600}
        >
          Login
        </Link>
      </NextLink>
    </>
  );
};

export default NavItems;
