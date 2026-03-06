import { createAjv } from "@jsonforms/core";
import { materialCells, materialRenderers } from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import tokenSchema from "@kickstartds/ds-agency-premium/tokens/branding-tokens.schema.dereffed.json";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as categorizationLayout from "../controls/categorizationLayout";
import * as colorRenderer from "../controls/colorRenderer";
import * as dimensionRenderer from "../controls/dimensionRenderer";
import * as fontFamilyRenderer from "../controls/fontFamilyRenderer";
import * as fontWeightRenderer from "../controls/fontWeightRenderer";
import * as numberRenderer from "../controls/numberRenderer";
import { useToken } from "../token/TokenContext";
import { EditorToolbar } from "./Toolbar";
import { uischema } from "./uiSchema";

const schema = { type: "object", properties: tokenSchema.properties };
const ajv = createAjv({ useDefaults: true });

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
    <>
      <EditorToolbar />
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
          ajv={ajv}
        />
      </ThemeProvider>
    </>
  );
};
