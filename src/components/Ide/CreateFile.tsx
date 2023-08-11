"use client";
import * as assets from "../../assets";
import { useCodeContext } from "@/contexts/CodeContext";
import { useFilesContext } from "@/contexts/FilesContext";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { FC, useEffect, useState } from "react";
import Modal from "react-modal";
import { divide } from "lodash";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "90%",
    maxWidth: "650px",
    minHeight: "200px",
    height: "max-content",
    maxHeight: "700px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "15px 15px",
    background: "#343436",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1000,
  },
};
Modal.setAppElement("#root");
type FileCreateType = "css" | "javascript";

type FileCreate = {
  type: FileCreateType;
  heading: string;
  description: string;
};

const filesCreate: FileCreate[] = [
  {
    type: "css",
    heading: "Create a styling file",
    description: "Create a css file. use this file to style your website.",
  },
  {
    type: "javascript",
    heading: "Create a javascript file",
    description:
      "Create a javascript file. use this file to add functionalities.",
  },
];

const SelectFileType: FC<{ setFileCreationType: any }> = ({
  setFileCreationType,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 mt-4">
      <p className="text-white text-lg w-full">Please choose a file type:</p>
      {filesCreate.map((file, index) => {
        return (
          <div
            onClick={() => setFileCreationType(file.type)}
            key={index}
            className="w-full flex items-center bg-dark-active-tab rounded-md py-4 px-3 cursor-pointer hover:opacity-75 duration-300"
          >
            <Image
              src={assets[`${file.type}Icon`]}
              alt={`${file.type} icon`}
              width={60}
              className="min-w-[60px]"
            />
            <div className="ml-3">
              <h2 className="text-gray-100 text-xl font-semibold">
                {file.heading}
              </h2>
              <p className="text-gray-300 text-sm">{file.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CreateFile: FC = () => {
  const { theme } = useCodeContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [fileCreationType, setFileCreationType] =
    useState<FileCreateType | null>(null);

  const [fileCreationName, setFileCreationName] = useState<string | null>(null);
  const { files, setFiles } = useFilesContext();

  const checkFileName = (name: string): boolean => {
    const file = files.find((file) => file.name === name);
    return file ? false : true;
  };
  const getFullName = (name: string, type: string): string => {
    const fullType = type === "css" ? "css" : "js";
    if (name.endsWith(`.${fullType}`)) return name;
    else return `${name}.${fullType}`;
  };

  const handleCreateFile = () => {
    if (!fileCreationType) return toast.error("Please select a file type");
    if (!fileCreationName) return toast.error("Please enter a file name");
    if (!checkFileName(fileCreationName))
      return toast.error("this file already exists");
    setFiles((prev) => [
      ...prev,
      {
        name: getFullName(fileCreationName, fileCreationType),
        type: fileCreationType,
        content: "",
      },
    ]);
    setFileCreationName(null);
    setFileCreationType(null);
    closeModal();
    toast.success("File created successfully");
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key === "f") {
        openModal();
      }
    };
    if (typeof window === "undefined") return;
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <button
        onClick={openModal}
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          className="flex justify-between items-center w-full px-1 mt-[1px] pb-3 border-b border-gray-300"
          style={{ borderBottomStyle: "solid" }}
        >
          <p className="text-[23px] text-gray-100 font-semibold text-center">
            Create file
          </p>
          <button onClick={closeModal}>
            <Image
              src={assets.closeIcon}
              alt="close icon"
              width={28}
              className="min-w-[18px] hover:opacity-70 duration-200"
            />
          </button>
        </div>
        {fileCreationType ? (
          <div>
            <div className="mt-[10px]">
              <label
                htmlFor="file-name"
                className="text-gray-100 opacity-75 text-lg font-normal uppercase"
              >
                File name
              </label>
              <input
                type="text"
                id="file-name"
                className="block mt-1 py-3 outline-none px-4 bg-transparent border-solid border-[555555aa] border w-full focus:border-primary text-white rounded-md"
                onChange={(e) => setFileCreationName(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <SelectFileType setFileCreationType={setFileCreationType} />
        )}
        {fileCreationType && (
          <div className="mt-[25px]">
            <button
              onClick={handleCreateFile}
              className="py-3 px-6 bg-primary text-white rounded-md"
            >
              Create file
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CreateFile;
