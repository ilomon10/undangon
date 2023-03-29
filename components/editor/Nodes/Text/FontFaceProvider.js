import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDebounce, useList, useQueue } from "react-use";

const FontFaceContext = createContext(null);

export const FontFaceProvider = ({ children }) => {
  const [list, { push }] = useList([]);
  const loadQueue = useQueue();

  const loadFactory = async (fontFamily) => {
    try {
      const WebFont = await import("webfontloader");
      await WebFont.load({
        google: {
          families: [fontFamily],
        },
      });
      push(fontFamily);
    } catch (err) {
      console.error(err);
    }
  };

  const loadFont = async (fontFamily) => {
    let item = {
      family: fontFamily,
      call: () => loadFactory(fontFamily),
    };
    await loadQueue.add(item);
  };

  useDebounce(
    async () => {
      if (!loadQueue.first || loadQueue.size === 0) {
        return;
      }
      let isLoaded = list.indexOf(loadQueue.first.family);
      if (isLoaded < 0) {
        await loadQueue.first.call();
      }
      await loadQueue.remove();
    },
    100,
    [loadQueue.size]
  );

  return (
    <FontFaceContext.Provider
      value={{
        loaded: list,
        load: loadFont,
      }}
    >
      {children}
    </FontFaceContext.Provider>
  );
};

export const useFontFace = () => {
  const fontFace = useContext(FontFaceContext);
  return fontFace;
};
