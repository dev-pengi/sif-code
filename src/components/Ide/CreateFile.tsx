"use client";
import * as assets from "../../assets";
import { useCodeContext } from "@/contexts/CodeContext";
import { useFilesContext } from "@/contexts/FilesContext";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { FC } from "react";
import CreateFileMenu from "./CreateFileMenu";

const CreateFile: FC = () => {
  const { theme } = useCodeContext();
  return (
    <>
      <CreateFileMenu showOnContextMenu showOnclick>
        <button
          className={`ml-[10px] h-max p-1 rounded-sm`}
          style={{
            background: theme === "dark" ? "#1f1f1f" : "#ffffff",
          }}
        >
          <Image
            src={assets.plusIcon}
            alt="plus icon"
            width={18}
            className="min-w-[18px]"
          />
        </button>
      </CreateFileMenu>
    </>
  );
};

export default CreateFile;
