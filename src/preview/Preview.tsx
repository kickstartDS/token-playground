import { useEffect, useMemo, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { useToken } from "../token/TokenContext";
import { Select } from "../controls/select/Select";
import "./Preview.scss";
import { useSearchParams } from "../utils/router";

const widths = ["100%", "400px", "800px"];
const pages = [
  { value: "demo", label: "Demo" },
  { value: "landingpage", label: "Landingpage" },
  { value: "jobs", label: "Jobs" },
  { value: "jobs-detail", label: "Job Detail" },
  { value: "overview", label: "Overview" },
];

const useIframeSrc = () => {
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");
  const categoryParam = searchParams.get("cat");

  const hash = useMemo(() => {
    if (pageParam) {
      switch (pageParam) {
        case "demo":
          switch (categoryParam) {
            case "2":
              return "spacing-demo";
            case "1":
              return "font-demo";
            case "0":
            default:
              return "color-demo";
          }
        default:
          return pageParam;
      }
    }
    return "color-demo";
  }, [pageParam, categoryParam]);

  return `./preview.html#!${hash}`;
};

export const Preview = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const searchParams = useSearchParams();

  const [width, setWidth] = useState(widths[0]);
  const [page, setPage] = useState(searchParams.get("page") || pages[0].value);

  const { tokens, cssString } = useToken();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeSrc = useIframeSrc();

  useEffect(() => {
    searchParams.set("page", page);
  }, [page]);
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
            options={pages}
            value={page}
            onChange={setPage}
            label="preview"
          />
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
            src={iframeSrc}
            title="Preview"
            style={{ width }}
            onLoad={() => setIframeLoaded(true)}
          />
        </Box>
      </Box>
    </div>
  );
};
