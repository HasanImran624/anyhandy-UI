import { createContext, useCallback, useContext, useState } from "react";

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

const initailFormAttributes = {
  mainServiceDescription: "",
  selectedMainServiceCode: null,
  subServices: [],
  location: {},
};

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(1);
  const [formAttributes, setFormAttributes] = useState(initailFormAttributes);

  const updateProgress = useCallback((newProgress) => {
    setProgress(newProgress);
  }, []);

  const resetAttributes = useCallback(
    () => setFormAttributes(initailFormAttributes),
    []
  );

  return (
    <ProgressContext.Provider
      value={{
        progress,
        updateProgress,
        formAttributes,
        setFormAttributes,
        resetAttributes,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
