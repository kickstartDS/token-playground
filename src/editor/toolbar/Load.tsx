import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { useToken } from "../../token/TokenContext";
import { useGetMutation } from "../../token/fetcher";
import { TokenNameForm } from "./NameForm";

export const Load = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setTokens } = useToken();
  const mutation = useGetMutation();
  const onSubmit = (name: string) =>
    mutation.mutateAsync(name).then(handleClose);

  return (
    <>
      <IconButton aria-label="load" onClick={handleOpen}>
        <CloudDownloadIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Load</DialogTitle>
        <DialogContent sx={{ minWidth: "26em" }}>
          <TokenNameForm id="load-form" onSubmit={onSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="load-form">
            Load
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
