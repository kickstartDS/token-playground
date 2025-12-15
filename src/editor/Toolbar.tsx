import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { SaveAs } from "./toolbar/SaveAs";
import { Save } from "./toolbar/Save";
import { Restore } from "./toolbar/Restore";
import { Load } from "./toolbar/Load";

export const EditorToolbar = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Restore />
        <Save />
        <SaveAs />
        <Load />
      </Toolbar>
    </AppBar>
  );
};
