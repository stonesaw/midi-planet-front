import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import NextLink from "next/link";

import { HeaderAccount } from "@/components/header/account";

const NavItems = () => (
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
    <HeaderAccount />
  </>
);
export default NavItems;
