import { NextResponse } from "next/server";
import { File } from "@/constants";
import { GetFiles, UpdateFiles, deleteFile } from "../lib/filesCache";

export async function GET() {
  const files = GetFiles();
  return NextResponse.json(files);
}

export async function POST(req: Request) {
  const { files } = await req.json();
  if (!files)
    return NextResponse.json(
      { error: "please provide files to update" },
      { status: 400 }
    );
  const newFiles: File[] = files;
  const updatedFiles: File[] = UpdateFiles(newFiles);
  return NextResponse.json(updatedFiles);
}

export async function DELETE(req: Request) {
  const { filename } = await req.json();

  if (!filename)
    return NextResponse.json(
      { error: "please provide filename to delete" },
      { status: 400 }
    );

  const deleted = deleteFile(filename);
  if (!deleted)
    return NextResponse.json({ error: "file not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
