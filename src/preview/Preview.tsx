import { useEffect, useMemo, useRef, useState } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import { useToken } from "../token/TokenContext";
import { Select } from "../controls/select/Select";
import "./Preview.scss";
import { useSearchParams } from "../utils/router";

const widths = ["100%", "400px", "800px"];

export const Preview = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [width, setWidth] = useState(widths[0]);
  const { tokens, cssString } = useToken();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const seachParams = useSearchParams();

  useEffect(() => {
    if (iframeRef.current && iframeLoaded && cssString) {
      iframeRef.current.contentWindow?.postMessage({
        css: cssString,
        _fontHref: tokens._fontHref,
      });
    }
  }, [iframeRef, cssString, iframeLoaded]);

  return (
    <div className="preview">
      <AppBar position="static" className="preview__toolbar">
        <Toolbar variant="dense">
          <Select
            options={widths.map((w) => ({ value: w, label: w }))}
            value={width}
            onChange={setWidth}
            label="viewport"
          />
        </Toolbar>
      </AppBar>
      <Box className="preview__content">
        <Box
          className="preview__iframe-container"
          sx={{ backgroundColor: "grey.200" }}
        >
          <iframe
            className="preview__iframe"
            ref={iframeRef}
            src={`./preview.html#!${seachParams.toString()}`}
            title="Preview"
            style={{ width }}
            onLoad={() => setIframeLoaded(true)}
          />
        </Box>
      </Box>
    </div>
  );
};
