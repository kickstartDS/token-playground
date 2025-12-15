import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import SaveAsIcon from "@mui/icons-material/SaveAs";

import { useToken } from "../../token/TokenContext";
import { useSave } from "../../token/fetcher";
import { TokenNameForm } from "./NameForm";

export const SaveAs = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { tokens } = useToken();
  const mutation = useSave("POST");
  const onSubmit = (name: string) =>
    mutation.mutateAsync({ name, tokens }).then(handleClose);

  return (
    <>
      <IconButton aria-label="save as" onClick={handleOpen}>
        <SaveAsIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save as</DialogTitle>
        <DialogContent sx={{ minWidth: "26em" }}>
          <TokenNameForm id="save-as-form" onSubmit={onSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="save-as-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
