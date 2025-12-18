import { ComponentProps } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { rankWith, ControlProps, scopeEndIs } from "@jsonforms/core";
import {
  MaterialInputControl,
  MuiInputText,
  Unwrapped,
} from "@jsonforms/material-renderers";
import { withJsonFormsControlProps } from "@jsonforms/react";
import tinycolor, { type ColorInput } from "tinycolor2";
import { color2token } from "../utils/color2token";

const { MaterialTextControl } = Unwrapped;

const token2hex = (token?: any) =>
  token
    ? "#" +
      tinycolor({
        r: token.$value.components[0] * 255,
        g: token.$value.components[1] * 255,
        b: token.$value.components[2] * 255,
      }).toHex()
    : undefined;

const ColorInput = (props: ComponentProps<typeof MuiInputText>) => {
  return <MuiInputText {...props} muiInputProps={{ type: "color" }} />;
};
export const renderer = withJsonFormsControlProps((props: ControlProps) => {
  return (
    <Stack direction="row" spacing={0}>
      <Box
        sx={{
          "& fieldset": { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
        }}
      >
        <MaterialTextControl
          {...props}
          data={token2hex(props.data)}
          handleChange={(p, v) => props.handleChange(p, color2token(v))}
        />
      </Box>
      <Box
        sx={{
          width: "30%",
          "& fieldset": { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
          "& button": { display: "none" },
        }}
      >
        <MaterialInputControl
          {...props}
          label=""
          input={ColorInput}
          data={token2hex(props.data)}
          handleChange={(p, v) => props.handleChange(p, color2token(v))}
        />
      </Box>
    </Stack>
  );
});

export const tester = rankWith(3, (uischema, schema) => {
  return (
    scopeEndIs("/properties/$value") &&
    schema.properties?.$type?.const === "color"
  );
});
