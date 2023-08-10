"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { FileType, File, initialFiles } from "@/constants";
import debounce from "lodash/debounce";
import axios from "axios";
import * as BrowserFS from "browserfs";

interface FilesContextValue {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  activeFile: string;
  setActiveFile: React.Dispatch<React.SetStateAction<string>>;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilesContext = createContext<FilesContextValue>({
  files: [],
  setFiles: () => {},
  activeFile: "index.html",
  setActiveFile: () => {},
  isLoaded: false,
  setIsLoaded: () => {},
});

export const useFilesContext = () => useContext(FilesContext);

interface FilesProviderProps {
  children: ReactNode;
}

const FilesProvider: FC<FilesProviderProps> = ({ children }) => {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [activeFile, setActiveFile] = useState<string>("index.html");

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const value: FilesContextValue = {
    files,
    setFiles,
    activeFile,
    setActiveFile,
    isLoaded,
    setIsLoaded,
  };

  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
  );
};

export default FilesProvider;
