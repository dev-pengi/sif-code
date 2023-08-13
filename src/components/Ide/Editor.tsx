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
import FilesBar from "./FilesBar";

interface EditorProps {
  width: number | string;
  height?: number | string;
}

const Editor: React.FC<EditorProps> = ({ width, height }) => {
  const { files, setFiles, activeFile, setActiveFile } = useFilesContext();
  const { theme, reversedView, smallScreen, fullScreenMode } = useCodeContext();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    if (!smallScreen) return setShowEditor(true);
    setShowEditor(!reversedView);
  }, [reversedView, smallScreen]);

  useEffect(() => {
    if (activeFile) {
      const file: File = files.find(
        (file: File) => file.name === activeFile
      ) as File;
      if (file) {
        setCurrentFile(file);
      } else {
        setActiveFile(files[0].name);
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
        if (file.name === currentFile.name) {
          return newFile;
        }
        return file;
      });
      setActiveFile(currentFile.name);
      setCurrentFile(newFile);
      setFiles(newFiles);
    }
  };

  const handleEditorDidMount = () => {
    if (typeof window === "undefined") return;
    emmetHTML(window.monaco);
    emmetCSS(window.monaco);
  };

  const fulleditorStyle = {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: "0",
    left: 0,
    zIndex: 100,
  };
  const editorStyle = {
    width: smallScreen ? "100%" : width,
    height: smallScreen ? "100%" : height,
  };

  return (
    <>
      {showEditor && (
        <div style={fullScreenMode === "code" ? fulleditorStyle : editorStyle}>
          <FilesBar />
          <div
            className="h-[calc(100%-50px)] w-full mt-[50x]"
            style={{
              height: "calc(100% - 50px)",
            }}
          >
            <MonacoEditor
              className=""
              width={"100%"}
              height={"100%"}
              theme={`vs-${theme}`}
              language={currentFile?.type}
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
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;
