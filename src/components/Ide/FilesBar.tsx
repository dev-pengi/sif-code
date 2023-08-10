"use client";
import { File } from "@/constants";
import { useFilesContext } from "@/contexts/FilesContext";
import { FC } from "react";
import * as asstes from "../../assets";
import Image from "next/image";
import { useCodeContext } from "@/contexts/CodeContext";
import CreateFile from "./CreateFile";

const FilesBar: FC = () => {
  const { files, activeFile, setActiveFile } = useFilesContext();
  const { theme } = useCodeContext();

  console.log(files);

  return (
    <div
      className={`w-full flex items-center filesbar-scroll h-12 bg-${theme}-tab`}
      style={{ borderTop: "solid 2px #555555aa", height: "50px" }}
    >
      {files.map((file: File, index: number) => {
        const active = file.name === activeFile;
        return (
          <button
            onClick={() => !active && setActiveFile(file.name)}
            style={{
              height: "100%",
              borderTop: active ? "#3495eb solid 2px" : "none",
              borderRight: active ? "" : "#555555aa solid 2px",
              borderLeft: active ? "" : "#555555aa solid 2px",
              // backgroundColor: active ? "#1f1f1f" : "#181818",
            }}
            className={`flex items-center px-2 py-3 min-w-[150px] max-w-[230px] ${
              active ? `bg-${theme}-active-tab` : `bg-${theme}-tab`
            } `}
          >
            <Image
              src={asstes[`${file.type}Icon`]}
              alt={`${file.type} icon`}
              width={25}
            />
            <h3 style={{ color: "#cccccc", marginLeft: "10px" }}>
              {file.name}
            </h3>
          </button>
        );
      })}
      <CreateFile />
    </div>
  );
};

export default FilesBar;
