import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import { tokensToCss } from "./tokensToCss";
import { initialTokens } from "./initialTokens";
import { useLocalStorage } from "../utils/useLocalStorage";
import { usePreset } from "../presets/PresetContext";

export interface ITokenContext {
  setTokens: Dispatch<SetStateAction<any>>;
  tokens: any;
  resetTokens: () => void;
  savePreset: (name?: string) => Promise<void>;
}

const TokenContext = createContext<ITokenContext>({
  setTokens() {},
  tokens: initialTokens,
  resetTokens() {},
  async savePreset() {},
});

export const TokenContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tokens, setTokens] = useLocalStorage<object>("tokens", initialTokens);
  const { preset, savePreset } = usePreset();

  useEffect(() => {
    localStorage.setItem("css", tokensToCss(tokens));
  }, [tokens]);

  return (
    <TokenContext.Provider
      value={{
        tokens,
        setTokens,
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
