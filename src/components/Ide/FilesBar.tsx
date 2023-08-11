"use client";
import { File } from "@/constants";
import { useFilesContext } from "@/contexts/FilesContext";
import { FC } from "react";
import * as asstes from "../../assets";
import Image from "next/image";
import { useCodeContext } from "@/contexts/CodeContext";
import CreateFile from "./CreateFile";
import DeleteFile from "./DeleteFile";

const FilesBar: FC = () => {
  const { files, activeFile, setActiveFile } = useFilesContext();
  const { theme } = useCodeContext();

  return (
    
    <div
      className={`w-full flex items-center filesbar-scroll h-12`}
      style={{
        height: "50px",
        background: theme == "dark" ? "#181818" : "#f8f8f8",
      }}
    >
      {files.map((file: File, index: number) => {
        const active = file.name === activeFile;
        return (
          <button
            onClick={() => !active && setActiveFile(file.name)}
            style={{
              height: "100%",
              borderTop: active ? "#3495eb solid 2px" : "none",
              borderRight: active ? "" : "#555555aa solid 1px",
              background: active
                ? theme === "dark"
                  ? "#1f1f1f"
                  : "#ffffff"
                : theme === "dark"
                ? "#181818"
                : "#f8f8f8",
            }}
            className={`flex items-center px-2 py-3 min-w-[150px] `}
          >
            <div className="flex items-center flex-1">
              <Image
                src={asstes[`${file.type}Icon`]}
                alt={`${file.type} icon`}
                width={25}
              />
              <h3
                style={{
                  color: theme === "dark" ? "#cccccc" : "#1f1f1f",
                  marginLeft: "10px",
                }}
              >
                {file.name}
              </h3>
            </div>
            {file.name !== "index.html" && <DeleteFile filename={file.name} />}
          </button>
        );
      })}
      <CreateFile />
    </div>
  );
};

export default FilesBar;
