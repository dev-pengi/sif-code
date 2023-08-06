"use client";
import { useEffect, useState, CSSProperties, use } from "react";
import MonacoEditor, {
  DiffEditor,
  useMonaco,
  loader,
  Monaco,
} from "@monaco-editor/react";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import { useFilesContext } from "@/contexts/FilesContext";
import { File } from "@/constants";
import { useCodeContext } from "@/contexts/CodeContext";

interface EditorProps {
  width: number | string;
  height?: number | string;
  style?: CSSProperties;
}

const Editor: React.FC<EditorProps> = ({ width, height, style }) => {
  const { files, setFiles, activeFile, setActiveFile } = useFilesContext();
  const { theme, switchedView, smallScreen } = useCodeContext();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    if (!smallScreen) return setShowEditor(true);
    setShowEditor(switchedView);
  }, [switchedView, smallScreen]);

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

  const handleEditorDidMount = () => {
    emmetHTML(window.monaco);
    emmetCSS(window.monaco);
  };

  return (
    <>
      {showEditor && (
        <MonacoEditor
          className="border-black border-solid border-[1px]"
          height={smallScreen ? "100%" : height}
          theme={`vs-${theme}`}
          width={smallScreen ? "100%" : width}
          defaultLanguage={currentFile?.type}
          value={currentFile?.content}
          onMount={handleEditorDidMount}
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
      )}
    </>
  );
};

export default Editor;
