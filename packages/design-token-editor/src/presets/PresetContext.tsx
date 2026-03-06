import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useSearchParams } from "../utils/router";
import { useGet, usePut } from "../utils/useFetch";

export interface IPresetContext {
  presetName: string | undefined;
  preset: any | undefined;
  presetNames: string[] | undefined;
  getPresetList: () => Promise<void>;
  selectPreset: (name: string) => void;
  savePreset: (tokens: any, name?: string | null) => Promise<void>;
}

const PresetContext = createContext<IPresetContext>({
  presetName: undefined,
  preset: undefined,
  presetNames: undefined,
  async getPresetList() {},
  selectPreset() {},
  async savePreset() {},
});

export const PresetContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("t");

  const [presetName, setPresetName] = useState<string>();

  const { execute: getPreset, data: preset } = useGet();
  const { execute: putPreset } = usePut();
  const { execute: getPresetList, data: presetNames } = useGet("/api/tokens/");

  useEffect(() => {
    if (tokenParam !== presetName) {
      setPresetName(tokenParam || undefined);
    }
  }, [tokenParam]);

  useEffect(() => {
    if (presetName) {
      getPreset(`/api/tokens/${presetName}`).catch(() => searchParams.delete("t", undefined, true));
    }
  }, [presetName]);

  return (
    <PresetContext.Provider
      value={{
        presetName,
        preset,
        getPresetList,
        presetNames,
        selectPreset(name) {
          if (name !== tokenParam) searchParams.set("t", name);
        },
        async savePreset(tokens: any, name = tokenParam) {
          if (tokens && name)
            return putPreset(`/api/tokens/${name}`, {
              body: JSON.stringify(tokens),
            });
        },
      }}
    >
      {children}
    </PresetContext.Provider>
  );
};

export const usePreset = () => useContext(PresetContext);
