import process from "node:process";
import fs from "node:fs";
import { color2token } from "../src/utils/color2token.ts";

const brandingTokenFileName = process.argv[2];
const content = fs.readFileSync(brandingTokenFileName, "utf-8");
const brand = JSON.parse(content);

const result = {
  color: {
    primary: {
      $root: color2token(brand.color.primary),
      inverted: color2token(brand.color["primary-inverted"]),
    },
    onPrimary: {
      $root: color2token(brand.color.onPrimary),
      inverted: color2token(brand.color["onPrimary-inverted"]),
    },
    bg: {
      $root: color2token(brand.color.bg),
      inverted: color2token(brand.color["bg-inverted"]),
    },
    fg: {
      $root: color2token(brand.color.fg),
      inverted: color2token(brand.color["fg-inverted"]),
    },
    link: {
      $root: color2token(brand.color.link),
      inverted: color2token(brand.color["link-inverted"]),
    },
    positive: {
      $root: color2token(brand.color.positive),
      inverted: color2token(brand.color["positive-inverted"]),
    },
    negative: {
      $root: color2token(brand.color.negative),
      inverted: color2token(brand.color["negative-inverted"]),
    },
    notice: {
      $root: color2token(brand.color.notice),
      inverted: color2token(brand.color["notice-inverted"]),
    },
    informative: {
      $root: color2token(brand.color.informative),
      inverted: color2token(brand.color["informative-inverted"]),
    },
    scale: {
      1: {
        $type: "number",
        $value: Number.parseInt(brand.color.scale[1]) / 100,
      },
      2: {
        $type: "number",
        $value: Number.parseInt(brand.color.scale[2]) / 100,
      },
      3: {
        $type: "number",
        $value: Number.parseInt(brand.color.scale[3]) / 100,
      },
      4: {
        $type: "number",
        $value: Number.parseInt(brand.color.scale[4]) / 100,
      },
      5: {
        $type: "number",
        $value: Number.parseInt(brand.color.scale[5]) / 100,
      },
      6: {
        $type: "number",
        $value: Number.parseInt(brand.color.scale[6]) / 100,
      },
      7: {
        $type: "number",
        $value: Number.parseInt(brand.color.scale[7]) / 100,
      },
      8: {
        $type: "number",
        $value: Number.parseInt(brand.color.scale[8]) / 100,
      },
      9: {
        $type: "number",
        $value: Number.parseInt(brand.color.scale[9]) / 100,
      },
    },
  },
  font: {
    family: {
      display: {
        $type: "fontFamily",
        $value: brand.font.family.display.split(",").map((str) => str.trim()),
      },
      copy: {
        $type: "fontFamily",
        $value: brand.font.family.copy.split(",").map((str) => str.trim()),
      },
      interface: {
        $type: "fontFamily",
        $value: brand.font.family.interface.split(",").map((str) => str.trim()),
      },
      mono: {
        $type: "fontFamily",
        $value: brand.font.family.mono.split(",").map((str) => str.trim()),
      },
    },
    weight: {
      light: { $type: "fontWeight", $value: brand.font["font-weight"].light },
      regular: {
        $type: "fontWeight",
        $value: brand.font["font-weight"].regular,
      },
      medium: { $type: "fontWeight", $value: brand.font["font-weight"].medium },
      "semi-bold": {
        $type: "fontWeight",
        $value: brand.font["font-weight"]["semi-bold"],
      },
      bold: { $type: "fontWeight", $value: brand.font["font-weight"].bold },
    },
    size: {
      display: {
        base: {
          $type: "dimension",
          $value: { value: brand.font["font-size"].display.base, unit: "px" },
        },
        "shrink-factor": {
          $type: "number",
          $value: brand.font["font-size"].display["shrink-factor"],
        },
        "grow-factor": {
          $type: "number",
          $value: brand.font["font-size"].display["grow-factor"],
        },
        "bp-factor": {
          $type: "number",
          $value: brand.font["font-size"].display["bp-factor"],
        },
      },
      copy: {
        base: {
          $type: "dimension",
          $value: { value: brand.font["font-size"].copy.base, unit: "px" },
        },
        "shrink-factor": {
          $type: "number",
          $value: brand.font["font-size"].copy["shrink-factor"],
        },
        "grow-factor": {
          $type: "number",
          $value: brand.font["font-size"].copy["grow-factor"],
        },
        "bp-factor": {
          $type: "number",
          $value: brand.font["font-size"].copy["bp-factor"],
        },
      },
      interface: {
        base: {
          $type: "dimension",
          $value: { value: brand.font["font-size"].interface.base, unit: "px" },
        },
        "shrink-factor": {
          $type: "number",
          $value: brand.font["font-size"].interface["shrink-factor"],
        },
        "grow-factor": {
          $type: "number",
          $value: brand.font["font-size"].interface["grow-factor"],
        },
        "bp-factor": {
          $type: "number",
          $value: brand.font["font-size"].interface["bp-factor"],
        },
      },
      mono: {
        base: {
          $type: "dimension",
          $value: { value: brand.font["font-size"].mono.base, unit: "px" },
        },
        "shrink-factor": {
          $type: "number",
          $value: brand.font["font-size"].mono["shrink-factor"],
        },
        "grow-factor": {
          $type: "number",
          $value: brand.font["font-size"].mono["grow-factor"],
        },
        "bp-factor": {
          $type: "number",
          $value: brand.font["font-size"].mono["bp-factor"],
        },
      },
    },
  },
  spacing: {
    base: {
      $type: "dimension",
      $value: { value: brand.spacing.base, unit: "px" },
    },
    "shrink-factor": {
      $type: "number",
      $value: brand.spacing["shrink-factor"],
    },
    "grow-factor": { $type: "number", $value: brand.spacing["grow-factor"] },
    "bp-factor": { $type: "number", $value: brand.spacing["bp-factor"] },
  },
};

console.log(JSON.stringify(result, null, 2));
