"use client";
import { File } from "@/constants";
import { useFilesContext } from "@/contexts/FilesContext";
import { FC, useEffect, useRef } from "react";
import { useCodeContext } from "@/contexts/CodeContext";
import CreateFile from "./CreateFile";
import FileTab from "./FileTab";
import CreateFileMenu from "./CreateFileMenu";

const FilesBar: FC = () => {
  const { files } = useFilesContext();
  const { theme } = useCodeContext();
  const activeFileRef = useRef<HTMLDivElement>(null);


  return (
    <div
      className={`w-full flex items-center filesbar-scroll h-12 pr-[10px]`}
      style={{
        height: "50px",
        background: theme == "dark" ? "#181818" : "#f8f8f8",
      }}
    >
      {files.map((file: File, index: number) => (
        <FileTab file={file} isNew={file.isNew} />
      ))}
      <CreateFile />
    </div>
  );
};

export default FilesBar;
