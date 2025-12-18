import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import { useSearchParams } from "../../utils/router";
import { useToken } from "../../token/TokenContext";

export const Save = () => {
  const { savePreset } = useToken();
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("t");
  return (
    <IconButton
      aria-label="save"
      onClick={() => savePreset()}
      disabled={!tokenParam}
    >
      <SaveIcon />
    </IconButton>
  );
};
