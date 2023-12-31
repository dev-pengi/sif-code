"use client";
import { useCodeContext } from "@/contexts/CodeContext";
import { FC } from "react";
import NavButton from "./NavButton";
import {
  RotateIcon,
  ThemeIcon,
  ReverseIcon,
  InfoIcon,
  ExportIcon,
  MenuIcon,
} from "@/assets";
import SizeIndicator from "./SizeIndicator";
import DownloadMenu from "./ExportMenu";
import ProjectName from "./ProjectName";
import NavMenu from "./NavMenu";

const Nav: FC = () => {
  const { setTheme, setSwitchedView, setReversedView, smallScreen } =
    useCodeContext();
  const handleToggleView = () => {
    setSwitchedView((prev) => !prev);
  };
  const handleReverseView = () => {
    setReversedView((prev) => !prev);
  };

  return (
    <nav
      className={`z-10 bg-transparent fixed left-0 top-0 w-screen h-navD px-6`}
    >
      <div className={`flex items-center h-full w-full`}>
        <div className={`flex gap-4 flex-row flex-1 items-center justify-start`}>
          <NavMenu showOnContextMenu showOnclick>
            <NavButton Icon={MenuIcon} tooltip="info" id={"info"} />
          </NavMenu>
          <DownloadMenu showOnContextMenu showOnclick>
            <NavButton
              Icon={ExportIcon}
              tooltip="Export or Share"
              id={"export"}
            />
          </DownloadMenu>
          {!smallScreen && (
            <NavButton
              Icon={RotateIcon}
              tooltip="toggle view"
              id={"view"}
              onClick={handleToggleView}
            />
          )}
          <NavButton
            Icon={ReverseIcon}
            tooltip="reverse view"
            id={"reverse"}
            onClick={handleReverseView}
          />
        </div>
            <ProjectName />
        {!smallScreen && (
          <>
            <SizeIndicator />
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
