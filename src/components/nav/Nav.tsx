"use client";
import { useCodeContext } from "@/contexts/CodeContext";
import { FC, useEffect } from "react";
import NavButton from "./NavButton";
import {
  devIcon,
  downloadIcon,
  rotateIcon,
  themesIcon,
  reverseIcon,
  infoIcon,
} from "@/assets";
import SizeIndicator from "./SizeIndicator";
import { downloadFilesAsZip, linkFiles } from "@/utils";
import { useFilesContext } from "@/contexts/FilesContext";
import { toast } from "react-hot-toast";
import InfoMenu from "./InfoMenu";

const Nav: FC = () => {
  const { setTheme, setSwitchedView, setReversedView, smallScreen } =
    useCodeContext();
  const { files } = useFilesContext();

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const handleToggleView = () => {
    setSwitchedView((prev) => !prev);
  };
  const handleReverseView = () => {
    setReversedView((prev) => !prev);
  };
  const handleDownload = () => {
    const linkedFiles = linkFiles(files);
    downloadFilesAsZip(linkedFiles, "project");
    toast.success("Project downloaded successfully");
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "s") {
        handleDownload();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <nav
      className={`z-10 bg-transparent fixed left-0 h-screen w-navD vsm:top-0 vsm:w-screen vsm:h-navD vsm:px-6`}
    >
      <div className={`flex items-center justify-center h-full w-full`}>
        <div className="flex-1 vmd:block hidden"></div>
        <div className={`flex gap-5 vsm:flex-row flex-col`}>
          <InfoMenu showOnContextMenu showOnclick>
            <NavButton icon={infoIcon} tooltip="info" id={"info"} />
          </InfoMenu>
          <NavButton
            icon={downloadIcon}
            tooltip="Download project"
            id={"download"}
            onClick={handleDownload}
          />
          <NavButton
            icon={themesIcon}
            tooltip="toggle theme"
            id={"theme"}
            onClick={handleThemeToggle}
          />
          {!smallScreen && (
            <NavButton
              icon={rotateIcon}
              tooltip="toggle view"
              id={"view"}
              onClick={handleToggleView}
            />
          )}
          <NavButton
            icon={reverseIcon}
            tooltip="reverse view"
            id={"reverse"}
            onClick={handleReverseView}
          />
        </div>
        {!smallScreen && <SizeIndicator />}
      </div>
    </nav>
  );
};

export default Nav;
