import initialTokens from "@kickstartds/ds-agency-premium/tokens/branding-tokens.json";
import { tokensToCss } from "@kickstartds/ds-agency-premium/tokens/tokensToCss.mjs";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { usePreset } from "../presets/PresetContext";
import { useLocalStorage } from "../utils/useLocalStorage";

export interface ITokenContext {
  setTokens: Dispatch<SetStateAction<any>>;
  tokens: any;
  css: string;
  resetTokens: () => void;
  savePreset: (name?: string) => Promise<void>;
}

const TokenContext = createContext<ITokenContext>({
  setTokens() {},
  tokens: initialTokens,
  css: tokensToCss(initialTokens),
  resetTokens() {},
  async savePreset() {},
});

export const TokenContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tokens, setTokens] = useLocalStorage<object>("tokens", initialTokens);
  const { preset, savePreset } = usePreset();
  const css = useMemo(() => tokensToCss(tokens), [tokens]);

  useEffect(() => {
    localStorage.setItem("css", css);
  }, [css]);

  useEffect(() => {
    if (preset) setTokens(preset);
  }, [preset]);

  return (
    <TokenContext.Provider
      value={{
        tokens,
        setTokens,
        css,
        resetTokens() {
          setTokens(preset || initialTokens);
        },
        savePreset(name) {
          return savePreset(tokens, name);
        },
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
