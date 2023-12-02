import { FC } from "react";
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
    let sourceIndex = props.source.index;
    let destinationIndex = props.destination.index;

    if (destinationIndex === 0) destinationIndex = 1;

    setFiles((prev) => MoveArrayItem(prev, sourceIndex, destinationIndex));
  };

  console.log(files);

  /*
  {
    "draggableId": "script.js",
    "type": "DEFAULT",
    "source": {
        "index": 1,
        "droppableId": "files-bar"
    },
    "reason": "DROP",
    "mode": "FLUID",
    "destination": {
        "droppableId": "files-bar",
        "index": 2
    },
    "combine": null
}
*/

  return (
    <main
      className={`vsm:px-[5px] vsm:pb-[5px] w-[calc(100vw-60px)] h-screen mt-0 ml-[60px] vsm:w-full vsm:h-[calc(100vh-60px)] vsm:mt-[60px] vsm:ml-0`}
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
        <DragDropContext onDragEnd={handleDragEnd}>
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
    </main>
  );
};

export default IDE;
