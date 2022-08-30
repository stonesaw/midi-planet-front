import { AddIcon } from "@chakra-ui/icons";
import { Button, Table, Tbody, Td, Text, Tr, VStack } from "@chakra-ui/react";

import { BaseRow, BaseSection } from "@/components/editor/params/sections/base";

export const AppearanceParamsEditor = () => {
  return (
    <BaseSection title="Shape">
      <VStack align="flex-end">
        <Table variant="unstyled">
          <Tbody>
            <Tr>
              <Td p={2}>
                <BaseRow
                  paramName="X"
                  paramValue={100}
                  onChange={() => console.log("X")}
                />
              </Td>
              <Td p={2}>
                <BaseRow
                  paramName="Y"
                  paramValue={200}
                  onChange={() => console.log("Y")}
                />
              </Td>
            </Tr>
            <Tr>
              <Td p={2}>
                <BaseRow
                  paramName="W"
                  paramValue={300}
                  onChange={() => console.log("W")}
                />
              </Td>
              <Td p={2}>
                <BaseRow
                  paramName="H"
                  paramValue={400}
                  onChange={() => console.log("H")}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Button leftIcon={<AddIcon />} colorScheme="gray" size="sm">
          <Text>Ease</Text>
        </Button>
      </VStack>
    </BaseSection>
  );
};
