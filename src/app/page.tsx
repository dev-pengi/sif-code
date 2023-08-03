"use client";
import { Editor, Nav, Preview, ResizeBar } from "@/components";
import { useCodeContext } from "@/contexts/CodeContext";
import { useFilesContext } from "@/contexts/FilesContext";
import { useEffect, useState, CSSProperties } from "react";

export default function Home() {
  const { pageWidth, codeWidth, smallScreen } = useCodeContext();
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
    <>
      <Nav />
      <main id="main" className={`px-[5px] pb-[5px]`} style={style}>
        <div className="w-full h-full flex">
          <Editor width={codeWidth} />
          {isLoaded && (
            <>
              <ResizeBar />
              <Preview width={pageWidth - codeWidth} />
            </>
          )}
        </div>
      </main>
    </>
  );
}
