/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useState, useEffect } from "react";

const FAST_INTERVAL = 10000;
const SLOW_INTERVAL = 60000;
const RANDOM_INTERVAL = 2000;

const RefreshContext = createContext({ slow: 0, fast: 0, random: 0 });

export const RefreshContextProvider = ({ children }) => {
  const [slow, setSlow] = useState(0);
  const [fast, setFast] = useState(0);
  const [random, setRandom] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      setSlow((prev) => prev + 1);
    }, SLOW_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      setFast((prev) => prev + 1);
    }, FAST_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      setRandom((prev) => prev + 1);
    }, RANDOM_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <RefreshContext.Provider value={{ slow, fast, random }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  const { slow, fast, random } = useContext(RefreshContext);
  return { slowRefresh: slow, fastRefresh: fast, randomRefresh: random };
};
