"use client";
import {
  createContext,
  useState,
  useContext,
  FC,
  ReactNode,
  useEffect,
} from "react";

interface CodeContextValue {
  pageWidth: number;
  pageHeight: number;
  codeWidth: number;
  theme: "light" | "dark";
  isColumn: boolean;
  smallScreen: boolean;
  setPageWidth: React.Dispatch<React.SetStateAction<number>>;
  setPageHeight: React.Dispatch<React.SetStateAction<number>>;
  setCodeWidth: React.Dispatch<React.SetStateAction<number>>;
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  setIsColumn: React.Dispatch<React.SetStateAction<boolean>>;
  setSmallScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CodeContext = createContext<CodeContextValue>({
  pageWidth: 0,
  pageHeight: 0,
  codeWidth: 0,
  theme: "dark",
  isColumn: true,
  smallScreen: false,
  setPageWidth: () => {},
  setPageHeight: () => {},
  setCodeWidth: () => {},
  setTheme: () => {},
  setIsColumn: () => {},
  setSmallScreen: () => {},
});

export const useCodeContext = () => useContext(CodeContext);

interface CodeProviderProps {
  children: ReactNode;
}

const CodeProvider: FC<CodeProviderProps> = ({ children }) => {
  const [pageWidth, setPageWidth] = useState(window.innerWidth - 5);
  const [pageHeight, setPageHeight] = useState(window.innerHeight);

  const [codeWidth, setCodeWidth] = useState(window.innerWidth / 2);

  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isColumn, setIsColumn] = useState(true);
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    if (pageWidth < 450) {
      setSmallScreen(true);
      setPageWidth(window.innerWidth - 65);
    } else {
      setSmallScreen(false);
      setPageWidth(window.innerWidth);
    }
  }, [pageWidth]);

  const value: CodeContextValue = {
    pageWidth,
    pageHeight,
    codeWidth,
    theme,
    isColumn,
    smallScreen,
    setPageWidth,
    setPageHeight,
    setCodeWidth,
    setTheme,
    setIsColumn,
    setSmallScreen,
  };
  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth - 5);
      setPageHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
};

export default CodeProvider;
