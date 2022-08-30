import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  NumberInput,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";

import { BaseSection } from "@/components/editor/params/sections/base";

interface AppearancePartsProps {
  paramName: string;
  paramValue: number;
  onChange: (value: number) => void;
}

const AppearanceParts = ({
  paramName,
  paramValue,
  onChange,
}: AppearancePartsProps) => (
  <Td>
    <HStack>
      <Text as="span">{paramName}</Text>
      <Text as="span">:</Text>
      <NumberInput
        value={paramValue}
        onChange={(value) => onChange(Number(value))}
      >
        {paramValue}
      </NumberInput>
    </HStack>
  </Td>
);

export const AppearanceParamsEditor = () => {
  return (
    <BaseSection title="Shape">
      <Table>
        <Tbody>
          <Tr>
            <AppearanceParts
              paramName="X"
              paramValue={100}
              onChange={() => console.log("X")}
            />
            <AppearanceParts
              paramName="Y"
              paramValue={200}
              onChange={() => console.log("Y")}
            />
          </Tr>
          <Tr>
            <AppearanceParts
              paramName="W"
              paramValue={300}
              onChange={() => console.log("W")}
            />
            <AppearanceParts
              paramName="H"
              paramValue={400}
              onChange={() => console.log("H")}
            />
          </Tr>
        </Tbody>
      </Table>
      <Button leftIcon={<AddIcon />}>
        <Text>Ease</Text>
      </Button>
    </BaseSection>
  );
};
