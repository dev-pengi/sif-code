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
  const { files, isLoaded } = useFilesContext();
  const { smallScreen, switchedView, fullScreenMode } = useCodeContext();
  const [showPreview, setShowPreview] = useState<boolean>(true);

  const [mergedFiles, setMergedFiles] = useState<string>("");

  useEffect(() => {
    if (!smallScreen) return setShowPreview(true);
    setShowPreview(!switchedView);
  }, [switchedView, smallScreen]);

  useEffect(() => {
    setMergedFiles(mergeFile(files));
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
