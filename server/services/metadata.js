import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function getMetadata(url) {
  try {
    const { stdout } = await execFileAsync("yt-dlp", [
      "--dump-single-json",
      "--no-warnings",
      url,
    ]);

    const data = JSON.parse(stdout);

    return {
      title: data.title,
      thumbnail: data.thumbnail,
      duration: formatDuration(data.duration),
      platform: data.extractor_key?.toLowerCase() || "unknown",
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch metadata");
  }
}

function formatDuration(seconds) {
  if (!seconds) return "";

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}