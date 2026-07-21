function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
  const ms = String(Math.floor((seconds % 1) * 1000)).padStart(3, "0");

  return `${hrs}:${mins}:${secs},${ms}`;
}

export function generateSRT(text, maxWords = "Auto") {
  if (!text) return "";

  const words = text.trim().split(/\s+/);

  // Auto mode
  if (maxWords === "Auto") {
    maxWords = 8;
  } else {
    maxWords = Number(maxWords);
  }

  const chunks = [];

  for (let i = 0; i < words.length; i += maxWords) {
    chunks.push(words.slice(i, i + maxWords).join(" "));
  }

  // Average reading speed ≈ 2.5 words/sec
  const wordsPerSecond = 2.5;

  let currentTime = 0;
  let srt = "";

  chunks.forEach((chunk, index) => {
    const wordCount = chunk.split(" ").length;
    const duration = Math.max(1, wordCount / wordsPerSecond);

    const start = currentTime;
    const end = currentTime + duration;

    srt += `${index + 1}\n`;
    srt += `${formatTime(start)} --> ${formatTime(end)}\n`;
    srt += `${chunk}\n\n`;

    currentTime = end;
  });

  return srt;
}