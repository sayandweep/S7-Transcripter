import { spawn } from "child_process";

export function transcribeAudio(audioPath) {
  return new Promise((resolve, reject) => {
    console.log("🚀 Starting Python process...");

    const python = spawn("python3", ["services/whisper.py", audioPath]);

    let output = "";
    let error = "";

    python.stdout.on("data", (data) => {
      const text = data.toString();

      console.log("PYTHON STDOUT:");
      console.log(text);

      output += text;
    });

    python.stderr.on("data", (data) => {
      const text = data.toString();

      console.error("PYTHON STDERR:");
      console.error(text);

      error += text;
    });

    python.on("error", (err) => {
      console.error("❌ PYTHON SPAWN ERROR:");
      console.error(err);

      reject(err);
    });

    python.on("close", (code) => {
      console.log("================================");
      console.log("🐍 PYTHON PROCESS CLOSED");
      console.log("================================");
      console.log("Exit Code:", code);

      console.log("\n----- STDOUT -----");
      console.log(output);

      console.log("\n----- STDERR -----");
      console.log(error);

      if (code !== 0) {
        return reject(
          new Error(error || `Python exited with code ${code}`)
        );
      }

      try {
        const lines = output
          .trim()
          .split("\n")
          .filter((line) => line.trim() !== "");

        console.log("Parsed Lines:", lines.length);

        const jsonLine = lines[lines.length - 1];

        console.log("Last Line:");
        console.log(jsonLine);

        const parsed = JSON.parse(jsonLine);

        console.log("✅ JSON Parsed Successfully");

        resolve(parsed);
      } catch (err) {
        console.error("❌ JSON PARSE FAILED");
        console.error(err);
        console.error("\nComplete Output:");
        console.error(output);

        reject(err);
      }
    });
  });
}