import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Code } from "./toolbar/Code";
import { Css } from "./toolbar/Css";
import { Load } from "./toolbar/Load";
import { Restore } from "./toolbar/Restore";
import { Save } from "./toolbar/Save";
import { SaveAs } from "./toolbar/SaveAs";

export const EditorToolbar = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Restore />
        <Save />
        <SaveAs />
        <Load />
        <Code />
        <Css />
      </Toolbar>
    </AppBar>
  );
};
