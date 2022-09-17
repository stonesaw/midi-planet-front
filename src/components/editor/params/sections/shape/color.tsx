import { Table, Tbody, Td, Tr, VStack } from "@chakra-ui/react";

import { BaseSection } from "./../base";
import { InputColor } from "./../inputColor";

import { useEditor } from "@/providers/editor";

export const MIDIColorSection = () => {
  const { singleTimeLine, setSingleTimeLine, selectedElementIndex } =
    useEditor();

  const currentElm = singleTimeLine[selectedElementIndex];
  if (!("shape" in currentElm)) return <></>;

  return (
    <BaseSection title="Notes - Color">
      <VStack align="flex-end">
        <Table variant="unstyled">
          <Tbody>
            <Tr>
              <Td p={2}>
                <InputColor
                  paramColor={currentElm.shape.background}
                  onChange={(color) => {
                    const newTimeLine = [...singleTimeLine];
                    const a = newTimeLine[selectedElementIndex];
                    if ("shape" in a) a.shape.background = color;
                    setSingleTimeLine(newTimeLine);
                  }}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </VStack>
    </BaseSection>
  );
};
