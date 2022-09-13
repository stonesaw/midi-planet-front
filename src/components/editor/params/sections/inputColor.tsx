import {
  HStack,
  Box,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  // NumberInput,
  // NumberInputField
} from "@chakra-ui/react";
// import { useRef } from "react";
import {
  Color as PickerColorObj,
  ColorPicker,
  useColor,
  // toColor
} from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

import { rgb2hex } from "@/libs/utils";
import { Color } from "@/types/editor/element";

interface InputColorProps {
  paramColor: Color;
  onChange: (color: Color) => void;
}

export const InputColor = ({ paramColor, onChange }: InputColorProps) => {
  const [color, setColor] = useColor("rgb", {
    r: paramColor.rgb[0],
    g: paramColor.rgb[1],
    b: paramColor.rgb[2],
    a: paramColor.alpha,
  });
  // const inputElement = useRef<HTMLInputElement>(null);

  const colorPickerHandler = (c: PickerColorObj) => {
    setColor(c);
    let a;
    if (typeof c.rgb?.a == "number") a = Math.round(c.rgb?.a * 100);
    else a = 100;
    onChange({
      rgb: [c.rgb.r, c.rgb.g, c.rgb.b],
      alpha: a,
    });
  };

  // const alphaInputHandle = (alpha: number) => {
  //   console.log("handle alpha");
  //   console.log(alpha);
  //   setColor(toColor("rgb", {
  //     r: color.rgb.r,
  //     g: color.rgb.g,
  //     b: color.rgb.b,
  //     a: alpha / 100,
  //   }))
  //   onChange({
  //     rgb: [color.rgb.r, color.rgb.g, color.rgb.b],
  //     alpha: alpha
  //   });
  // }

  return (
    <HStack fontSize="lg" spacing={4}>
      <Popover placement="left-start">
        <PopoverTrigger>
          <HStack>
            <Box
              background={rgb2hex(...paramColor.rgb)}
              width="16px"
              height="16px"
              margin="0"
              borderRadius="4"
            ></Box>
            <Input
              color="gray.50"
              borderColor="gray.500"
              value={rgb2hex(...paramColor.rgb).toUpperCase()}
              onChange={() => console.log("change color")}
            />
          </HStack>
        </PopoverTrigger>
        <PopoverContent>
          <ColorPicker
            width={456}
            height={228}
            color={color}
            onChange={colorPickerHandler}
            hideHSV
            dark
            alpha={true}
          />
        </PopoverContent>
      </Popover>
      {/* <NumberInput
        color="gray.50"
        defaultValue={paramColor.alpha}
        min={0}
        max={100}
        onChange={(value) => alphaInputHandle(Number(value))}
      >
        <NumberInputField ref={inputElement} borderColor="gray.500" />
      </NumberInput> */}
    </HStack>
  );
};
