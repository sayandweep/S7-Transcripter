import { spawn } from "child_process";

export function transcribeAudio(audioPath) {
  return new Promise((resolve, reject) => {
    const python = spawn("python", ["services/whisper.py", audioPath]);

    let output = "";
    let error = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      error += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(error));
      }

      try {
        resolve(JSON.parse(output));
      } catch (err) {
        reject(err);
      }
    });
  });
}