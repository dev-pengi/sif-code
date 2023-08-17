"use client";
import * as assets from "../../assets";
import Image from "next/image";
import { FC, useEffect } from "react";
import Modal from "react-modal";
import { ModalStyles } from "@/constants";

Modal.setAppElement("#root");

type ComponentProps = {
  openModal: () => void;
  closeModal: () => void;
  modalIsOpen: boolean;
  children?: React.ReactNode;
};

const ShortcutGuid: FC<ComponentProps> = ({
  children,
  openModal,
  closeModal,
  modalIsOpen,
}) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.ctrlKey && e.key.toLowerCase() === "slash") {
        openModal;
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [modalIsOpen]);

  return (
    <>
      {children}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={ModalStyles("900px")}
        contentLabel="Keyboard shortcuts"
      >
        <div
          className="flex justify-between items-center w-full px-1 mt-[1px] pb-3 border-b border-gray-300"
          style={{ borderBottomStyle: "solid" }}
        >
          <p className="text-[23px] text-gray-100 font-semibold text-center">
            Keyboard shortcuts
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
      </Modal>
    </>
  );
};

export default ShortcutGuid;
