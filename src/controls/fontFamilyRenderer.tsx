import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { isDescriptionHidden, rankWith, scopeEndIs } from "@jsonforms/core";
import { useFocus } from "@jsonforms/material-renderers";
import {
  withJsonFormsControlProps,
  withTranslateProps,
} from "@jsonforms/react";
import fontList from "../fonts.json";

const fonts = new Set(fontList);
const options = fontList;

/**
 * https://github.com/eclipsesource/jsonforms/blob/master/packages/material-renderers/src/mui-controls/MuiAutocomplete.tsx
 */
export const renderer = withJsonFormsControlProps(
  withTranslateProps((props) => {
    const {
      description,
      errors,
      visible,
      required,
      label,
      data,
      id,
      enabled,
      path,
      handleChange,
    } = props;
    const isValid = errors.length === 0;
    const value = data?.$value?.join(", ");
    const [inputValue, setInputValue] = useState(value ?? "");
    const [focused, onFocus, onBlur] = useFocus();

    const showDescription = !isDescriptionHidden(
      visible,
      description,
      focused,
      false,
    );

    const firstFormHelperText = showDescription
      ? description
      : !isValid
        ? errors
        : null;
    const secondFormHelperText = showDescription && !isValid ? errors : null;

    useEffect(() => {
      const hrefPath = "_fontHref." + path.split(".").at(-1);
      if (fonts?.has(value)) {
        const params = new URLSearchParams({ family: value });
        handleChange(hrefPath, "https://fonts.googleapis.com/css2?" + params);
      } else {
        handleChange(hrefPath, undefined);
      }
    }, [fonts, value]);
    return (
      <>
        <Autocomplete
          id={id}
          disabled={!enabled}
          value={value}
          onChange={(event, newValue: string | null) => {
            handleChange(path, {
              $type: "fontFamily",
              $value: (newValue || "").split(","),
            });
          }}
          inputValue={inputValue}
          onInputChange={(_event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          autoHighlight
          autoComplete
          fullWidth
          options={options}
          getOptionLabel={(option) => {
            return typeof option === "string" ? option : option?.label;
          }}
          freeSolo
          renderInput={(params) => {
            return (
              <TextField
                label={label}
                type="text"
                inputRef={params.InputProps.ref}
                {...params}
                disabled={!enabled}
                id={id}
                required={required}
                error={!isValid}
                fullWidth
                onFocus={onFocus}
                onBlur={onBlur}
                focused={focused}
              />
            );
          }}
        />
        <FormHelperText error={!isValid && !showDescription}>
          {firstFormHelperText}
        </FormHelperText>
        <FormHelperText error={!isValid}>{secondFormHelperText}</FormHelperText>
      </>
    );
  }),
);

export const tester = rankWith(3, (uischema, schema) => {
  return (
    scopeEndIs("/properties/$value") &&
    schema.properties?.$type?.const === "fontFamily"
  );
});
