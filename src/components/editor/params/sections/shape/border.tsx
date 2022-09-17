import { Table, Tbody, Td, Tr, VStack } from "@chakra-ui/react";

import { BaseSectionOptional, BaseRow } from "./../base";
import { InputColor } from "./../inputColor";

import { useEditor } from "@/providers/editor";
import { Border } from "@/types/editor/element";

export const MIDIBorderSection = () => {
  const { singleTimeLine, setSingleTimeLine, selectedElementIndex } =
    useEditor();

  const DEFAULT_BORDER_PARAMS: Border = {
    size: 1,
    color: {
      rgb: [0, 0, 0],
      alpha: 255,
    },
  };

  const currentElm = singleTimeLine[selectedElementIndex];
  if (!("shape" in currentElm && "border" in currentElm.shape)) return <></>;

  return (
    <BaseSectionOptional
      title="Notes - Border"
      isExistContent={currentElm?.shape.border ? true : false}
      onAdd={() => {
        const newTimeLine = [...singleTimeLine];
        const a = newTimeLine[selectedElementIndex];
        if ("shape" in a && "border" in a.shape)
          a.shape.border = DEFAULT_BORDER_PARAMS;
        setSingleTimeLine(newTimeLine);
      }}
      onRemove={() => {
        const newTimeLine = [...singleTimeLine];
        const a = newTimeLine[selectedElementIndex];
        if ("shape" in a && "border" in a.shape) a.shape.border = undefined;
        setSingleTimeLine(newTimeLine);
      }}
    >
      {currentElm.shape.border && (
        <VStack align="flex-end">
          <Table variant="unstyled">
            <Tbody>
              <Tr>
                <Td p={2}>
                  <BaseRow
                    paramName="T"
                    paramValue={currentElm.shape.border.size}
                    onChange={(value) => {
                      const newTimeLine = [...singleTimeLine];
                      const a = newTimeLine[selectedElementIndex];
                      if ("shape" in a && "border" in a.shape) {
                        if (a.shape.border) a.shape.border.size = value;
                      }
                      setSingleTimeLine(newTimeLine);
                    }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td p={2}>
                  <InputColor
                    paramColor={currentElm.shape.border.color}
                    onChange={(color) => {
                      const newTimeLine = [...singleTimeLine];
                      const a = newTimeLine[selectedElementIndex];
                      if ("shape" in a && "border" in a.shape) {
                        if (a.shape.border) a.shape.border.color = color;
                      }
                      setSingleTimeLine(newTimeLine);
                    }}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </VStack>
      )}
    </BaseSectionOptional>
  );
};
