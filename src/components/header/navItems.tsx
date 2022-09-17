import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import NextLink from "next/link";

import { HeaderAccount } from "@/components/header/account";

interface Props {
  onModalOpen: () => void;
}

const NavItems = ({ onModalOpen }: Props) => (
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
    <Button
      leftIcon={<AddIcon />}
      colorScheme="brand"
      variant="outline"
      onClick={onModalOpen}
    >
      Create
    </Button>
    <HeaderAccount />
  </>
);
export default NavItems;
