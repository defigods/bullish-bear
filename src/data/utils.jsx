/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useState, useEffect } from "react";

const RefreshContext = createContext({ refresh: 0 });

export const RefreshContextProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      setRefresh((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <RefreshContext.Provider value={{ refresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  const { refresh } = useContext(RefreshContext);
  return refresh;
};
