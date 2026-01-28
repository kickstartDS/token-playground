import { useEffect, useMemo, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Select } from "../controls/select/Select";
import "./Preview.scss";
import { useSearchParams } from "../utils/router";
import { Checkbox, FormControlLabel } from "@mui/material";

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
  const invertedParam = searchParams.get("inverted");

  const hash = useMemo(() => {
    if (pageParam) {
      switch (pageParam) {
        case "demo":
          switch (categoryParam) {
            case "5":
              return "transition-demo";
            case "4":
              return "shadow-demo";
            case "3":
              return "border-demo";
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

  return `./preview.html#!${hash}${invertedParam ? "?inverted=1" : ""}`;
};

export const Preview = () => {
  const searchParams = useSearchParams();

  const [width, setWidth] = useState(widths[0]);
  const [page, setPage] = useState(searchParams.get("page") || pages[0].value);
  const [inverted, setInverted] = useState(false);
  const iframeSrc = useIframeSrc();

  useEffect(() => {
    searchParams.set("page", page);
  }, [page]);

  useEffect(() => {
    if (inverted) {
      searchParams.set("inverted", "1");
    } else {
      searchParams.delete("inverted");
    }
  }, [inverted]);

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
          <FormControlLabel
            control={
              <Checkbox
                checked={inverted}
                onChange={(e) => setInverted(e.target.checked)}
              />
            }
            label="Inverted?"
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
            src={iframeSrc}
            title="Preview"
            style={{ width }}
          />
        </Box>
      </Box>
    </div>
  );
};
