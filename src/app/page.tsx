"use client";
import { IDE, Nav, PreLoader } from "@/components";
import { useFilesContext } from "@/contexts/FilesContext";

export default function Home() {
  const { isLoaded, isImported } = useFilesContext();
  return (
    <>
      {!(isLoaded && isImported) && <PreLoader />}
      <div style={{ visibility: isLoaded ? "visible" : "hidden" }}>
        <Nav />
        <IDE />
      </div>
    </>
  );
}
