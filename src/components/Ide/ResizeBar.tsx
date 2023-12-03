import { useCodeContext } from "@/contexts/CodeContext";
import { FC, useRef, useState, useEffect } from "react";

const ResizeBar: FC = () => {
  const {
    pageWidth,
    pageHeight,
    codeWidth,
    reversedView,
    isHorizontal,
    setCodeWidth,
    setCodeHeight,
  } = useCodeContext();
  const [resizing, setResizing] = useState(false);
  const resizeBarRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = () => {
    setResizing(true);
  };

  const handleResizeMouseMove = (e: MouseEvent) => {
    if (resizing && resizeBarRef.current) {
      if (isHorizontal) {
        const newPageWidth = reversedView ? pageWidth - e.clientX : e.clientX;
        const minWidth = 101;
        const maxWidth = pageWidth - 101;
        const clampedWidth = Math.max(
          minWidth,
          Math.min(maxWidth, newPageWidth)
        );
        setCodeWidth(clampedWidth);
      } else {
        const newPageHeight = reversedView
          ? (pageHeight - e.clientY) + 65
          : e.clientY - 65;
        const minHeight = 101;
        const maxHeight = pageHeight - 101;
        const clampedHeight = Math.max(
          minHeight,
          Math.min(maxHeight, newPageHeight)
        );
        setCodeHeight(clampedHeight);
      }
    }
  };

  useEffect(() => {
    if (!pageWidth) return;

    const minWidth = 100;
    const maxWidth = pageWidth - 100;
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
        className={`${
          isHorizontal
            ? "w-[5px] h-full cursor-col-resize"
            : "h-[10px] w-full cursor-row-resize"
        } bg-transparent`}
        onMouseDown={handleMouseDown}
      />

      {resizing && (
        <div
          className={`w-screen h-screen fixed top-0 left-0 ${
            isHorizontal ? "cursor-col-resize" : "cursor-row-resize"
          }`}
        />
      )}
    </>
  );
};

export default ResizeBar;
