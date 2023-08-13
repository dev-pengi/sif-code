"use client";
import { File } from "@/constants";
import { useFilesContext } from "@/contexts/FilesContext";
import { FC } from "react";
import * as asstes from "../../assets";
import Image from "next/image";
import { useCodeContext } from "@/contexts/CodeContext";
import CreateFile from "./CreateFile";
import DeleteFile from "./DeleteFile";
import FileTab from "./FileTab";

const FilesBar: FC = () => {
  const { files, activeFile, setActiveFile } = useFilesContext();
  const { theme } = useCodeContext();

  return (
    <div
      className={`w-full flex items-center filesbar-scroll h-12 pr-[10px]`}
      style={{
        height: "50px",
        background: theme == "dark" ? "#181818" : "#f8f8f8",
      }}
    >
      {files.map((file: File, index: number) => (
        <FileTab file={file} key={index} />
      ))}
      <CreateFile />
    </div>
  );
};

export default FilesBar;
