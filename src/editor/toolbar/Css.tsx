import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import CssIcon from "@mui/icons-material/Css";
import TextField from "@mui/material/TextField";
import { useToken } from "../../token/TokenContext";

export const Css = () => {
  const [open, setOpen] = useState(false);
  const { css } = useToken();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCopy = () => {
    try {
      void navigator.clipboard.writeText(css);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IconButton aria-label="css code" onClick={handleOpen}>
        <CssIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>CSS</DialogTitle>
        <DialogContent sx={{ minWidth: "30em" }}>
          <TextField
            name="code"
            label="CSS"
            fullWidth
            slotProps={{
              input: {
                sx: { fontFamily: "Monospace", whiteSpace: "nowrap" },
                readOnly: true,
              },
            }}
            defaultValue={css}
            multiline
            sx={{ marginTop: 1 }}
            rows={24}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleCopy}>Copy to Clipboard</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
