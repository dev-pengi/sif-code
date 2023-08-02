"use client";
import { useRef, useEffect, useState, CSSProperties } from "react";
import Editor, {
  DiffEditor,
  useMonaco,
  loader,
  Monaco,
} from "@monaco-editor/react";
import { useFilesContext } from "@/contexts/FilesContext";
import { File } from "@/constants";

interface MonacoEditorProps {
  width: number;
  style?: CSSProperties;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ width, style }) => {
  const { files, setFiles, activeFile, setActiveFile } = useFilesContext();
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  useEffect(() => {
    if (activeFile) {
      const file: File = files.find(
        (file: File) => file.type === activeFile
      ) as File;
      if (file) {
        setCurrentFile(file);
      }
    }
  }, [activeFile, files]);

  const handleCodeChange = (value: string | undefined) => {
    if (currentFile) {
      const newFile: File = {
        ...currentFile,
        content: value as string,
      };
      const newFiles = files.map((file) => {
        if (file.type === currentFile.type) {
          return newFile;
        }
        return file;
      });
      setActiveFile(currentFile.type);
      setCurrentFile(newFile);
      setFiles(newFiles);
    }
  };

  return (
    <Editor
      height="100%"
      theme="vs-dark"
      width={`${String(width)}px`}
      defaultLanguage={currentFile?.type}
      defaultValue={currentFile?.content}
      onChange={handleCodeChange}
      options={
        {
          minimap: {
            enabled: false,
          },
          fontSize: 16,
        } as any
      }
    />
  );
};

export default MonacoEditor;
