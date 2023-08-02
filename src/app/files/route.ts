import { NextResponse } from "next/server";
import { File } from "@/constants";
import { GetFiles, UpdateFiles } from "../filesCache";

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
