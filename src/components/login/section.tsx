import { Box, HStack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  text: string;
  onClick: () => void;
}

export const LoginSection = ({ icon, text, onClick }: Props) => (
  <HStack
    spacing="4"
    mt="4"
    w="100%"
    h="fit-content"
    bg="rgba(255, 255, 255, 0.5)"
    borderRadius="md"
    p="4"
    justify="center"
    cursor="pointer"
    _hover={{
      bg: "rgba(255, 255, 255, 0.7)",
    }}
    onClick={() => onClick()}
  >
    {icon && (
      <Box pos="absolute" left="8">
        {icon}
      </Box>
    )}
    <Text fontWeight="bold">{text}でログイン</Text>
  </HStack>
);
