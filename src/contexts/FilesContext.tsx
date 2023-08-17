"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { File, initialFiles } from "@/constants";
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
  const [fileNavigationHistory, setFileNavigationHistory] = useState<string[]>([
    "index.html",
  ]);
  const [activeFile, setActiveFile] = useState<string>("index.html");

  const [isLoaded, setIsLoaded] = useState(false);

  const setNextFileActive = () => {
    const currentFileIndex = files.findIndex(
      (file) => file.name === activeFile
    );
    const nextFileIndex = currentFileIndex + 1;
    const nextFile = files[nextFileIndex];
    if (nextFile) {
      setActiveFile(nextFile.name);
    }
  };

  const setPreviousFileActive = () => {
    const currentFileIndex = files.findIndex(
      (file) => file.name === activeFile
    );
    const previousFileIndex = currentFileIndex - 1;
    const previousFile = files[previousFileIndex];
    if (previousFile) {
      setActiveFile(previousFile.name);
    }
  };

  const checkShortCut = (event: KeyboardEvent, key: string) => {
    const condition =
      event.ctrlKey &&
      event.altKey &&
      event.key.toLowerCase() === key.toLowerCase();
    return condition;
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (checkShortCut(event, "ArrowRight")) setNextFileActive();
      if (checkShortCut(event, "ArrowLeft")) setPreviousFileActive();
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeFile, files]);

  useEffect(() => {
    if (fileNavigationHistory.includes(activeFile)) {
      setFileNavigationHistory((prev) => {
        const updatedHistory = prev.filter((file) => file !== activeFile);
        return [...updatedHistory, activeFile];
      });
    } else {
      setFileNavigationHistory((prev) => [...prev, activeFile]);
    }
  }, [activeFile]);

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
