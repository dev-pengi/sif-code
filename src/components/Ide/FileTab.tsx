import { FC, useEffect, useState } from "react";
import * as assets from "@/assets";

import { useCodeContext } from "@/contexts/CodeContext";
import { useFilesContext } from "@/contexts/FilesContext";
import Image from "next/image";
import { File } from "@/constants";
import DeleteFile from "./DeleteFile";

interface FileTabProps {
  file: File;
}

const FileTab: FC<FileTabProps> = ({ file }) => {
  const { activeFile, setActiveFile } = useFilesContext();
  const { theme } = useCodeContext();
  const [isActive, setIsActive] = useState(file.name === activeFile);

  const isMainFile = file.name === "index.html";

  useEffect(() => {
    setIsActive(file.name === activeFile);
  }, [activeFile]);

  return (
    <button
      onClick={() => !isActive && setActiveFile(file.name)}
      style={{
        height: "100%",
        borderTop: isActive ? "#3495eb solid 2px" : "none",
        borderRight: isActive ? "" : "#555555aa solid 1px",
        background: isActive
          ? theme === "dark"
            ? "#1f1f1f"
            : "#ffffff"
          : theme === "dark"
          ? "#181818"
          : "#f8f8f8",
      }}
      className={`flex items-center px-2 py-3 min-w-max`}
    >
      <div className="flex items-center min-w-[120px]">
        <Image
          src={assets[`${file.type}Icon`]}
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
      {!isMainFile && <DeleteFile filename={file.name} />}
    </button>
  );
};

export default FileTab;
