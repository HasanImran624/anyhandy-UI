import { createContext, useCallback, useContext, useState } from "react";

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

const initailFormAttributes = {
  mainServiceDescription: "",
  selectedMainServiceCode: null,
  subServices: [],
  location: {},
  jobDetails: {
    isHourlyRate: true,
  },
};

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(1);
  const [formAttributes, setFormAttributes] = useState(initailFormAttributes);
  const [filesData, setFilesData] = useState(new FormData());

  const updateProgress = useCallback((newProgress) => {
    setProgress(newProgress);
  }, []);

  const resetAttributes = useCallback(() => {
    setFormAttributes(initailFormAttributes);
    setFilesData(new FormData());
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        updateProgress,
        formAttributes,
        setFormAttributes,
        resetAttributes,
        filesData,
        setFilesData,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
