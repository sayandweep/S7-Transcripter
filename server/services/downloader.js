import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const execFileAsync = promisify(execFile);

export async function downloadAudio(url) {
  const id = crypto.randomUUID();

  const outputTemplate = path.resolve("temp", `${id}.%(ext)s`);

  await execFileAsync("yt-dlp", [
    "-f",
    "bestaudio",
    "--no-playlist",
    "-o",
    outputTemplate,
    url,
  ]);

  const files = fs.readdirSync(path.resolve("temp"));

  const file = files.find((f) => f.startsWith(id));

  if (!file) {
    throw new Error("Downloaded audio not found");
  }

  return path.resolve("temp", file);
}

export function deleteAudio(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}