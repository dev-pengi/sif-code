"use client";
import { useFilesContext } from "@/contexts/FilesContext";
import { FC, useEffect, useRef, useState } from "react";

const ProjectName: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nameArea = useRef<HTMLHeadingElement | null>(null);
  const { projectName, setProjectName } = useFilesContext();
  const [editedProjectName, setEditedProjectName] = useState(projectName);
  const [isEditing, setIsEditing] = useState(false);
  const [isError, setIsError] = useState(false);

  const validate = (name: string) => {
    return name?.trim()?.length && name.length >= 3 && name.length <= 30;
  };
  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleExit = () => {
    console.log("first");
    if (isError) {
      setEditedProjectName(projectName);
      console.log("not editing");
    }
    if (!isError && isEditing) {
      console.log(editedProjectName);
      setProjectName(editedProjectName);
    }
    setIsEditing(false);
  };

  const handleInputChange = (e: any) => {
    setEditedProjectName(inputRef.current?.value as string);
    console.log(inputRef.current?.value);
  };

  const selectInputText = () => {
    if (!inputRef.current) return;

    inputRef.current.focus();
    inputRef.current.setSelectionRange(0, 100000);
  };

  useEffect(() => {
    !isEditing && setIsError(false);
    if (isEditing) {
      selectInputText();
    }
  }, [isEditing]);
  useEffect(() => {
    !isEditing && setEditedProjectName(projectName);
  }, [isEditing, projectName]);

  useEffect(() => {
    if (!isEditing) return;
    const validateName = validate(editedProjectName);
    setIsError(!validateName);
  }, [editedProjectName, isEditing]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (nameArea.current && !nameArea.current.contains(e.target)) {
        isEditing && handleExit();
      }
    };
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        isEditing && handleExit();
      } else if (event.key === "Enter") {
        isEditing && handleExit();
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [editedProjectName, isEditing, isError]);

  const receiveShortcutMessage = (event: MessageEvent) => {
    const action = event.data;
    if (action === "enter") {
      isEditing && handleExit();
    } else if (action === "click") {
      isEditing && handleExit();
    }
  };

  useEffect(() => {
    window.addEventListener("message", receiveShortcutMessage);
    return () => {
      window.removeEventListener("message", receiveShortcutMessage);
    };
  }, [editedProjectName, isError, isEditing]);

  return (
    <h3
      onClick={handleEditing}
      className="text-white mx-4 text-center font-medium truncate cursor-pointer max-w-[300px]"
      ref={nameArea}
    >
      {isEditing ? (
        <>
          <input
            ref={inputRef}
            className="outline-none mx-4 w-full max-w-[350px] px-[2px] bg-transparent text-white"
            style={{
              color: "#cccccc",
              border: `1px ${isError ? "#EE0000" : "#555555aa"} solid`,
            }}
            autoFocus
            value={editedProjectName}
            onChange={handleInputChange}
          />
        </>
      ) : (
        <>{projectName}</>
      )}
    </h3>
  );
};

export default ProjectName;
