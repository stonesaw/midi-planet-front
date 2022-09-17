import { AddIcon } from "@chakra-ui/icons";
import { Button, Table, Tbody, Td, Text, Tr, VStack } from "@chakra-ui/react";

import { BaseRowString, BaseSection } from "./base";
import { InputColor } from "./inputColor";

import { useEditor } from "@/providers/editor";

export const TextParamsEditor = () => {
  const { singleTimeLine, setSingleTimeLine, selectedElementIndex } =
    useEditor();

  const currentElm = singleTimeLine[selectedElementIndex];
  if (!("text" in currentElm && "font" in currentElm && "color" in currentElm))
    return <></>;

  return (
    <BaseSection title="Text">
      <VStack align="flex-end">
        <Table variant="unstyled">
          <Tbody>
            <Tr>
              <Td p={2}>
                <BaseRowString
                  paramName="T"
                  paramValue={currentElm.text}
                  onChange={(value) => {
                    const newTimeLine = [...singleTimeLine];
                    const a = newTimeLine[selectedElementIndex];
                    if ("text" in a) {
                      a.text = value;
                    }
                    setSingleTimeLine(newTimeLine);
                  }}
                />
              </Td>
            </Tr>
            <Tr>
              <Td p={2}>
                {/* TODO: セレクトボックスにしたいかも
                https://p5js.org/reference/#/p5/textFont
                https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals#web_safe_fonts */}
                <BaseRowString
                  paramName="F"
                  paramValue={currentElm.font ?? ""}
                  onChange={(value) => {
                    const newTimeLine = [...singleTimeLine];
                    const a = newTimeLine[selectedElementIndex];
                    if ("font" in a) {
                      a.font = String(value);
                    }
                    setSingleTimeLine(newTimeLine);
                  }}
                />
              </Td>
            </Tr>
            <Tr>
              <Td p={2}>
                <InputColor
                  paramColor={currentElm.color}
                  onChange={(color) => {
                    const newTimeLine = [...singleTimeLine];
                    const a = newTimeLine[selectedElementIndex];
                    if ("color" in a) a.color = color;
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
