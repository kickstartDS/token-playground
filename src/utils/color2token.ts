import tinycolor, { type ColorInput } from "tinycolor2";

const round = (value: number, digits = 4) => {
  value = value * Math.pow(10, digits);
  value = Math.round(value);
  value = value / Math.pow(10, digits);
  return value;
};

export const color2token = (color: ColorInput) => {
  const { r, g, b } = tinycolor(color).toRgb();
  return {
    $type: "color",
    $value: {
      colorSpace: "srgb",
      components: [round(r / 255), round(g / 255), round(b / 255)],
    },
  };
};
