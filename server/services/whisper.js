import { spawn } from "child_process";

export function transcribeAudio(audioPath) {
  return new Promise((resolve, reject) => {
    const python = spawn("python3", ["services/whisper.py", audioPath]);

    let output = "";
    let error = "";

    python.stdout.on("data", (data) => {
      const text = data.toString();

      // Show Python output in Docker logs
      console.log(text);

      output += text;
    });

    python.stderr.on("data", (data) => {
      const text = data.toString();

      console.error(text);

      error += text;
    });

    python.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(error));
      }

      try {
        // Last non-empty line should be the JSON
        const lines = output
          .trim()
          .split("\n")
          .filter((line) => line.trim() !== "");

        const jsonLine = lines[lines.length - 1];

        resolve(JSON.parse(jsonLine));
      } catch (err) {
        console.error("Failed to parse Python output:");
        console.error(output);

        reject(err);
      }
    });
  });
}