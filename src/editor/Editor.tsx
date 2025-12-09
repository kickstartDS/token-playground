import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as colorRenderer from "../controls/colorRenderer";
import * as numberRenderer from "../controls/numberRenderer";
import * as fontFamilyRenderer from "../controls/fontFamilyRenderer";
import * as dimensionRenderer from "../controls/dimensionRenderer";
import * as fontWeightRenderer from "../controls/fontWeightRenderer";
import * as categorizationLayout from "../controls/categorizationLayout";
import { useToken } from "../token/TokenContext";
import tokenSchema from "../tokens.schema.dereffed.json";
import { uischema } from "./uiSchema";

const schema = {
  type: "object",
  properties: {
    ...tokenSchema.properties,
    _fontHref: {
      type: "object",
      additionalProperties: {
        type: "string",
      },
    },
  },
};
const editorTheme = createTheme({
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          "--Grid-columnSpacing": "0.5em",
          "--Grid-rowSpacing": "0.5em",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          position: "sticky",
          top: 0,
          zIndex: 2,
        },
      },
    },
  },
});

export const Editor = () => {
  const { tokens, setTokens } = useToken();
  return (
    <ThemeProvider theme={editorTheme}>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={tokens}
        renderers={[
          ...materialRenderers,
          colorRenderer,
          numberRenderer,
          fontFamilyRenderer,
          dimensionRenderer,
          fontWeightRenderer,
          categorizationLayout,
        ]}
        cells={materialCells}
        onChange={({ data }) => {
          setTokens(data);
        }}
      />
    </ThemeProvider>
  );
};
