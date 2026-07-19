import { useState } from "react";
import UrlInput from "./components/UrlInput";

export default function App() {
  const API_URL = import.meta.env.VITE_API_URL || "";

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");
  const [copied, setCopied] = useState(false);

  const [steps, setSteps] = useState([
    { text: "Connecting to server", status: "pending" },
    { text: "Downloading video", status: "pending" },
    { text: "Extracting audio", status: "pending" },
    { text: "Loading AI model", status: "pending" },
    { text: "Transcribing", status: "pending" },
  ]);

  const updateStep = (index, status) => {
    setSteps((prev) =>
      prev.map((step, i) =>
        i === index ? { ...step, status } : step
      )
    );
  };

  const progress =
    steps.filter((s) => s.status === "done").length * 20 +
    (steps.some((s) => s.status === "loading") ? 10 : 0);

  const handleUrl = async (url) => {
    setLoading(true);
    setTranscript("");
    setTitle("");

    setSteps([
      { text: "Connecting to server", status: "loading" },
      { text: "Downloading video", status: "pending" },
      { text: "Extracting audio", status: "pending" },
      { text: "Loading AI model", status: "pending" },
      { text: "Transcribing", status: "pending" },
    ]);

    const timers = [];

    const run = (delay, fn) => {
      timers.push(setTimeout(fn, delay));
    };

    run(700, () => {
      updateStep(0, "done");
      updateStep(1, "loading");
    });

    run(1700, () => {
      updateStep(1, "done");
      updateStep(2, "loading");
    });

    run(2800, () => {
      updateStep(2, "done");
      updateStep(3, "loading");
    });

    run(4000, () => {
      updateStep(3, "done");
      updateStep(4, "loading");
    });

    try {
      const response = await fetch(`${API_URL}/api/v1/transcribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      updateStep(4, "done");

      setTitle(data.title || "");
      setTranscript(data.transcript || "");
    } catch (err) {
      console.error(err);
    } finally {
      timers.forEach(clearTimeout);
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!transcript) return;

    await navigator.clipboard.writeText(transcript);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="p-8 flex items-center justify-center">
      <div className="pattern"></div>

      <div className="home-page-machine">
        <h1 className="lg:text-5xl text-3xl font-black text-center">
          Transcribe Any
          <br />
          Video in Seconds
        </h1>

        <p className="lg:text-sm text-xs my-5 lg:my-7 lg:w-120 mx-auto text-center">
          Paste a YouTube, Instagram, or Facebook URL and get accurate
          transcription — completely free.
        </p>

        <UrlInput
          onSubmit={handleUrl}
          loading={loading}
        />

        <p className="px-10 text-[9px] my-5 lg:my-7 text-center uppercase font-semibold">
          <span className="opacity-50 pr-2">Supports:</span>
          <span>YouTube / Instagram / Facebook</span>
        </p>

        
        {loading && (<div className="lg:w-150 mt-5 border border-stone-900 bg-stone-950 p-5">

            <div className="flex justify-between mb-4">

              <div>
                <h3 className="font-bold">
                  Transcribing...
                </h3>

                <p className="text-xs text-stone-400">
                  Please don't close this page
                </p>
              </div>

              <div className="text-right">
                <div className="text-red-500 font-bold">
                  {progress}%
                </div>
              </div>

            </div>

            <div className="w-full h-2 rounded-full overflow-hidden bg-stone-800">
              <div
                className="h-full bg-red-400 transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mt-6 space-y-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-stone-300">
                    {step.text}
                  </span>

                  {step.status === "done" && (
                    <span className="border-green-950 border text-green-300 px-2 py-1 text-[10px] font-bold">
                    DONE
                    </span>
                  )}

                  {step.status === "loading" && (
                    <span className="border-red-950 border text-red-400 px-2 py-1 text-[10px] font-bold animate-pulse">
                    PROCESSING
                  </span>
                  )}

                  {step.status === "pending" && (
                    <span className="border-stone-800 border text-stone-500 px-2 py-1 text-[10px]">
                      WAIT
                    </span>
                    
                  )}
                </div>
              ))}
            </div>
          </div>)}
        

{transcript && ( 
          <div
            className="lg:w-150 relative mt-6"
            id="trans"
          >
            <button
              onClick={copyToClipboard}
              className="bg-red-500 px-4 w-full py-2 text-xs font-bold text-black uppercase hover:bg-white transition"
            >
              {copied ? "Copied" : "Copy"}
            </button>

            <div className="mt-2 border border-stone-900 bg-stone-950 p-4 whitespace-pre-wrap">
              {transcript}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}