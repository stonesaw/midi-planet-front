import { Table, Tbody, Td, Tr, VStack } from "@chakra-ui/react";

import { BaseSectionOptional, BaseRow } from "./base";
import { InputColor } from "./inputColor";

import { useEditor } from "@/providers/editor";
import { Border } from "@/types/editor/element";

export const BorderParamsEditor = () => {
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
  if (!("border" in currentElm)) return <></>;

  return (
    <BaseSectionOptional
      title="Border"
      isExistContent={currentElm?.border ? true : false}
      onAdd={() => {
        const newTimeLine = [...singleTimeLine];
        const a = newTimeLine[selectedElementIndex];
        if ("border" in a) a.border = DEFAULT_BORDER_PARAMS;
        setSingleTimeLine(newTimeLine);
      }}
      onRemove={() => {
        const newTimeLine = [...singleTimeLine];
        const a = newTimeLine[selectedElementIndex];
        if ("border" in a) a.border = undefined;
        setSingleTimeLine(newTimeLine);
      }}
    >
      {currentElm.border && (
        <VStack align="flex-end">
          <Table variant="unstyled">
            <Tbody>
              <Tr>
                <Td p={2}>
                  <BaseRow
                    paramName="T"
                    paramValue={currentElm.border.size}
                    onChange={(value) => {
                      const newTimeLine = [...singleTimeLine];
                      const a = newTimeLine[selectedElementIndex];
                      if ("border" in a) {
                        if (a.border) a.border.size = value;
                      }
                      setSingleTimeLine(newTimeLine);
                    }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td p={2}>
                  <InputColor
                    paramColor={currentElm.border.color}
                    onChange={(color) => {
                      const newTimeLine = [...singleTimeLine];
                      const a = newTimeLine[selectedElementIndex];
                      if ("border" in a) {
                        if (a.border) a.border.color = color;
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
