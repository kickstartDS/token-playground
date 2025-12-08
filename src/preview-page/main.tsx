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

window.addEventListener(
  "message",
  (
    event: MessageEvent<{ css: string; _fontHref?: Record<string, string> }>
  ) => {
    if (event.data) {
      const { css, _fontHref = {} } = event.data;
      styleTag.textContent = css;
      for (const key in _fontHref) {
        updateLinkTag(key, _fontHref[key]);
      }
      // } else {
      //   console.log(event);
    }
  }
);

const categoryDemos: Record<string, LazyExoticComponent<FunctionComponent>> = {
  "0": lazy(
    () => import("@kickstartds/ds-agency-premium/playground/color-demo")
  ),
  "1": lazy(
    () => import("@kickstartds/ds-agency-premium/playground/font-demo")
  ),
  "2": lazy(
    () => import("@kickstartds/ds-agency-premium/playground/spacing-demo")
  ),
};

const Demo = () => {
  const [category, setCategory] = useState("0");
  const DemoComponent = useMemo(() => categoryDemos[category], [category]);
  const handler = useCallback(() => {
    const hash = location.hash.slice(2);
    const params = new URLSearchParams(hash);
    setCategory(params.get("cat") || "0");
  }, []);

  useEffect(() => {
    handler();
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, [handler]);

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
  </React.StrictMode>
);
