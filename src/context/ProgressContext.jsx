import { createContext, useContext, useState } from 'react'

const ProgressContext = createContext()

export const useProgress = () => useContext(ProgressContext)

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(1);

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
