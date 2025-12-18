import { FormEvent, useId, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import SaveAsIcon from "@mui/icons-material/SaveAs";

import { useToken } from "../../token/TokenContext";
import TextField from "@mui/material/TextField";
import { usePreset } from "../../presets/PresetContext";

export const SaveAs = () => {
  const formId = useId();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { presetName, selectPreset } = usePreset();
  const { savePreset } = useToken();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    if (typeof name === "string") {
      setLoading(true);
      try {
        await savePreset(name);
        handleClose();
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Connection Error");
        }
      } finally {
        setLoading(false);
        selectPreset(name);
      }
    }
  };

  return (
    <>
      <IconButton aria-label="save as" onClick={handleOpen}>
        <SaveAsIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save as</DialogTitle>
        <DialogContent sx={{ minWidth: "26em" }}>
          <form onSubmit={onSubmit} id={formId}>
            <TextField
              autoFocus
              required
              name="name"
              label="Name"
              fullWidth
              variant="standard"
              slotProps={{ input: { sx: { fontFamily: "Monospace" } } }}
              error={!!error}
              helperText={error}
              disabled={loading}
              defaultValue={presetName || ""}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form={formId}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
