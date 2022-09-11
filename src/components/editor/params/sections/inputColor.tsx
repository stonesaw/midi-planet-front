import {
  HStack,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import {
  Color as PickerColorObj,
  ColorPicker,
  useColor,
} from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

import { rgb2hex } from "@/libs/utils";
import { Color } from "@/types/editor/element";

interface InputColorProps {
  paramValue: Color;
  onChange: (color: Color) => void;
}

export const InputColor = ({ paramValue, onChange }: InputColorProps) => {
  const [color, setColor] = useColor("rgb", {
    r: paramValue.rgb[0],
    g: paramValue.rgb[1],
    b: paramValue.rgb[2],
    a: paramValue.alpha,
  });

  const colorHandler = (c: PickerColorObj) => {
    setColor(c);
    let a;
    if (typeof c.rgb?.a == "number") a = Math.round(c.rgb?.a * 255);
    else a = 255;
    onChange({
      rgb: [c.rgb.r, c.rgb.g, c.rgb.b],
      alpha: a,
    });
  };

  return (
    <HStack fontSize="lg" spacing={4}>
      <Popover placement="left-start">
        <PopoverTrigger>
          <Input
            color="gray.50"
            borderColor="gray.500"
            value={rgb2hex(...paramValue.rgb)}
            onChange={() => console.log("change color")}
          />
        </PopoverTrigger>
        <PopoverContent>
          <ColorPicker
            width={456}
            height={228}
            color={color}
            onChange={colorHandler}
            hideHSV
            dark
            alpha={true}
          />
        </PopoverContent>
      </Popover>
    </HStack>
  );
};
