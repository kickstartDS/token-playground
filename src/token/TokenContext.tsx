import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { tokensToCss } from "./tokensToCss";
import { initialTokens } from "./initialTokens";

export interface ITokenContext {
  setTokens: Dispatch<SetStateAction<any>>;
  tokens: any;
  cssString?: string;
}

const TokenContext = createContext<ITokenContext>({
  setTokens() {},
  tokens: initialTokens,
});

export const TokenContextProvider: FC<PropsWithChildren> = (props) => {
  const [tokens, setTokens] = useState(initialTokens);
  const cssString = useMemo(() => tokensToCss(tokens), [tokens]);

  return (
    <TokenContext.Provider
      {...props}
      value={{ tokens, setTokens, cssString }}
    />
  );
};

export const useToken = () => useContext(TokenContext);
