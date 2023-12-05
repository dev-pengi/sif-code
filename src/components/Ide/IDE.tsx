import { FC, useState } from "react";
import ResizeBar from "./ResizeBar";
import LivePreview from "./LivePreview";
import Editor from "./Editor";
import { useCodeContext } from "@/contexts/CodeContext";
import { DragDropContext } from "react-beautiful-dnd";
import { useFilesContext } from "@/contexts/FilesContext";

const IDE: FC = () => {
  const {
    pageWidth,
    pageHeight,
    codeWidth,
    smallScreen,
    codeHeight,
    isHorizontal,
    reversedView,
  } = useCodeContext();
  const { files, setFiles } = useFilesContext();
  const [isDragging, setIsDragging] = useState(false);

  function MoveArrayItem(arr: any[], oldIndex: number, newIndex: number) {
    if (newIndex >= arr.length) {
      var k = newIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr; // for testing
  }

  const handleDragEnd = (props: any) => {
    setIsDragging(false);
    let sourceIndex = props?.source?.index;
    let destinationIndex = props?.destination?.index;

    if (sourceIndex === undefined || destinationIndex === undefined) return;

    if (destinationIndex === 0) destinationIndex = 1;

    setFiles((prev) => MoveArrayItem(prev, sourceIndex, destinationIndex));
  };
  const handleDragStart = () => {
    setIsDragging(true);
  };

  return (
    <main
      className={`vsm:px-[5px] vsm:pb-[5px] w-full h-[calc(100vh-60px)] mt-[60px] ml-0`}
    >
      <div
        id="main"
        className={`w-full h-full flex`}
        style={{
          flexDirection: isHorizontal
            ? `${reversedView ? "row-reverse" : "row"}`
            : `${reversedView ? "column-reverse" : "column"}`,
        }}
      >
        <DragDropContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Editor
            width={isHorizontal ? (codeWidth > 0 ? codeWidth : "50%") : "100%"}
            height={isHorizontal ? "100%" : codeHeight}
          />
        </DragDropContext>
        {!smallScreen && <ResizeBar />}
        <LivePreview
          width={isHorizontal ? pageWidth - +codeWidth : "100%"}
          height={isHorizontal ? "100%" : pageHeight - +codeHeight}
        />
      </div>
      {isDragging && <div className={`w-screen h-screen fixed top-0 left-0`} />}
    </main>
  );
};

export default IDE;
