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
      className={`z-10 bg-transparent fixed left-0 h-screen w-navD vsm:top-0 vsm:w-screen vsm:h-navD vsm:px-6`}
    >
      <div className={`flex items-center h-full w-full`}>
        <div className={`flex gap-4 vsm:flex-row flex-col flex-1 items-center`}>
          <NavMenu showOnContextMenu showOnclick>
            <NavButton Icon={MenuIcon} tooltip="info" id={"info"} />
          </NavMenu>
          <DownloadMenu showOnContextMenu showOnclick>
            <NavButton
              Icon={ExportIcon}
              tooltip="Download project"
              id={"download"}
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
        {!smallScreen && (
          <>
            <ProjectName />
            <SizeIndicator />
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
