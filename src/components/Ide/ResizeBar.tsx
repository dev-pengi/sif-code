import { useCodeContext } from "@/contexts/CodeContext";
import { FC, useRef, useState, useEffect } from "react";

const ResizeBar: FC = () => {
  const {
    pageWidth,
    pageHeight,
    codeWidth,
    codeHeight,
    previewWidth,
    previewHeight,
    smallScreen,
    switchedView,
    isHorizontal,
    setCodeWidth,

  } = useCodeContext();
  const [resizing, setResizing] = useState(false);
  const resizeBarRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = () => {
    setResizing(true);
  };

  const handleResizeMouseMove = (e: MouseEvent) => {
    if (resizing && resizeBarRef.current) {
      if (isHorizontal) {
        const newPageWidth = e.clientX;
        const minWidth = 300;
        const maxWidth = pageWidth - 200;
        const clampedWidth = Math.max(
          minWidth,
          Math.min(maxWidth, newPageWidth)
        );
        setCodeWidth(clampedWidth);
      }
      
    }
  };

  useEffect(() => {
    if (!pageWidth) return;

    const minWidth = 300;
    const maxWidth = pageWidth - 200;
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, +codeWidth));

    if (+codeWidth < minWidth || +codeWidth > maxWidth) {
      setCodeWidth(clampedWidth);
    }
  }, [pageWidth, codeWidth]);

  useEffect(() => {
    const handleResizeMouseUp = () => {
      if (resizing) {
        setResizing(false);
      }
    };

    if (resizing) {
      document.addEventListener("mousemove", handleResizeMouseMove);
      document.addEventListener("mouseup", handleResizeMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleResizeMouseMove);
      document.removeEventListener("mouseup", handleResizeMouseUp);
    };
  }, [resizing, setCodeWidth]);

  return (
    <>
      <div
        ref={resizeBarRef}
        className="w-[5px] bg-transparent cursor-col-resize"
        style={{ left: pageWidth }}
        onMouseDown={handleMouseDown}
      />

      {resizing && (
        <div className="w-screen h-screen fixed top-0 cursor-col-resize" />
      )}
    </>
  );
};

export default ResizeBar;
