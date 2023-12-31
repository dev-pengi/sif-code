"use client";
import * as assets from "../../assets";
import { useCodeContext } from "@/contexts/CodeContext";
import { useFilesContext } from "@/contexts/FilesContext";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { FC, useEffect, useState } from "react";
import { Modal } from "../modals/Modal";

type ComponentProps = {
  filename: string;
};

const DeleteFile: FC<ComponentProps> = ({ filename }) => {
  const { theme } = useCodeContext();
  const { setFiles, files, activeFile } = useFilesContext();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  const checkFile = () => {
    const file = files.find((file) => file.name === filename);
    return file ? true : false;
  };

  const deleteFile = () => {
    if (checkFile()) {
      const newFiles = files.filter((file) => file.name !== filename);
      setFiles(newFiles);
      toast.success(`file deleted successfully`);
      closeModal();
    } else {
      toast.error(`file not found`);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (modalIsOpen) {
          deleteFile();
        }
      } else if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "backspace") {
        if (!modalIsOpen) {
          filename === activeFile && openModal();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [modalIsOpen, activeFile]);

  const receiveShortcutMessage = (event: MessageEvent) => {
    const action = event.data;

    if (action === "enter") {
      if (modalIsOpen) {
        deleteFile();
      }
    }
    if (action === "deleteFile") {
      if (!modalIsOpen) {
        if (filename === activeFile) {
          openModal();
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("message", receiveShortcutMessage);
    return () => {
      window.removeEventListener("message", receiveShortcutMessage);
    };
  }, [modalIsOpen, activeFile]);

  return (
    <>
      <button
        onClick={openModal}
        className={`ml-[10px] h-max p-1 delete-button rounded-sm`}
      >
        <div className="w-[18px] text-white">
          <assets.CloseIcon />
        </div>
      </button>
      <Modal isConfirmation isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div
          className="flex justify-between items-center w-full px-2 py-5 border-b border-gray-300"
          style={{ borderBottomStyle: "solid" }}
        >
          <p className="text-[21px] text-gray-300 font-semibold text-center">
            Confirm delete
          </p>
          <button onClick={closeModal}>
            <div className="w-[22px] text-white">
              <assets.CloseIcon />
            </div>
          </button>
        </div>
        <p className="text-white mt-3">
          are you sure you want to delete <span>({filename})</span>?
        </p>
        <div className="flex justify-end mt-4 pb-3">
          <button
            onClick={closeModal}
            className="py-[10px] px-6 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={deleteFile}
            className="py-[10px] px-6 rounded-md bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </Modal>
      <style jsx>{`
        .delete-button {
            transition: .2s;
        }
        .delete-button:hover {
            background: ${theme === "dark" ? "#313232" : "#e9e9e9"}};
        }
        .delete-button:hover{
            transform: rotate(45deg);
        }
      `}</style>
    </>
  );
};

export default DeleteFile;
