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
  projectName: string;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  activeFile: string;
  setActiveFile: React.Dispatch<React.SetStateAction<string>>;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilesContext = createContext<FilesContextValue>({
  files: [],
  setFiles: () => {},
  projectName: "My New Project",
  setProjectName: () => {},
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
  const [projectName, setProjectName] = useState<string>("My New Project");

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

  const receiveShortcutMessage = (event: MessageEvent) => {
    const action = event.data;
    if (action === "navigateNext") {
      setNextFileActive();
    }
    if (action === "navigatePrevious") {
      setPreviousFileActive();
    }
  };

  useEffect(() => {
    window.addEventListener("message", receiveShortcutMessage);
    return () => {
      window.removeEventListener("message", receiveShortcutMessage);
    };
  }, [activeFile, files]);

  useEffect(() => {
    if (!activeFile) return;

    if (!fileNavigationHistory.includes(activeFile)) {
      setFileNavigationHistory((prev) => [...prev, activeFile]);
    } else {
      setFileNavigationHistory((prev) => {
        return [...prev.filter((file) => file != activeFile), activeFile];
      });
    }

    setFileNavigationHistory((prev) =>
      prev.filter((file) => files.find((f) => f.name === file))
    );
  }, [activeFile, files]);

  useEffect(() => {
    const file = files.find((f) => f.name === activeFile);
    if (!file) {
      const lastValidFile =
        fileNavigationHistory[fileNavigationHistory.length - 1];
      setActiveFile(lastValidFile);
    }
  }, [fileNavigationHistory, activeFile]);

  const value: FilesContextValue = {
    files,
    setFiles,
    projectName,
    setProjectName,
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
