import { hex2colorToken } from "../controls/colorRenderer";

export const initialTokens = {
  color: {
    primary: {
      $root: hex2colorToken("#3065c0"),
      inverted: hex2colorToken("#4e83e0"),
    },
    bg: {
      $root: hex2colorToken("#fff"),
      inverted: hex2colorToken("#0f203e"),
    },
    fg: {
      $root: hex2colorToken("#06081f"),
      inverted: hex2colorToken("#fff"),
    },
    link: {
      $root: hex2colorToken("#3065c0"),
      inverted: hex2colorToken("#98b2e0"),
    },
    positive: {
      $root: hex2colorToken("#23831b"),
      inverted: hex2colorToken("#6edb64"),
    },
    negative: {
      $root: hex2colorToken("#ff1a57"),
      inverted: hex2colorToken("#d21d48"),
    },
    notice: {
      $root: hex2colorToken("#64c2db"),
      inverted: hex2colorToken("#00718f"),
    },
    informative: {
      $root: hex2colorToken("#64c2db"),
      inverted: hex2colorToken("#00718f"),
    },
    scale: {
      "1": { $type: "number", $value: 0.95 },
      "2": { $type: "number", $value: 0.85 },
      "3": { $type: "number", $value: 0.73 },
      "4": { $type: "number", $value: 0.61 },
      "5": { $type: "number", $value: 0.5 },
      "6": { $type: "number", $value: 0.39 },
      "7": { $type: "number", $value: 0.27 },
      "8": { $type: "number", $value: 0.15 },
      "9": { $type: "number", $value: 0.05 },
    },
  },
  font: {
    family: {
      display: {
        $type: "fontFamily",
        $value: [
          "Montserrat",
          "Baskerville",
          "Baskerville Old Face",
          "Hoefler Text",
          "Times New Roman",
          "serif",
        ],
      },
      copy: {
        $type: "fontFamily",
        $value: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Avenir Next",
          "Avenir",
          "Segoe UI",
          "Lucida Grande",
          "Helvetica Neue",
          "Helvetica",
          "Fira Sans",
          "Roboto",
          "Noto",
          "Droid Sans",
          "Cantarell",
          "Oxygen",
          "Ubuntu",
          "Franklin Gothic Medium",
          "Century Gothic",
          "Liberation Sans",
          "sans-serif",
        ],
      },
      interface: {
        $type: "fontFamily",
        $value: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Avenir Next",
          "Avenir",
          "Segoe UI",
          "Lucida Grande",
          "Helvetica Neue",
          "Helvetica",
          "Fira Sans",
          "Roboto",
          "Noto",
          "Droid Sans",
          "Cantarell",
          "Oxygen",
          "Ubuntu",
          "Franklin Gothic Medium",
          "Century Gothic",
          "Liberation Sans",
          "sans-serif",
        ],
      },
      mono: {
        $type: "fontFamily",
        $value: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
    },
    weight: {
      light: { $type: "fontWeight", $value: 300 },
      regular: { $type: "fontWeight", $value: 400 },
      medium: { $type: "fontWeight", $value: 500 },
      "semi-bold": { $type: "fontWeight", $value: 600 },
      bold: { $type: "fontWeight", $value: 700 },
    },
    size: {
      display: {
        base: {
          $type: "dimension",
          $value: { value: 20, unit: "px" },
        },
        "shrink-factor": { $type: "number", $value: 1.5 },
        "grow-factor": { $type: "number", $value: 1.5 },
        "bp-factor": { $type: "number", $value: 1.5 },
      },
      copy: {
        base: {
          $type: "dimension",
          $value: { value: 16, unit: "px" },
        },
        "shrink-factor": { $type: "number", $value: 1.5 },
        "grow-factor": { $type: "number", $value: 1.5 },
        "bp-factor": { $type: "number", $value: 1.5 },
      },
      interface: {
        base: {
          $type: "dimension",
          $value: { value: 16, unit: "px" },
        },
        "shrink-factor": { $type: "number", $value: 1.5 },
        "grow-factor": { $type: "number", $value: 1.5 },
        "bp-factor": { $type: "number", $value: 1.5 },
      },
      mono: {
        base: {
          $type: "dimension",
          $value: { value: 16, unit: "px" },
        },
        "shrink-factor": { $type: "number", $value: 1.5 },
        "grow-factor": { $type: "number", $value: 1.5 },
        "bp-factor": { $type: "number", $value: 1.5 },
      },
    },
  },
  spacing: {
    base: {
      $type: "dimension",
      $value: { value: 16, unit: "px" },
    },
    "shrink-factor": { $type: "number", $value: 1.5 },
    "grow-factor": { $type: "number", $value: 1.5 },
    "bp-factor": { $type: "number", $value: 1.5 },
  },
};
