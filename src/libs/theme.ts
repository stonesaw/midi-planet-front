import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    brand: {
      50: "#d9f4ff",
      100: "#bce0ea",
      200: "#9ec8d5",
      300: "#7eb0bf",
      400: "#659dae",
      500: "#4b8b9d",
      600: "#3f7b8b",
      700: "#306675",
      800: "#235360",
      900: "#103d49",
    },
  },
  styles: {
    global: () => ({
      body: {
        bgColor: "gray.50",
      },
    }),
  },
});
