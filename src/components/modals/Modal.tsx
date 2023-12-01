import React, { FC, ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence, MotionStyle } from "framer-motion";
import ReactDOM from "react-dom";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
  isConfirmation?: boolean | undefined;
}

const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  onRequestClose,
  isConfirmation,
}) => {
  useEffect(() => {
    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onRequestClose();
      }
    };
    document.addEventListener("keydown", handleEscPress);

    return () => {
      document.removeEventListener("keydown", handleEscPress);
    };
  }, []);

  const modalType = isConfirmation ? "confirmation" : "default";

  const [rootElement, setRootElement] = useState<any>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.getElementById("root");
    setRootElement(root);
  }, []);

  if (!rootElement) {
    console.error("Root element with id 'root' not found.");
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
            }}
            transition={{
              duration: 0.1,
            }}
            style={ModalStyles[modalType].content}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={onRequestClose}
            style={ModalStyles[modalType].overlay}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.1,
            }}
          ></motion.div>
        )}
      </AnimatePresence>
    </>,
    rootElement // Render in the root element
  );
};

const ModalStyles = {
  confirmation: {
    content: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      margin: "auto",
      width: "95%",
      maxWidth: "500px",
      minHeight: "100px",
      height: "max-content",
      maxHeight: "700px",
      padding: "0 15px",
      borderRadius: "9px",
      background: "#212529",
      border: "none",
      zIndex: 1001,
    } as MotionStyle,
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.4)",
      zIndex: 1000,
    } as MotionStyle,
  },
  default: {
    content: {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      margin: "auto",
      position: "absolute",
      width: "95%",
      maxWidth: "900px",
      minHeight: "200px",
      height: "max-content",
      maxHeight: "700px",
      padding: "0",
      background: "#212529",
      borderRadius: "9px",
      border: "none",
      zIndex: 1001,
    } as MotionStyle,
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.4)",
      zIndex: 1000,
    } as MotionStyle,
  },
};

export { Modal };
