import traverse, { TraverseContext } from "traverse";
import tinycolor from "tinycolor2";

const getType = (ctx: TraverseContext | undefined): string | undefined => {
  while ((ctx = ctx?.parent)) {
    if (ctx.node.$type) return ctx.node.$type;
  }
};
const getValue = (
  name: string,
  $type: string | undefined,
  $value: any,
): string => {
  switch ($type) {
    case "color":
      return (
        "#" +
        tinycolor({
          r: $value.components[0] * 255,
          g: $value.components[1] * 255,
          b: $value.components[2] * 255,
        }).toHex()
      );

    case "fontFamily":
      return ($value as string[])
        .map((f) => (f.includes(" ") ? JSON.stringify(f) : f))
        .join();

    case "dimension":
      return $value.value + $value.unit;

    case "number":
      if (name.startsWith("color-scale-")) {
        return Math.round($value * 100) + "%";
      }
      return $value;

    default:
      return $value;
  }
};
export const tokensToCss = (tokens: any) =>
  traverse(tokens).reduce(function (acc, $value) {
    if (this.key === "$value") {
      const name = this.parent!.path.filter((seg) => seg !== "$root").join("-");
      const $type = getType(this);
      const value = getValue(name, $type, $value);

      acc += `  --ks-brand-${name}: ${value};\n`;
    }
    return acc;
  }, ":root {\n") + "}\n";
