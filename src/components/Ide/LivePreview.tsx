"use client";
import { useFilesContext } from "@/contexts/FilesContext";
import { FC, useEffect, useState } from "react";
import debounce from "lodash/debounce";

interface LivePreviewProps {
  width: number;
}

const LivePreview: FC<LivePreviewProps> = ({ width }) => {
  const { files } = useFilesContext();
  const [iframeKey, setIframeKey] = useState<number>(0);

  // Function to reload the iframe content
  const reloadIframe = () => {
    setIframeKey((prev: number) => prev + 1);
  };

  // Debounce the reloadIframe function using lodash's debounce
  const debouncedReload = debounce(reloadIframe, 500); // Adjust the debounce delay as needed (500ms in this example)

  // Update the iframe key whenever "files" change
  useEffect(() => {
    debouncedReload();
  }, [files]);

  return (
    <div className="h-full border-black border-solid border-[1px] bg-white" style={{ width: `${width}px` }}>
      <iframe
        key={iframeKey}
        src={"/index.html"}
        title="output"
        sandbox="allow-scripts"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default LivePreview;
