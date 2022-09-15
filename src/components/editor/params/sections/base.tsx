import {
  Box,
  Heading,
  HStack,
  NumberInput,
  NumberInputField,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
}

export const BaseSection = ({ title, children }: Props) => {
  return (
    <VStack align="flex-start">
      <Heading size="md" as="h2" color="gray.50">
        {title}
      </Heading>
      <Box w="100%">{children}</Box>
    </VStack>
  );
};

interface BaseRowProps {
  paramName: string;
  paramValue: number;
  onChange: (value: number) => void;
}

export const BaseRow = ({ paramName, paramValue, onChange }: BaseRowProps) => (
  <HStack fontSize="lg" spacing={4}>
    <Text color="gray.50" as="span" width="1" textAlign="center">
      {paramName}
    </Text>
    <Text color="gray.50" as="span">
      :
    </Text>
    <NumberInput
      color="gray.50"
      defaultValue={paramValue}
      min={0}
      onChange={(value) => onChange(Number(value))}
    >
      <NumberInputField borderColor="gray.500" pl={2} pr={2} />
    </NumberInput>
  </HStack>
);

interface BaseRowOptionalProps {
  paramName: string;
  paramValue?: number;
  onChange: (value?: number) => void;
}

export const BaseRowOptional = ({
  paramName,
  paramValue,
  onChange,
}: BaseRowOptionalProps) => (
  <HStack fontSize="lg" spacing={4}>
    <Text color="gray.50" as="span" width="1" textAlign="center">
      {paramName}
    </Text>
    <Text color="gray.50" as="span">
      :
    </Text>
    <NumberInput
      color="gray.50"
      defaultValue={paramValue}
      min={0}
      onChange={(value) => onChange(Number(value))}
    >
      <NumberInputField borderColor="gray.500" pl={2} pr={2} />
    </NumberInput>
  </HStack>
);
