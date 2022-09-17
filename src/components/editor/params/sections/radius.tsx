import { Table, Tbody, Td, Tr, VStack } from "@chakra-ui/react";

import { BaseSectionOptional, BaseRow } from "./base";

import { useEditor } from "@/providers/editor";
import { Radius } from "@/types/editor/element";

export const RadiusSection = () => {
  const { singleTimeLine, setSingleTimeLine, selectedElementIndex } =
    useEditor();

  const DEFAULT_RADIUS_PARAMS: Radius = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
  };

  const currentElm = singleTimeLine[selectedElementIndex];
  if (!("radius" in currentElm)) return <></>;

  return (
    <BaseSectionOptional
      title="Radius"
      isExistContent={currentElm?.radius ? true : false}
      onAdd={() => {
        const newTimeLine = [...singleTimeLine];
        const a = newTimeLine[selectedElementIndex];
        if ("radius" in a) a.radius = DEFAULT_RADIUS_PARAMS;
        setSingleTimeLine(newTimeLine);
      }}
      onRemove={() => {
        const newTimeLine = [...singleTimeLine];
        const a = newTimeLine[selectedElementIndex];
        if ("radius" in a) a.radius = undefined;
        setSingleTimeLine(newTimeLine);
      }}
    >
      {currentElm.radius && (
        <VStack align="flex-end">
          <Table variant="unstyled">
            <Tbody>
              <Tr>
                <Td p={2}>
                  <BaseRow
                    paramName="┌"
                    paramValue={currentElm.radius.topLeft}
                    onChange={(value) => {
                      const newTimeLine = [...singleTimeLine];
                      const a = newTimeLine[selectedElementIndex];
                      if ("radius" in a) {
                        if (a.radius) a.radius.topLeft = value;
                      }
                      setSingleTimeLine(newTimeLine);
                    }}
                  />
                </Td>
                <Td p={2}>
                  <BaseRow
                    paramName="┐"
                    paramValue={currentElm.radius.topRight}
                    onChange={(value) => {
                      const newTimeLine = [...singleTimeLine];
                      const a = newTimeLine[selectedElementIndex];
                      if ("radius" in a) {
                        if (a.radius) a.radius.topRight = value;
                      }
                      setSingleTimeLine(newTimeLine);
                    }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td p={2}>
                  <BaseRow
                    paramName="└"
                    paramValue={currentElm.radius.bottomLeft}
                    onChange={(value) => {
                      const newTimeLine = [...singleTimeLine];
                      const a = newTimeLine[selectedElementIndex];
                      if ("radius" in a) {
                        if (a.radius) a.radius.bottomLeft = value;
                      }
                      setSingleTimeLine(newTimeLine);
                    }}
                  />
                </Td>
                <Td p={2}>
                  <BaseRow
                    paramName="┘"
                    paramValue={currentElm.radius.bottomRight}
                    onChange={(value) => {
                      const newTimeLine = [...singleTimeLine];
                      const a = newTimeLine[selectedElementIndex];
                      if ("radius" in a) {
                        if (a.radius) a.radius.bottomRight = value;
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
