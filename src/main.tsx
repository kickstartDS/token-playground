import "./init";
import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { lime, purple } from "@mui/material/colors";
import { App } from "./App";

const theme = createTheme({
  // palette: {
  //   primary: lime,
  //   secondary: purple,
  // },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
