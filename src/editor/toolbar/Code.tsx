import { FormEvent, useId, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DataObjectIcon from "@mui/icons-material/DataObject";
import TextField from "@mui/material/TextField";
import { useToken } from "../../token/TokenContext";
import { validate } from "../../tokens.schema.validate";

export const Code = () => {
  const formId = useId();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { tokens, setTokens } = useToken();
  const [error, setError] = useState<string>();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const code = formData.get("code");
    if (typeof code === "string") {
      try {
        const parsed = JSON.parse(code);
        if (!validate(parsed)) {
          if (validate.errors) {
            const [firstError] = validate.errors;
            setError(`${firstError.instancePath} ${firstError.message}`);
          }
        } else {
          setTokens(parsed);
          handleClose();
        }
      } catch (e) {
        setError("Invalid JSON");
      }
    }
  };

  return (
    <>
      <IconButton aria-label="import / export" onClick={handleOpen}>
        <DataObjectIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Import / Export</DialogTitle>
        <DialogContent sx={{ minWidth: "30em" }}>
          <form onSubmit={onSubmit} id={formId}>
            <TextField
              autoFocus
              required
              name="code"
              label="JSON"
              fullWidth
              slotProps={{ input: { sx: { fontFamily: "Monospace" } } }}
              defaultValue={JSON.stringify(tokens, null, 2) || ""}
              multiline
              sx={{ marginTop: 1 }}
              onInput={() => setError(undefined)}
              error={!!error}
              helperText={error}
              rows={24}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form={formId}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
