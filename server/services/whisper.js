import { spawn } from "child_process";

export function transcribeAudio(audioPath) {
  return new Promise((resolve, reject) => {
    const python = spawn("python3", ["services/whisper.py", audioPath]);

    let output = "";
    let error = "";

    python.stdout.on("data", (data) => {
      const text = data.toString();
      console.log(text); // Show Python output in Docker log
      output += text;
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