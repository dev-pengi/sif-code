import { NextResponse } from "next/server";
import { getFile } from "../lib/filesCache";

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename;
  const file = getFile(filename);

  const contentType = getContentTypeFromFileType(file.type);

  const headers = new Headers({ "Content-Type": contentType });
  return new Response(file.content, { headers });
}

function getContentTypeFromFileType(fileType: string): string {
  if (fileType === "html") {
    return "text/html";
  } else if (fileType === "css") {
    return "text/css";
  } else if (fileType === "javascript") {
    return "application/javascript";
  }

  return "text/plain";
}
