import { AddIcon } from "@chakra-ui/icons";
import { Button, Table, Tbody, Td, Text, Tr, VStack } from "@chakra-ui/react";

import { BaseRow, BaseSection } from "@/components/editor/params/sections/base";
import { useEditor } from "@/providers/editor";

export const AppearanceSection = () => {
  const { singleTimeLine, setSingleTimeLine, selectedElementIndex } =
    useEditor();

  return (
    <BaseSection>
      <VStack align="flex-end">
        <Table variant="unstyled">
          <Tbody>
            <Tr>
              <Td p={2}>
                <BaseRow
                  paramName="X"
                  paramValue={singleTimeLine[selectedElementIndex].x}
                  onChange={(value) => {
                    const newTimeLine = [...singleTimeLine];
                    newTimeLine[selectedElementIndex].x = value;
                    setSingleTimeLine(newTimeLine);
                  }}
                />
              </Td>
              <Td p={2}>
                <BaseRow
                  paramName="Y"
                  paramValue={singleTimeLine[selectedElementIndex].y}
                  onChange={(value) => {
                    const newTimeLine = [...singleTimeLine];
                    newTimeLine[selectedElementIndex].y = value;
                    setSingleTimeLine(newTimeLine);
                  }}
                />
              </Td>
            </Tr>
            <Tr>
              <Td p={2}>
                <BaseRow
                  paramName="W"
                  paramValue={singleTimeLine[selectedElementIndex].width}
                  onChange={(value) => {
                    const newTimeLine = [...singleTimeLine];
                    newTimeLine[selectedElementIndex].width = value;
                    setSingleTimeLine(newTimeLine);
                  }}
                />
              </Td>
              <Td p={2}>
                <BaseRow
                  paramName="H"
                  paramValue={singleTimeLine[selectedElementIndex].height}
                  onChange={(value) => {
                    const newTimeLine = [...singleTimeLine];
                    newTimeLine[selectedElementIndex].height = value;
                    setSingleTimeLine(newTimeLine);
                  }}
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
