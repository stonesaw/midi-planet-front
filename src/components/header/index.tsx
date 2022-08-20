import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Hide } from "@chakra-ui/react";
import { useState } from "react";

import NavItems from "./navItems";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
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
          <Heading
            as="h1"
            size="lg"
            letterSpacing={"tighter"}
            color="brand.400"
          >
            MIDI Video
          </Heading>

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
            base: isOpen ? "flex" : "none",
            md: "flex",
          }}
        >
          <NavItems />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
