import { FC, useState } from "react";
import * as assets from "@/assets";

import {
  Menu,
  Item,
  Separator,
  useContextMenu,
  Submenu,
} from "react-contexify";
import Image from "next/image";
import ShortcutGuid from "./ShortcutsGuide";
import { initialFiles, moreProjects } from "@/constants";
import { useCodeContext } from "@/contexts/CodeContext";
import { useFilesContext } from "@/contexts/FilesContext";
const MENU_ID = "info-menu";

interface NavMenuProps {
  showOnclick?: boolean;
  showOnDoubleClick?: boolean;
  showOnContextMenu?: boolean;
  children: React.ReactNode;
}

const NavMenu: FC<NavMenuProps> = ({
  showOnclick = true,
  showOnDoubleClick,
  showOnContextMenu,
  children,
}) => {
  const { smallScreen, setTheme, setPreviewKey, theme } = useCodeContext();
  const { setProjectName, setFiles } = useFilesContext();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const openShortcuts = (): void => {
    setShortcutsOpen(true);
  };

  function closeShortcuts() {
    setShortcutsOpen(false);
  }

  const { show } = useContextMenu({
    id: MENU_ID,
  });
  function displayMenu(e: any): any {
    show({
      event: e,
    });
  }
  const handleDarkTheme = () => {
    setTheme("dark");
  };
  const handleLightTheme = () => {
    setTheme("light");
  };

  const handleReset = () => {
    setFiles(initialFiles);
    setProjectName("My New Project");
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/");
    }
  };

  const handleRecompile = () => {
    setPreviewKey((prev) => prev + 1);
  };
  return (
    <>
      <div
        onClick={showOnclick ? displayMenu : () => {}}
        onDoubleClick={showOnDoubleClick ? displayMenu : () => {}}
        onContextMenu={showOnContextMenu ? displayMenu : () => {}}
      >
        {children}
      </div>
      <Menu id={MENU_ID} theme="dark" animation={false}>
        <Item onClick={handleRecompile}>
          <div className="w-[22px]">
            <assets.PlayIcon />
          </div>
          <span className="ml-[10px]">Recompile Project</span>
        </Item>
        <Separator />
        {smallScreen ? (
          <>
            <Item onClick={handleDarkTheme}>
              <div className="w-[22px]">
                {theme === "dark" && <assets.CheckIcon />}
              </div>
              <span className="ml-[10px]">Dark Theme</span>
            </Item>
            <Item onClick={handleLightTheme}>
              <div className="w-[22px]">
                {theme === "light" && <assets.CheckIcon />}
              </div>
              <span className="ml-[10px]">Light Theme</span>
            </Item>
          </>
        ) : (
          <Submenu
            label={
              <>
                <div className="w-[22px]">
                  <assets.ThemeIcon />
                </div>
                <span className="ml-[10px]">Theme</span>
              </>
            }
          >
            <Item onClick={handleDarkTheme} closeOnClick={false}>
              <div className="w-[22px]">
                {theme === "dark" && <assets.CheckIcon />}
              </div>
              <span className="ml-[10px]">Dark Theme</span>
            </Item>
            <Item onClick={handleLightTheme} closeOnClick={false}>
              <div className="w-[22px]">
                {theme === "light" && <assets.CheckIcon />}
              </div>
              <span className="ml-[10px]">Light Theme</span>
            </Item>
          </Submenu>
        )}
        <Separator />
        <Item onClick={openShortcuts}>
          <div className="w-[25px]">
            <assets.ShortcutIcon />
          </div>
          <span className="ml-[10px]">keyboard shortcuts</span>
        </Item>

        <Item>
          <a target="_blank" className="flex" href="https://github.com/dev-pengi/sif-code-desktop/releases/download/app/sif-code.0.1.0.msi">
            <div className="w-[25px]">
              <assets.DownloadIcon />
            </div>
            <span className="ml-[10px]">Desktop App</span>
          </a>
        </Item>

        <Separator />

        <Item>
          <a
            href="https://github.com/dev-pengi/sif-code"
            target="_blank"
            className="w-full h-full flex items-center"
          >
            <div className="w-[25px]">
              <assets.GithubIcon />
            </div>
            <span className="ml-[10px]">github project</span>
          </a>
        </Item>

        {smallScreen ? (
          <>
            <Separator />
            {moreProjects.map((project, index: number) => (
              <Item key={index}>
                <a
                  href={`https://${project.link}`}
                  target="_blank"
                  className="w-full h-full flex items-center"
                >
                  <div className="w-[25px]">
                    <assets.ExternalIcon />
                  </div>
                  <span className="ml-[10px]">{project.name}</span>
                </a>
              </Item>
            ))}
          </>
        ) : (
          <Submenu
            label={
              <>
                <Image
                  src={assets.devIcon}
                  alt={`creator portfolio`}
                  width={25}
                  className="min-w-[25px]"
                />
                <span className="ml-[10px]">more projects</span>
              </>
            }
          >
            {moreProjects.map((project, index: number) => (
              <Item key={index}>
                <a
                  href={`https://${project.link}`}
                  target="_blank"
                  className="w-full h-full flex items-center"
                >
                  <div className="w-[25px]">
                    <assets.ExternalIcon />
                  </div>
                  <span className="ml-[10px]">{project.name}</span>
                </a>
              </Item>
            ))}
          </Submenu>
        )}

        <Separator />

        <Item onClick={handleReset} className="danger">
          <div className="w-[25px]">
            <assets.DeleteIcon />
          </div>
          <span className="ml-[10px]">Reset Project</span>
        </Item>
      </Menu>
      <ShortcutGuid
        closeModal={closeShortcuts}
        openModal={openShortcuts}
        modalIsOpen={shortcutsOpen}
      />
    </>
  );
};

export default NavMenu;
