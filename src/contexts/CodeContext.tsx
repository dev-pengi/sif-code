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
  codeHeight: number;
  previewWidth: number;
  previewHeight: number;
  smallScreen: boolean;
  switchedView: boolean;
  theme: "light" | "dark";
  isHorizontal: boolean;
  setPageWidth: React.Dispatch<React.SetStateAction<number>>;
  setPageHeight: React.Dispatch<React.SetStateAction<number>>;
  setCodeWidth: React.Dispatch<React.SetStateAction<number>>;
  setCodeHeight: React.Dispatch<React.SetStateAction<number>>;
  setPreviewWidth: React.Dispatch<React.SetStateAction<number>>;
  setPreviewHeight: React.Dispatch<React.SetStateAction<number>>;
  setSmallScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchedView: React.Dispatch<React.SetStateAction<boolean>>;
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  setIsHorizontal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CodeContext = createContext<CodeContextValue>({
  pageWidth: 0,
  pageHeight: 0,
  codeWidth: typeof window === "undefined" ? 0 : window.innerWidth / 2,
  codeHeight: typeof window === "undefined" ? 0 : window.innerHeight / 2,
  previewWidth: 0,
  previewHeight: 0,
  smallScreen: false,
  switchedView: false,
  theme: "dark",
  isHorizontal: true,
  setPageWidth: () => {},
  setPageHeight: () => {},
  setCodeWidth: () => {},
  setCodeHeight: () => {},
  setPreviewWidth: () => {},
  setPreviewHeight: () => {},
  setSmallScreen: () => {},
  setSwitchedView: () => {},
  setTheme: () => {},
  setIsHorizontal: () => {},
});

export const useCodeContext = () => useContext(CodeContext);

interface CodeProviderProps {
  children: ReactNode;
}

const CodeProvider: FC<CodeProviderProps> = ({ children }) => {
  const [pageWidth, setPageWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [codeWidth, setCodeWidth] = useState<number>(
    typeof window === "undefined" ? 0 : window.innerWidth / 2
  );
  const [codeHeight, setCodeHeight] = useState<number>(
    typeof window === "undefined" ? 0 : window.innerHeight / 2
  );
  const [previewWidth, setPreviewWidth] = useState<number>(0);
  const [previewHeight, setPreviewHeight] = useState<number>(0);

  const [smallScreen, setSmallScreen] = useState(false);

  const [switchedView, setSwitchedView] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isHorizontal, setIsHorizontal] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const localTheme = window.localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme as "light" | "dark");
    } else {
      window.localStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const localView = window.localStorage.getItem("view");
    if (localView) {
      setSwitchedView(Number(localView) ? true : false);
    } else {
      window.localStorage.setItem("view", "0");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("view", switchedView ? "1" : "0");
  }, [switchedView]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 600) {
      setSmallScreen(true);
      setPageWidth(window.innerWidth - 65);
    } else {
      setSmallScreen(false);
      setPageWidth(window.innerWidth);
    }
  }, [pageWidth]);

  const handlePreviewResize = () => {
    const previewIframe = document.getElementById("preview-iframe");
    if (previewIframe) {
      setPreviewWidth(previewIframe.offsetWidth);
      setPreviewHeight(previewIframe.offsetHeight);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mainElement = document.getElementById("main");
      if (mainElement) {
        setPageWidth(mainElement.offsetWidth - 5);
        setPageHeight(mainElement.offsetHeight - 10);
      }
    };

    if (typeof window === "undefined") {
      window.addEventListener("resize", handleResize);
    }
    handleResize();

    return () => {
      if (typeof window === "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    handlePreviewResize();
  }, [pageWidth, pageHeight, codeWidth, codeHeight, isHorizontal]);

  useEffect(() => {
    setIsHorizontal(!switchedView);
  }, [switchedView]);

  const value: CodeContextValue = {
    pageWidth,
    pageHeight,
    codeWidth,
    codeHeight,
    previewWidth,
    previewHeight,
    smallScreen,
    switchedView,
    theme,
    isHorizontal,
    setPageWidth,
    setPageHeight,
    setCodeWidth,
    setCodeHeight,
    setPreviewWidth,
    setPreviewHeight,
    setSmallScreen,
    setSwitchedView,
    setTheme,
    setIsHorizontal,
  };

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
};

export default CodeProvider;
