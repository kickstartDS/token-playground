import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useToken } from "../token/TokenContext";

const widths = ["100%", "400px", "800px"];
const presets = import.meta.glob("./*.ts", {
  base: "../token/presets",
  import: "default",
});
console.log(presets);

interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}
const SaveDialog = (props: SimpleDialogProps) => {
  const { onClose, open } = props;
  const { tokens } = useToken();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Save or share</DialogTitle>
      <DialogContent sx={{ minWidth: "26em" }}>
        <TextField
          label="JSON"
          multiline
          rows={20}
          defaultValue={JSON.stringify(tokens, null, 2)}
          sx={{ width: "100%" }}
          slotProps={{ input: { sx: { fontFamily: "Monospace" } } }}
        />
      </DialogContent>
    </Dialog>
  );
};

export const EditorToolbar = () => {
  const { resetTokens } = useToken();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const handleClickOpen = () => setSaveDialogOpen(true);
  const handleClose = () => setSaveDialogOpen(false);

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton aria-label="download" onClick={handleClickOpen}>
          <DownloadIcon />
        </IconButton>
        <SaveDialog open={saveDialogOpen} onClose={handleClose} />
        <Button variant="contained" onClick={resetTokens}>
          Reset
        </Button>
      </Toolbar>
    </AppBar>
  );
};
