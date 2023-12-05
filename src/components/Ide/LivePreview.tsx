"use client";
import { useFilesContext } from "@/contexts/FilesContext";
import { FC, use, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { useCodeContext } from "@/contexts/CodeContext";
import axios from "axios";
import { File } from "@/constants";
import { mergeFile } from "@/utils";

interface LivePreviewProps {
  width: number | string;
  height?: number | string;
}

const LivePreview: FC<LivePreviewProps> = ({ width, height }) => {
  const { files, isLoaded, projectName } = useFilesContext();
  const { smallScreen, reversedView, fullScreenMode, previewKey } =
    useCodeContext();
  const [showPreview, setShowPreview] = useState<boolean>(true);

  const [mergedFiles, setMergedFiles] = useState<string>("");

  useEffect(() => {
    if (!smallScreen) return setShowPreview(true);
    setShowPreview(reversedView);
  }, [reversedView, smallScreen]);

  const handleFileUpdate = async () => {
    const HtmlFile = await mergeFile(files, projectName);
    setMergedFiles(HtmlFile);
  };
  useEffect(() => {
    handleFileUpdate();
  }, [files]);

  const fullPreviewStyle = {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: "0",
    left: 0,
    zIndex: 100,
  };
  const previewStyle = {
    width: smallScreen ? "100%" : width,
    height: smallScreen ? "100%" : height,
  };

  return (
    <>
      {showPreview && (
        <div
          id="preview-iframe"
          className="h-full border-black border-solid border-[1px] bg-white"
          style={fullScreenMode === "preview" ? fullPreviewStyle : previewStyle}
        >
          {isLoaded ? (
            <iframe
              srcDoc={mergedFiles}
              key={previewKey}
              title="output"
              sandbox="allow-scripts allow-same-origin"
              referrerPolicy="no-referrer"
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
