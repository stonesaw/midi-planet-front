import { AddIcon } from "@chakra-ui/icons";
import { Button, Table, Tbody, Td, Text, Tr, VStack } from "@chakra-ui/react";

import { BaseSection } from "@/components/editor/params/sections/base";
import { InputColor } from "@/components/editor/params/sections/inputColor";
import { useEditor } from "@/providers/editor";

export const ColorParamsEditor = () => {
  const { singleTimeLine, setSingleTimeLine, selectedElementIndex } =
    useEditor();

  return (
    <BaseSection title="Color">
      <VStack align="flex-end">
        <Table variant="unstyled">
          <Tbody>
            <Tr>
              <Td p={2}>
                <InputColor
                  paramColor={singleTimeLine[selectedElementIndex].background}
                  onChange={(color) => {
                    const newTimeLine = [...singleTimeLine];
                    newTimeLine[selectedElementIndex].background = color;
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
