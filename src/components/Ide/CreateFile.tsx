"use client";
import { plusIcon } from "@/assets";
import { useCodeContext } from "@/contexts/CodeContext";
import Image from "next/image";
import { FC } from "react";

interface CreateFileProps {
  // Add your prop types here
}

const CreateFile: FC<CreateFileProps> = () => {
  const { theme } = useCodeContext();
  return (
    <>
      <button
        className={`ml-[10px] h-max p-1 rounded-sm bg-${theme}-active-tab`}
      >
        <Image
          src={plusIcon}
          alt="plus icon"
          width={18}
          className="min-w-[18px]"
        />
      </button>
    </>
  );
};

export default CreateFile;
