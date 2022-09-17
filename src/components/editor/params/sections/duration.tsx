import { AddIcon } from "@chakra-ui/icons";
import { Button, Table, Tbody, Td, Text, Tr, VStack } from "@chakra-ui/react";

import { BaseRowOptional, BaseSectionOptional } from "./base";

import { useEditor } from "@/providers/editor";
import { Duration } from "@/types/editor/element";

export const DurationParamsEditor = () => {
  const { singleTimeLine, setSingleTimeLine, selectedElementIndex } =
    useEditor();

  const DEFAULT_DURATION_PARAMS: Duration = {};

  return (
    <BaseSectionOptional
      title="Duration"
      defaultValue={
        singleTimeLine[selectedElementIndex].duration ? true : false
      }
      onAdd={() => {
        const newTimeLine = [...singleTimeLine];
        newTimeLine[selectedElementIndex].duration = DEFAULT_DURATION_PARAMS;
        setSingleTimeLine(newTimeLine);
      }}
      onRemove={() => {
        const newTimeLine = [...singleTimeLine];
        newTimeLine[selectedElementIndex].duration = undefined;
        setSingleTimeLine(newTimeLine);
      }}
    >
      <VStack align="flex-end">
        <Table variant="unstyled">
          <Tbody>
            <Tr>
              <Td p={2}>
                <BaseRowOptional
                  paramName="S"
                  paramValue={
                    singleTimeLine[selectedElementIndex].duration?.startMs
                  }
                  onChange={(value) => {
                    console.log("start");
                    console.log(value);
                    const newTimeLine = [...singleTimeLine];
                    const a = newTimeLine[selectedElementIndex];
                    if (a.duration) a.duration.startMs = value;
                    setSingleTimeLine(newTimeLine);
                  }}
                />
              </Td>
              <Td p={2}>
                <BaseRowOptional
                  paramName="E"
                  paramValue={
                    singleTimeLine[selectedElementIndex].duration?.endMs
                  }
                  onChange={(value) => {
                    console.log("end");
                    console.log(value);
                    const newTimeLine = [...singleTimeLine];
                    const a = newTimeLine[selectedElementIndex];
                    if (a.duration) a.duration.endMs = value;
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
    </BaseSectionOptional>
  );
};
