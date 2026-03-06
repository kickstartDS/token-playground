import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import { usePreset } from "../../presets/PresetContext";
import { useToken } from "../../token/TokenContext";

export const Save = () => {
  const { presetName } = usePreset();
  const { savePreset } = useToken();

  return (
    <IconButton aria-label="save" onClick={() => savePreset()} disabled={!presetName}>
      <SaveIcon />
    </IconButton>
  );
};
