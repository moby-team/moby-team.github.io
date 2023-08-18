import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import mime from "mime";
import { join } from "path";

/* TODO: check to see if the file being uploaded already exists - if it does,
we want to avoid adding it into the DB */

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const file = formData.get("file") as Blob | null;
    if (!file) {
        return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
        );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // this points to our folder and the directory to which we'd upload
    const relativeUploadDir = `/uploads/`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);


    try {
        await stat(uploadDir);
    } catch (e: any) {
        if (e.code === "ENOENT") {
            await mkdir(uploadDir, { recursive: true });
        } else {
            console.error(
                "Error while trying to create directory when uploading a file\n",
                e
            );
            return NextResponse.json(
                { error: "Something went wrong." },
                { status: 500 }
            );
        }
    }

    try {
        const filename = `${file.name.replace(
            /\.[^/.]+$/,
            ""
        )}.${mime.getExtension(file.type)}`;
        // this is writing to the file 
        await writeFile(`${uploadDir}/${filename}`, buffer);
        return NextResponse.json({ status: 200 });
    } catch (e) {
        console.error("Error while trying to upload a file\n", e);
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}