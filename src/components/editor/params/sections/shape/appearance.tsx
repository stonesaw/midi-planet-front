import { AddIcon } from "@chakra-ui/icons";
import { Button, Table, Tbody, Td, Text, Tr, VStack } from "@chakra-ui/react";

import { BaseRow, BaseSection } from "@/components/editor/params/sections/base";
import { useEditor } from "@/providers/editor";

export const MIDIAppearanceSection = () => {
  const { singleTimeLine, setSingleTimeLine, selectedElementIndex } =
    useEditor();

  const currentElm = singleTimeLine[selectedElementIndex];
  if (!("shape" in currentElm)) return <></>;

  return (
    <BaseSection title="Notes">
      <VStack align="flex-end">
        <Table variant="unstyled">
          <Tbody>
            <Tr>
              <Td p={2}>
                <BaseRow
                  paramName="ox"
                  paramValue={currentElm.shape.x}
                  onChange={(value) => {
                    const newTimeLine = [...singleTimeLine];
                    const a = newTimeLine[selectedElementIndex];
                    if ("shape" in a) a.shape.x = value;
                    setSingleTimeLine(newTimeLine);
                  }}
                />
              </Td>
              <Td p={2}>
                <BaseRow
                  paramName="oy"
                  paramValue={currentElm.shape.y}
                  onChange={(value) => {
                    const newTimeLine = [...singleTimeLine];
                    const a = newTimeLine[selectedElementIndex];
                    if ("shape" in a) a.shape.y = value;
                    setSingleTimeLine(newTimeLine);
                  }}
                />
              </Td>
            </Tr>
            <Tr>
              <Td p={2}>
                <BaseRow
                  paramName="W"
                  paramValue={currentElm.shape.width}
                  onChange={(value) => {
                    const newTimeLine = [...singleTimeLine];
                    const a = newTimeLine[selectedElementIndex];
                    if ("shape" in a) a.shape.width = value;
                    setSingleTimeLine(newTimeLine);
                  }}
                />
              </Td>
              <Td p={2}>
                <BaseRow
                  paramName="H"
                  paramValue={currentElm.shape.height}
                  onChange={(value) => {
                    const newTimeLine = [...singleTimeLine];
                    const a = newTimeLine[selectedElementIndex];
                    if ("shape" in a) a.shape.height = value;
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
