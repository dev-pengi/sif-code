"use client";
import { File } from "@/constants";
import { useFilesContext } from "@/contexts/FilesContext";
import { FC } from "react";
import { useCodeContext } from "@/contexts/CodeContext";
import CreateFile from "./CreateFile";
import FileTab from "./FileTab";
import CreateFileMenu from "./CreateFileMenu";

const FilesBar: FC = () => {
  const { files } = useFilesContext();
  const { theme } = useCodeContext();
  // i wanna detect if the file is new made or not
  // if it is new made, then i want to pass the prop isNew
  // if it is not new made, then i dont want to pass the prop isNew
  return (
    <CreateFileMenu showOnclick={false} showOnDoubleClick>
      <div
        className={`w-full flex items-center filesbar-scroll h-12 pr-[10px]`}
        style={{
          height: "50px",
          background: theme == "dark" ? "#181818" : "#f8f8f8",
        }}
      >
        {files.map((file: File, index: number) => (
          <FileTab file={file} key={index} isNew={file.isNew} />
        ))}
        <CreateFile />
      </div>
    </CreateFileMenu>
  );
};

export default FilesBar;
