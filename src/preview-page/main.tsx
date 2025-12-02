import React from "react";
import ReactDOM from "react-dom/client";
import "@kickstartds/base/lib/global/base.js";
import "@kickstartds/base/lib/global/base.css";

const styleTag = document.createElement("style");
styleTag.setAttribute("data-tokens", "");
document.head.appendChild(styleTag);

const updateLinkTag = (key: string, href: string | undefined) => {
  let linkTag = document.head.querySelector(`[data-font="${key}"]`);

  if (href) {
    if (!linkTag) {
      linkTag = document.createElement("link");
      (linkTag as HTMLLinkElement).rel = "stylesheet";
      linkTag.setAttribute("data-font", key);
      document.head.appendChild(linkTag);
    }
    (linkTag as HTMLLinkElement).href = href;
  } else if (linkTag) {
    document.head.removeChild(linkTag);
  }
};

window.addEventListener(
  "message",
  (
    event: MessageEvent<{ css: string; _fontHref?: Record<string, string> }>
  ) => {
    const { css, _fontHref = {} } = event.data;
    styleTag.textContent = css;
    for (const key in _fontHref) {
      updateLinkTag(key, _fontHref[key]);
    }
  }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <style>{`
      head, style[data-tokens] {
        display: block;
        white-space: pre; 
        font-family: var(--ks-brand-font-family-mono);
      }
    `}</style>
  </React.StrictMode>
);
