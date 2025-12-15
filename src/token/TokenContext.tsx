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
import { useGetTokens } from "./fetcher";
import { useSearchParams } from "../utils/router";

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
  const [tokens, setTokens] = useLocalStorage<object>("tokens", initialTokens);
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("t");
  const query = useGetTokens(tokenParam, setTokens);

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
          setTokens(query.data || initialTokens);
        },
      }}
    />
  );
};

export const useToken = () => useContext(TokenContext);
