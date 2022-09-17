import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  NumberInput,
  NumberInputField,
  Spacer,
  Text,
  VStack,
  Button,
  Input,
  Divider,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";

interface Props {
  title?: string;
  children: ReactNode;
}

export const BaseSection = ({ title, children }: Props) => {
  return (
    <VStack align="flex-start">
      {title && (
        <Heading size="md" as="h2" color="gray.50">
          {title}
        </Heading>
      )}
      <Box w="100%">{children}</Box>
      <Divider orientation="horizontal" colorScheme="white.700" />
    </VStack>
  );
};

interface BaseSectionOptionalProps {
  title: string;
  defaultValue: boolean;
  children: ReactNode;
  onAdd: () => void;
  onRemove: () => void;
}

export const BaseSectionOptional = ({
  title,
  defaultValue,
  children,
  onAdd,
  onRemove,
}: BaseSectionOptionalProps) => {
  const [existContent, setExistContent] = useState<boolean>(defaultValue);

  const handle = () => {
    if (existContent) {
      onRemove();
    } else {
      onAdd();
    }
    setExistContent(!existContent);
  };

  return (
    <VStack align="flex-start">
      <HStack w="100%">
        <Heading size="md" as="h2" color="gray.50">
          {title}
        </Heading>
        <Spacer />
        <Button
          background="#0000"
          _hover={{ background: "#fff2" }}
          size="sm"
          onClick={handle}
        >
          {existContent ? (
            <MinusIcon color="white" />
          ) : (
            <AddIcon color="white" />
          )}
        </Button>
      </HStack>
      {existContent && <Box w="100%">{children}</Box>}
      <Divider orientation="horizontal" colorScheme="white.700" />
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
      onBlur={(e) => onChange(Number(e.target.value))}
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
      onBlur={(e) => onChange(Number(e.target.value))}
    >
      <NumberInputField borderColor="gray.500" pl={2} pr={2} />
    </NumberInput>
  </HStack>
);

interface BaseRowStringProps {
  paramName: string;
  paramValue: string;
  onChange: (value: string) => void;
}

export const BaseRowString = ({
  paramName,
  paramValue,
  onChange,
}: BaseRowStringProps) => (
  <HStack fontSize="lg" spacing={4}>
    <Text color="gray.50" as="span" width="1" textAlign="center">
      {paramName}
    </Text>
    <Text color="gray.50" as="span">
      :
    </Text>
    <Input
      color="gray.50"
      borderColor="gray.500"
      value={paramValue}
      onChange={(e) => onChange(e.target.value)}
    />
  </HStack>
);
