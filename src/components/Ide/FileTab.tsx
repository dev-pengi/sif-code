import Image from "next/image";

import { FC, useEffect, useRef, useState } from "react";
import * as assets from "@/assets";

import { useCodeContext } from "@/contexts/CodeContext";
import { useFilesContext } from "@/contexts/FilesContext";
import { File } from "@/constants";

import DeleteFile from "./DeleteFile";
import { Draggable } from "react-beautiful-dnd";

interface FileTabProps {
  file: File;
  index: number;
}

const FileTab: FC<FileTabProps> = ({ file, index }) => {
  const isNew = file.isNew;
  const { activeFile, setActiveFile, files, setFiles } = useFilesContext();
  const { theme } = useCodeContext();
  const [isActive, setIsActive] = useState(file.name === activeFile);
  const [isRenaming, setIsRenaming] = useState(isNew);
  const [isError, setIsError] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const tabRef = useRef<HTMLDivElement | null>(null);

  const isMainFile = file.name === "index.html";

  const getFullName = (name: string): string => {
    let newName = name;
    if (!name?.endsWith(file.type)) {
      newName += `.${file.type}`;
    }
    return newName;
  };

  const validate = (name: string) => {
    const checkName = files.find((f) => f.name === name);
    const nameValid = checkName && name != file.name ? false : true;
    return /^[^\s]{2,}$/g.test(name) && nameValid;
  };

  const handleErrorCheck = (e: any) => {
    const newName = getFullName(e.target.value);
    if (!newName) return setIsError(false);
    const validateName = validate(newName);
    setIsError(!validateName);
  };
  const handleCancel = () => {
    setIsRenaming(false);
  };

  const handleRename = () => {
    let newName = inputRef.current?.value as string;
    newName = getFullName(newName);

    if (!newName || isError) {
      handleCancel();
      return;
    }

    const updatedFiles: File[] = files.map((f) => {
      if (f.name === file.name) {
        return { ...f, name: newName };
      }
      return f;
    });
    setFiles(updatedFiles);
    setActiveFile(newName);
    setIsRenaming(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (tabRef.current && !tabRef.current.contains(e.target)) {
        handleCancel();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const receiveShortcutMessage = (event: MessageEvent) => {
    const action = event.data;

    if (action === "renameFile") {
      !isMainFile && isActive && setIsRenaming((prev) => !prev);
    } else if (action === "escape") {
      isRenaming && handleCancel();
    } else if (action === "enter") {
      isRenaming && handleRename();
    } else if (action === "click") {
      handleCancel();
    }
  };

  useEffect(() => {
    window.addEventListener("message", receiveShortcutMessage);
    return () => {
      window.removeEventListener("message", receiveShortcutMessage);
    };
  }, []);

  useEffect(() => {
    setIsActive(file.name === activeFile);
  }, [activeFile]);

  const scrollActiveFile = (): void => {
    if (tabRef.current && isActive) {
      tabRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  useEffect(() => {
    isActive && scrollActiveFile();
    isRenaming && scrollActiveFile();
  }, [isActive, isRenaming]);

  useEffect(() => {
    if (isNew) {
      const updatedFiles = files.map((f) => {
        if (f.name === file.name) {
          return { ...f, isNew: false };
        }
        return f;
      });
      setFiles(updatedFiles);
    }
  });

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        isRenaming && handleCancel();
      } else if (event.key === "Enter") {
        isRenaming && handleRename();
      } else if (event.key === "F2") {
        !isMainFile && isActive && setIsRenaming((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isRenaming, isActive]);

  const selectInputText = () => {
    if (inputRef.current) {
      inputRef.current.focus();

      const inputValue = inputRef.current.value;

      const lastDotIndex = inputValue.lastIndexOf(".");

      if (lastDotIndex > 0) {
        inputRef.current.setSelectionRange(0, lastDotIndex);
      }
    }
  };

  useEffect(() => {
    !isRenaming && setIsError(false);
    isRenaming && selectInputText();
  }, [isRenaming]);

  return (
    <Draggable
      index={index}
      draggableId={file.name}
      isDragDisabled={isMainFile || isRenaming}
      disableInteractiveElementBlocking
    >
      {(provided, snapshot) => (
        <div
          className="h-full"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            ref={tabRef}
            onClick={() => !isActive && setActiveFile(file.name)}
            style={{
              cursor: "pointer",
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
            className={`flex items-center px-2 min-w-max`}
          >
            <div className="flex items-center min-w-[120px]">
              <Image
                src={assets[`${file.type}Icon`]}
                alt={`${file.type} icon`}
                width={25}
              />
              {isRenaming ? (
                <input
                  ref={inputRef}
                  autoFocus
                  onChange={handleErrorCheck}
                  style={{
                    width: "150px",
                    padding: "0 2px",
                    color: theme === "dark" ? "#cccccc" : "#1f1f1f",
                    marginLeft: "10px",
                    background: "transparent",
                    border: `1px ${isError ? "#EE0000" : "#555555aa"} solid`,
                    outline: "none",
                  }}
                  defaultValue={file.name}
                />
              ) : (
                <h3
                  onDoubleClick={() => !isMainFile && setIsRenaming(true)}
                  style={{
                    color: theme === "dark" ? "#cccccc" : "#1f1f1f",
                    marginLeft: "10px",
                  }}
                >
                  {file.name}
                </h3>
              )}
            </div>
            {isRenaming ? (
              <div className="flex items-center">
                <button
                  role="button"
                  onClick={handleRename}
                  className={`ml-[10px] h-max p-1 tab-button rounded-sm`}
                >
                  <Image
                    src={assets.checkIcon}
                    alt="tab-icon"
                    width={18}
                    className="min-w-[18px] tab-icon duration-200"
                  />
                </button>
                <button
                  onClick={handleCancel}
                  className={`ml-[5px] h-max p-1 tab-button rounded-sm`}
                >
                  <Image
                    src={assets.closeIcon}
                    alt="tab-icon"
                    width={18}
                    className="min-w-[18px] tab-icon duration-200"
                  />
                </button>
                <style jsx>{`
        .tab-button {
            transition: .2s;
        }
        .tab-button:hover {
            background: ${theme === "dark" ? "#313232" : "#e9e9e9"}};
        }
      `}</style>
              </div>
            ) : (
              <>{!isMainFile && <DeleteFile filename={file.name} />}</>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default FileTab;
