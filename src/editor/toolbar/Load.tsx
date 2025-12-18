import { FormEvent, useEffect, useId, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useToken } from "../../token/TokenContext";
import { useSearchParams } from "../../utils/router";

export const Load = () => {
  const formId = useId();
  const selectId = useId();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { getPresetList, presetListData } = useToken();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    if (typeof name === "string") {
      searchParams.set("t", name);
    }
    handleClose();
  };

  useEffect(() => {
    if (open) {
      getPresetList();
    }
  }, [open]);

  return (
    <>
      <IconButton aria-label="load" onClick={handleOpen}>
        <CloudDownloadIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Load</DialogTitle>
        <DialogContent sx={{ minWidth: "26em" }}>
          <form onSubmit={onSubmit} id={formId}>
            <FormControl
              fullWidth
              sx={{ marginTop: 1 }}
              disabled={!presetListData}
            >
              <InputLabel id={selectId}>Preset</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id={selectId}
                label="Preset"
                name="name"
                defaultValue={searchParams.get("t") || ""}
              >
                {presetListData?.map((presetName) => (
                  <MenuItem key={presetName} value={presetName}>
                    {presetName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form={formId}>
            Load
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
