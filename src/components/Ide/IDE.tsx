import { CSSProperties, FC, useEffect, useState } from "react";
import ResizeBar from "./ResizeBar";
import LivePreview from "./LivePreview";
import { useFilesContext } from "@/contexts/FilesContext";
import Editor from "./Editor";
import { useCodeContext } from "@/contexts/CodeContext";

const IDE: FC = () => {
  const {
    pageWidth,
    pageHeight,
    codeWidth,
    smallScreen,
    codeHeight,
    isHorizontal,
  } = useCodeContext();
  const { isLoaded } = useFilesContext();
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const style = {
      height: `calc(100vh - 60px)`,
      width: `100vw`,
      marginTop: "60px",
      marginLeft: "0",
    };

    if (smallScreen) {
      style.width = `calc(100vw - 60px)`;
      style.height = "100vh";
      style.marginTop = "0";
      style.marginLeft = "60px";
    }

    setStyle(style);
  }, [smallScreen]);

  return (
    <main
      id="main"
      className={`py-[5px] px-[5px] vsm:py-0 vsm:pl-[5px] pl-0`}
      style={style}
    >
      <div
        className={`w-full h-full flex ${
          isHorizontal ? "flex-row" : "flex-col"
        }`}
      >
        <Editor
          width={isHorizontal ? codeWidth : "100%"}
          height={isHorizontal ? "100%" : codeHeight}
        />
        {!smallScreen && <ResizeBar />}
        <LivePreview
          width={isHorizontal ? pageWidth - +codeWidth : "100%"}
          height={isHorizontal ? "100%" : pageHeight - +codeHeight}
        />
      </div>
    </main>
  );
};

export default IDE;
