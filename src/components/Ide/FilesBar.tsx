"use client";
import { File } from "@/constants";
import { useFilesContext } from "@/contexts/FilesContext";
import { FC, useEffect, useRef } from "react";
import { useCodeContext } from "@/contexts/CodeContext";
import CreateFile from "./CreateFile";
import FileTab from "./FileTab";
import { Draggable, Droppable } from "react-beautiful-dnd";

const FilesBar: FC = () => {
  const { files } = useFilesContext();
  const { theme } = useCodeContext();
  return (
    <Droppable droppableId="files-bar" direction="horizontal">
      {(provided, snapshot) => (
        <div
          className={`w-full flex items-center filesbar-scroll h-12 pr-[10px]`}
          style={{
            height: "50px",
            background: theme == "dark" ? "#181818" : "#f8f8f8",
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {files.map((file: File, index: number) => (
            <FileTab
              file={file}
              index={index}
              key={file.name}
            />
          ))}

          <CreateFile />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default FilesBar;
