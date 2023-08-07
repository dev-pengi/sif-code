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

interface FilesContextValue {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  activeFile: FileType;
  setActiveFile: React.Dispatch<React.SetStateAction<FileType>>;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilesContext = createContext<FilesContextValue>({
  files: [],
  setFiles: () => {},
  activeFile: "css",
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
  const [activeFile, setActiveFile] = useState<FileType>("html");

  const [isLoaded, setIsLoaded] = useState(false);

  const updateFilesCache = async () => {
    const { data } = await axios.post("/files", { files });
    if (data) {
      !isLoaded && setIsLoaded(true);
    }
  };

  const debouncedUpdateFilesCache = debounce(updateFilesCache, 100);
  
  useEffect(() => {
    debouncedUpdateFilesCache();
  }, [files]);


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
