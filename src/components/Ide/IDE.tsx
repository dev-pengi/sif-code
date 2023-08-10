import { FC } from "react";
import ResizeBar from "./ResizeBar";
import LivePreview from "./LivePreview";
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
  return (
    <main
      className={`vsm:px-[5px] vsm:pb-[5px] w-[calc(100vw-60px)] h-screen mt-0 ml-[60px] vsm:w-full vsm:h-[calc(100vh-60px)] vsm:mt-[60px] vsm:ml-0`}
    >
      <div
        id="main"
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
