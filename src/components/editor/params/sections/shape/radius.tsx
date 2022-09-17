import { Table, Tbody, Td, Tr, VStack } from "@chakra-ui/react";

import { BaseSectionOptional, BaseRow } from "./../base";

import { useEditor } from "@/providers/editor";
import { Radius } from "@/types/editor/element";

export const MIDIRadiusSection = () => {
  const { singleTimeLine, setSingleTimeLine, selectedElementIndex } =
    useEditor();

  const DEFAULT_RADIUS_PARAMS: Radius = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
  };

  const currentElm = singleTimeLine[selectedElementIndex];
  if (!("shape" in currentElm && "radius" in currentElm.shape)) return <></>;

  return (
    <BaseSectionOptional
      title="Notes - Radius"
      isExistContent={currentElm?.shape.radius ? true : false}
      onAdd={() => {
        const newTimeLine = [...singleTimeLine];
        const a = newTimeLine[selectedElementIndex];
        if ("shape" in a && "radius" in a.shape)
          a.shape.radius = DEFAULT_RADIUS_PARAMS;
        setSingleTimeLine(newTimeLine);
      }}
      onRemove={() => {
        const newTimeLine = [...singleTimeLine];
        const a = newTimeLine[selectedElementIndex];
        if ("shape" in a && "radius" in a.shape) a.shape.radius = undefined;
        setSingleTimeLine(newTimeLine);
      }}
    >
      {currentElm.shape.radius && (
        <VStack align="flex-end">
          <Table variant="unstyled">
            <Tbody>
              <Tr>
                <Td p={2}>
                  <BaseRow
                    paramName="┌"
                    paramValue={currentElm.shape.radius.topLeft}
                    onChange={(value) => {
                      const newTimeLine = [...singleTimeLine];
                      const a = newTimeLine[selectedElementIndex];
                      if ("shape" in a && "radius" in a.shape) {
                        if (a.shape.radius) a.shape.radius.topLeft = value;
                      }
                      setSingleTimeLine(newTimeLine);
                    }}
                  />
                </Td>
                <Td p={2}>
                  <BaseRow
                    paramName="┐"
                    paramValue={currentElm.shape.radius.topRight}
                    onChange={(value) => {
                      const newTimeLine = [...singleTimeLine];
                      const a = newTimeLine[selectedElementIndex];
                      if ("shape" in a && "radius" in a.shape) {
                        if (a.shape.radius) a.shape.radius.topRight = value;
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
                    paramValue={currentElm.shape.radius.bottomLeft}
                    onChange={(value) => {
                      const newTimeLine = [...singleTimeLine];
                      const a = newTimeLine[selectedElementIndex];
                      if ("shape" in a && "radius" in a.shape) {
                        if (a.shape.radius) a.shape.radius.bottomLeft = value;
                      }
                      setSingleTimeLine(newTimeLine);
                    }}
                  />
                </Td>
                <Td p={2}>
                  <BaseRow
                    paramName="┘"
                    paramValue={currentElm.shape.radius.bottomRight}
                    onChange={(value) => {
                      const newTimeLine = [...singleTimeLine];
                      const a = newTimeLine[selectedElementIndex];
                      if ("shape" in a && "radius" in a.shape) {
                        if (a.shape.radius) a.shape.radius.bottomRight = value;
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
