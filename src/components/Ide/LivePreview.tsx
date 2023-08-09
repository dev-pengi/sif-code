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
  const [cssFile, setCssFile] = useState<File | null>(null);
  const [jsFile, setJsFile] = useState<File | null>(null);

  useEffect(() => {
    if (!smallScreen) return setShowPreview(true);
    setShowPreview(!switchedView);
  }, [switchedView, smallScreen]);

  const getHtmlFile = (): File => {
    return files.find(
      (file) => file.type === "html" && file.name === "index.html"
    ) as File;
  };

  const getCssFile = (): File => {
    return files.find(
      (file) => file.type === "css" && file.name === "style.css"
    ) as File;
  };

  const getJsFile = (): File => {
    return files.find(
      (file) => file.type === "javascript" && file.name === "script.js"
    ) as File;
  };

  useEffect(() => {
    setHtmlFile(getHtmlFile());
    setCssFile(getCssFile());
    setJsFile(getJsFile());
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
                    ${cssFile?.content}
                  </style>
                </head>
                <body>
                  ${htmlFile?.content}
                  <script>
                    ${jsFile?.content}
                  </script>
                </body>
                `}
              title="output"
              sandbox="allow-scripts"
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
