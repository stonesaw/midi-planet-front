import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export const HeaderAccount = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") return null;

  if (session.status === "unauthenticated")
    return (
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
    );

  if (!session.data?.user?.image || !session.data?.user?.name) return null;

  return (
    <Menu>
      <MenuButton>
        <HStack cursor="pointer" p="2">
          <Avatar
            w="8"
            h="8"
            src={session.data.user.image}
            name={session.data.user.name}
          />
          <TriangleDownIcon color="gray.500" />
        </HStack>
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => signOut()}>Logout</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};
