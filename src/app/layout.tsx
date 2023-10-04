import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-contexify/dist/ReactContexify.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import FilesProvider from "@/contexts/FilesContext";
import CodeProvider from "@/contexts/CodeContext";
import { Toaster } from "react-hot-toast";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sif code",
  description:
    "a web based IDE for writing and running code in the browser. made for children and beginners.",
  keywords: ["web-based code ", "code learning", "html ide", "web ide"],
  themeColor: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <FilesProvider>
        <CodeProvider>
          <div id="modal-container"></div>
          <body id="root" className={`${inter.className} bg-main`}>
            <Toaster />
            {children}
          </body>
        </CodeProvider>
      </FilesProvider>
    </html>
  );
}
