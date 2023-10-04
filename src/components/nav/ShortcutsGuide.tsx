"use client";
import * as assets from "../../assets";
import Image from "next/image";
import { FC, useEffect } from "react";
import { Modal } from "../modals/Modal";
import { keyboardShortcuts } from "@/constants";

type ComponentProps = {
  openModal: () => void;
  closeModal: () => void;
  modalIsOpen: boolean;
};

const ShortcutGuid: FC<ComponentProps> = ({
  openModal,
  closeModal,
  modalIsOpen,
}) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === "/") {
        modalIsOpen ? closeModal() : openModal();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [modalIsOpen]);

  const receiveShortcutMessage = (event: MessageEvent) => {
    const action = event.data;

    if (action === "showShortcuts") {
      modalIsOpen ? closeModal() : openModal();
    }
  };

  useEffect(() => {
    window.addEventListener("message", receiveShortcutMessage);
    return () => {
      window.removeEventListener("message", receiveShortcutMessage);
    };
  }, []);

  return (
    <>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div
          className="py-6 border-b border-gray-500"
          style={{ borderBottomStyle: "solid" }}
        >
          <div className="flex justify-between items-center w-full px-6">
            <p className="text-[21px] text-gray-300 font-semibold text-center">
              Keyboard shortcuts
            </p>
            <button onClick={closeModal}>
              <Image
                src={assets.closeIcon}
                alt="close icon"
                width={24}
                className="min-w-[24px] hover:opacity-70 duration-200"
              />
            </button>
          </div>
        </div>
        <div className="py-6 px-6 grid grid-flow-row vmd:grid-cols-2 grid-cols-1 gap-x-9 gap-y-4">
          {keyboardShortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <h3 className="text-[16px] font-medium text-gray-300 truncate">
                {shortcut.name}
              </h3>
              <div className="flex items-center gap-3 justify-end">
                {shortcut.keys.map((key, index2) => (
                  <p
                    key={index2}
                    className={`flex items-center justify-center capitalize border border-gray-500 border-solid w-max text-[14px] text-gray-300 rounded-[4px]`}
                    style={{
                      width: key.size == "normal" ? "32px" : "50px",
                      height: "32px",
                    }}
                  >
                    {key.name}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ShortcutGuid;
