import { createContext, useCallback, useContext, useState } from "react"

const ViewportContext = createContext();

export const ViewportProvider = ({ children }) => {
  let availableMedia = {
    "desktop": {
      name: "desktop",
      height: 720,
      width: 1024
    },
    "mobile": {
      name: "mobile",
      height: 667,
      width: 375
    },
  }
  let [currentMedia, setCurrentMedia] = useState(availableMedia["mobile"]);

  const setMedia = useCallback((name) => {
    setCurrentMedia(availableMedia[name]);
  }, []);

  let media = {
    setMedia,
    currentMedia,
    availableMedia
  }

  return (
    <ViewportContext.Provider value={{
      media
    }}>
      {children}
    </ViewportContext.Provider>
  )
}

export const useViewport = () => {
  const viewport = useContext(ViewportContext);
  return viewport;
}