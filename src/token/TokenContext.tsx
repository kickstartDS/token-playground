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
import { useSearchParams } from "../utils/router";
import { useGet, usePut } from "../utils/useFetch";

export interface ITokenContext {
  setTokens: Dispatch<SetStateAction<any>>;
  tokens: any;
  resetTokens: () => void;
  getPresetList: () => Promise<void>;
  presetListData: string[] | undefined;
  savePreset: (name?: string | null) => Promise<void>;
}

const TokenContext = createContext<ITokenContext>({
  setTokens() {},
  tokens: initialTokens,
  resetTokens() {},
  async getPresetList() {},
  presetListData: undefined,
  async savePreset() {},
});

export const TokenContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tokens, setTokens] = useLocalStorage<object>("tokens", initialTokens);
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("t");

  const { execute: getPreset, data: presetData } = useGet();
  const { execute: setPreset } = usePut();
  const { execute: getPresetList, data: presetListData } =
    useGet("/api/tokens/");

  useEffect(() => {
    if (tokenParam) {
      getPreset(`/api/tokens/${tokenParam}`)
        .then(setTokens)
        .catch(() => searchParams.delete("t", undefined, true));
    }
  }, [tokenParam]);

  useEffect(() => {
    localStorage.setItem("css", tokensToCss(tokens));
  }, [tokens]);

  return (
    <TokenContext.Provider
      value={{
        tokens,
        setTokens,
        resetTokens() {
          setTokens(presetData || initialTokens);
        },
        getPresetList,
        presetListData,
        async savePreset(name = tokenParam) {
          if (name)
            return setPreset(`/api/tokens/${name}`, {
              body: JSON.stringify(tokens),
            });
        },
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
