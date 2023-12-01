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
  exportIcon,
} from "@/assets";
import SizeIndicator from "./SizeIndicator";
import { downloadFilesAsZip, linkFiles } from "@/utils";
import { useFilesContext } from "@/contexts/FilesContext";
import { toast } from "react-hot-toast";
import InfoMenu from "./InfoMenu";
import DownloadMenu from "./ExportMenu";
import ProjectName from "./ProjectName";

const Nav: FC = () => {
  const { setTheme, setSwitchedView, setReversedView, smallScreen } =
    useCodeContext();

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const handleToggleView = () => {
    setSwitchedView((prev) => !prev);
  };
  const handleReverseView = () => {
    setReversedView((prev) => !prev);
  };

  return (
    <nav
      className={`z-10 bg-transparent fixed left-0 h-screen w-navD vsm:top-0 vsm:w-screen vsm:h-navD vsm:px-6`}
    >
      <div className={`flex items-center h-full w-full`}>
        <div className={`flex gap-4 vsm:flex-row flex-col flex-1 items-center`}>
          <InfoMenu showOnContextMenu showOnclick>
            <NavButton icon={infoIcon} tooltip="info" id={"info"} />
          </InfoMenu>
          <DownloadMenu showOnContextMenu showOnclick>
            <NavButton
              icon={exportIcon}
              tooltip="Download project"
              id={"download"}
            />
          </DownloadMenu>
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
        {!smallScreen && <ProjectName />}
        {!smallScreen && <SizeIndicator />}
      </div>
    </nav>
  );
};

export default Nav;
