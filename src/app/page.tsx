"use client";
import { Editor, Nav, Preview, ResizeBar } from "@/components";
import { useCodeContext } from "@/contexts/CodeContext";
import { useFilesContext } from "@/contexts/FilesContext";
import { useEffect, useState, CSSProperties } from "react";

export default function Home() {
  const { pageWidth, codeWidth, smallScreen } = useCodeContext();
  const { files, isLoaded } = useFilesContext();
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    if (smallScreen) {
      setStyle({
        width: `calc(100vw - 60px)`,
        height: "100vh",
      });
    } else {
      setStyle({
        height: `calc(100vh - 60px)`,
        width: `100vw`,
      });
    }
  }, [smallScreen]);

  return (
    <>
      <Nav />
      <main className={`bg-gray-600`}>
        <div className="w-full flex">
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
