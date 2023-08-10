"use client";
import { useFilesContext } from "@/contexts/FilesContext";
import { FC, use, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { useCodeContext } from "@/contexts/CodeContext";
import axios from "axios";
import { File } from "@/constants";

interface LivePreviewProps {
  width: number | string;
  height?: number | string;
}

const LivePreview: FC<LivePreviewProps> = ({ width, height }) => {
  const { files, isLoaded } = useFilesContext();
  const { smallScreen, switchedView } = useCodeContext();
  const [showPreview, setShowPreview] = useState<boolean>(true);

  const [htmlFile, setHtmlFile] = useState<File | null>(null);
  const [cssFile, setCssFile] = useState<string>("");
  const [jsFile, setJsFile] = useState<string>("");

  useEffect(() => {
    if (!smallScreen) return setShowPreview(true);
    setShowPreview(!switchedView);
  }, [switchedView, smallScreen]);

  const getHtmlFile = (): File => {
    return files.find(
      (file) => file.type === "html" && file.name === "index.html"
    ) as File;
  };

  const getCssFiles = (): string => {
    const cssFiles = files.filter((file) => file.type === "css");

    if (cssFiles.length === 0) return "";

    return cssFiles.reduce((acc, file) => {
      return acc + file.content;
    }, "");
  };

  const getJsFiles = (): string => {
    const jsFiles = files.filter((file) => file.type === "javascript");

    if (jsFiles.length === 0) return "";

    return jsFiles.reduce((acc, file) => {
      return acc + file.content + "\n";
    }, "");
  };

  useEffect(() => {
    setHtmlFile(getHtmlFile());
    setCssFile(getCssFiles());
    setJsFile(getJsFiles());
  }, [files]);

  return (
    <>
      {showPreview && (
        <div
          id="preview-iframe"
          className="h-full border-black border-solid border-[1px] bg-white"
          style={{
            width: smallScreen ? "100%" : width,
            height: smallScreen ? "100%" : height,
          }}
        >
          {isLoaded ? (
            <iframe
              srcDoc={`<!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Document</title>
                  <style>
                    ${cssFile}
                  </style>
                </head>
                <body>
                  ${htmlFile?.content}
                  <script>
                     ${jsFile}
                  </script>
                </body>
                `}
              title="output"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-top-navigation allow-top-navigation-by-user-activation"
              width="100%"
              height="100%"
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-lg">Loading...</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LivePreview;
