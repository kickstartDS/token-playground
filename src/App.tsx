import { useState } from "react";
import classNames from "classnames";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import DoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import DoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Preview } from "./preview/Preview";
import { Editor } from "./editor/Editor";
import { TokenContextProvider } from "./token/TokenContext";
import { useMatchMediaQuery } from "./utils/useMatchMediaQuery";
import { SearchParamsProvider } from "./utils/router";
import "./App.scss";

const queryClient = new QueryClient();

export const App = () => {
  const isLargeScreen = useMatchMediaQuery("(min-width: 35em)");
  const [showEditor, setShowEditor] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="content">
        <SearchParamsProvider>
          <TokenContextProvider>
            <Box
              className={classNames(
                "content__pane content__editor-pane",
                !showEditor && "content__editor-pane--hidden",
              )}
              sx={{
                borderRight: 1,
                borderColor: "grey.500",
              }}
            >
              <Editor />
            </Box>
            <div
              className={classNames(
                "content__pane content__preview-pane",
                !isLargeScreen && showEditor && "content__preview-pane--shrunk",
              )}
            >
              <ToggleButtonGroup className="content__editor-toggle">
                <ToggleButton
                  value="show"
                  onClick={() => setShowEditor((prev) => !prev)}
                  aria-label={(showEditor ? "hide" : "show") + " editor"}
                  title={(showEditor ? "hide" : "show") + " editor"}
                >
                  {showEditor ? (
                    <DoubleArrowLeftIcon />
                  ) : (
                    <DoubleArrowRightIcon />
                  )}
                </ToggleButton>
              </ToggleButtonGroup>
              <Preview />
            </div>
          </TokenContextProvider>
        </SearchParamsProvider>
      </main>
    </QueryClientProvider>
  );
};
