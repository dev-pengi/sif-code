"use client";
import { useFilesContext } from "@/contexts/FilesContext";
import { FC, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { useCodeContext } from "@/contexts/CodeContext";

interface LivePreviewProps {
  width: number | string;
  height?: number | string;
}

const LivePreview: FC<LivePreviewProps> = ({ width, height }) => {
  const { files, isLoaded } = useFilesContext();
  const { smallScreen, switchedView } = useCodeContext();
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [showPreview, setShowPreview] = useState<boolean>(true);

  useEffect(() => {
    if (!smallScreen) return setShowPreview(true);
    setShowPreview(!switchedView);
  }, [switchedView, smallScreen]);

  const reloadIframe = () => {
    setIframeKey((prev: number) => prev + 1);
  };

  const debouncedReload = debounce(reloadIframe, 500);

  useEffect(() => {
    debouncedReload();
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
          key={iframeKey}
        >
          {isLoaded ? (
            <iframe
              src="index.html"
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
