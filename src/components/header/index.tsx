import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Hide, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import NavItems from "./navItems";

import { CreateProjectModal } from "@/components/modals/createProject";
import { Title } from "@/components/title";

const Header = () => {
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleToggle = () => {
    setIsHeaderOpen(!isHeaderOpen);
  };

  return (
    <Box as="header" bgColor="white">
      <Flex
        as="nav"
        align="stretch"
        justify="space-between"
        maxW="6xl"
        mx="auto"
        p={4}
        flexDir={{
          base: "column",
          md: "row",
        }}
        gap={4}
      >
        <Flex align="center" justify="space-between">
          <Title />
          <Hide above="md">
            <Box onClick={handleToggle}>
              <HamburgerIcon />
            </Box>
          </Hide>
        </Flex>

        <Flex
          align="center"
          justify="flex-end"
          flexDir={{
            base: "column",
            md: "row",
          }}
          gap={4}
          display={{
            base: isHeaderOpen ? "flex" : "none",
            md: "flex",
          }}
        >
          <NavItems onModalOpen={onOpen} />
        </Flex>
      </Flex>
      <CreateProjectModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Header;
