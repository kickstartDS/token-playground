import { FC, ReactNode, useId } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect from "@mui/material/Select";

export const Select: FC<{
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: ReactNode;
  label?: string;
}> = ({ value, onChange, options, label }) => {
  const id = useId();
  return (
    <FormControl size="small">
      <InputLabel id={id}>{label}</InputLabel>
      <MuiSelect
        labelId={id}
        value={value}
        label={label}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map(({ value, label }) => (
          <MenuItem value={value} key={value}>
            {label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
