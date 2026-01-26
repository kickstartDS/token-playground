import React, {
  FunctionComponent,
  lazy,
  LazyExoticComponent,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactDOM from "react-dom/client";
import { PageWrapper } from "@kickstartds/ds-agency-premium/page-wrapper";
import Providers from "@kickstartds/ds-agency-premium/providers";
import "@kickstartds/ds-agency-premium/global.client.js";
import "@kickstartds/ds-agency-premium/global.css";

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

const updateTokens = () => {
  styleTag.textContent = localStorage.getItem("css");

  const rawTokens = localStorage.getItem("tokens");
  if (rawTokens) {
    try {
      const tokens = JSON.parse(rawTokens);
      const { _fontHref = {} } = tokens;
      for (const key in _fontHref) {
        updateLinkTag(key, _fontHref[key]);
      }
    } catch (e) {
      console.error(e);
      console.log("rawTokens", rawTokens);
    }
  }
};

window.addEventListener("storage", updateTokens);
updateTokens();

const pages: Record<string, LazyExoticComponent<FunctionComponent>> = {
  "color-demo": lazy(
    () => import("@kickstartds/ds-agency-premium/playground/color-demo"),
  ),
  "font-demo": lazy(
    () => import("@kickstartds/ds-agency-premium/playground/font-demo"),
  ),
  "spacing-demo": lazy(
    () => import("@kickstartds/ds-agency-premium/playground/spacing-demo"),
  ),
  landingpage: lazy(
    () => import("@kickstartds/ds-agency-premium/pages/landingpage"),
  ),
  about: lazy(() => import("@kickstartds/ds-agency-premium/pages/about")),
  jobs: lazy(() => import("@kickstartds/ds-agency-premium/pages/jobs")),
  "jobs-detail": lazy(
    () => import("@kickstartds/ds-agency-premium/pages/jobs-detail"),
  ),
  overview: lazy(() => import("@kickstartds/ds-agency-premium/pages/overview")),
};

const Demo = () => {
  const [category, setCategory] = useState("color-demo");
  const DemoComponent = useMemo(() => pages[category], [category]);
  const hashHandler = useCallback(() => {
    const hash = location.hash.slice(2).split("?")[0];
    if (hash) setCategory(hash);
  }, []);

  useEffect(() => {
    hashHandler();
    window.addEventListener("hashchange", hashHandler);
    return () => window.removeEventListener("hashchange", hashHandler);
  }, [hashHandler]);

  const invertedHandler = useCallback(() => {
    const query = location.hash.slice(2).split("?")[1];
    const params = new URLSearchParams(query);
    const inverted = params.get("inverted");
    if (inverted === "1") {
      document.documentElement
        .querySelector("#root")
        ?.setAttribute("ks-inverted", "true");
    } else {
      document.documentElement
        .querySelector("#root")
        ?.removeAttribute("ks-inverted");
    }
  }, []);

  useEffect(() => {
    invertedHandler();
    window.addEventListener("hashchange", invertedHandler);
    return () => window.removeEventListener("hashchange", invertedHandler);
  }, [invertedHandler]);

  return (
    <Suspense>
      <DemoComponent />
    </Suspense>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <style>{`
      head, style[data-tokens] {
        display: block;
        white-space: pre; 
        font-family: var(--ks-brand-font-family-mono);
      }
    `}</style> */}
    <PageWrapper>
      <Providers>
        <Demo />
      </Providers>
    </PageWrapper>
  </React.StrictMode>,
);
