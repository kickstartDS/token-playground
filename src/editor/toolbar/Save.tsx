import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import { useSearchParams } from "../../utils/router";
import { useSave } from "../../token/fetcher";
import { useToken } from "../../token/TokenContext";

export const Save = () => {
  const { tokens } = useToken();
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("t");
  const mutation = useSave("PUT");
  return (
    <IconButton
      aria-label="save"
      onClick={() =>
        tokenParam && mutation.mutate({ name: tokenParam, tokens })
      }
      disabled={!tokenParam}
    >
      <SaveIcon />
    </IconButton>
  );
};
