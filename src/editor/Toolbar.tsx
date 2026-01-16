import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { SaveAs } from "./toolbar/SaveAs";
import { Save } from "./toolbar/Save";
import { Restore } from "./toolbar/Restore";
import { Load } from "./toolbar/Load";
import { Code } from "./toolbar/Code";
import { Css } from "./toolbar/Css";

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
