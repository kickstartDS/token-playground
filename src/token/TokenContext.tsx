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

export interface ITokenContext {
  setTokens: Dispatch<SetStateAction<any>>;
  tokens: any;
  resetTokens: () => void;
}

const TokenContext = createContext<ITokenContext>({
  setTokens() {},
  tokens: initialTokens,
  resetTokens() {},
});

export const TokenContextProvider: FC<PropsWithChildren> = (props) => {
  const [tokens, setTokens] = useLocalStorage("tokens", initialTokens);

  useEffect(() => {
    localStorage.setItem("css", tokensToCss(tokens));
  }, [tokens]);

  return (
    <TokenContext.Provider
      {...props}
      value={{
        tokens,
        setTokens,
        resetTokens() {
          setTokens(initialTokens);
        },
      }}
    />
  );
};

export const useToken = () => useContext(TokenContext);
