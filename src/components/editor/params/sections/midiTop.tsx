import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Text,
  VStack,
  HStack,
  Spacer,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";

import { BaseSection } from "./base";

import { useEditor } from "@/providers/editor";
import {
  MIDIAnimationTypes,
  MIDIAnimationTypesText,
} from "@/types/editor/element";

export const MIDITopSection = () => {
  const { singleTimeLine, setSingleTimeLine, selectedElementIndex } =
    useEditor();

  const currentElm = singleTimeLine[selectedElementIndex];
  if (currentElm.type != "MIDI") return <></>;

  return (
    <BaseSection>
      <VStack align="flex">
        <HStack>
          <Text color="gray.50">アニメーション :</Text>
          <Spacer />
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {MIDIAnimationTypesText[currentElm.animation]}
            </MenuButton>
            <MenuList>
              <MenuOptionGroup defaultValue={currentElm.animation} type="radio">
                {MIDIAnimationTypes.map((t) => {
                  return (
                    <MenuItemOption
                      key={t}
                      value={t}
                      onClick={() => {
                        const newTimeLine = [...singleTimeLine];
                        const a = newTimeLine[selectedElementIndex];
                        if (a.type == "MIDI") a.animation = t;
                        setSingleTimeLine(newTimeLine);
                      }}
                    >
                      {MIDIAnimationTypesText[t]}
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </HStack>
      </VStack>
    </BaseSection>
  );
};
