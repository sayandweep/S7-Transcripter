import { useState } from "react";
import UrlInput from "./components/UrlInput";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");

  const handleUrl = async (url) => {
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:5000/api/v1/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
  
      const data = await response.json();
  
      setTitle(data.title || "");
      setTranscript(data.transcript || "");


    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (!transcript) return;
  
    try {
      await navigator.clipboard.writeText(transcript);
  
      setCopied(true);
  
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 flex items-center justify-center">
      <div className="pattern"></div>
      <div className="home-page-machine">
        <h1 className=" lg:text-5xl text-3xl font-black text-center">
        Transcribe Any
        <br />Video in Seconds
        </h1>
        <p className="lg:text-sm text-xs my-5 lg:my-7 lg:w-120 mx-auto text-center">Paste a YouTube, Instagram, or Facebook URL and get accurate transcription — completely free.</p>
        
        <UrlInput
          onSubmit={handleUrl}
          loading={loading}
        />

        <p className="px-10 text-[9px] my-5 lg:my-7 text-center uppercase font-semibold"><sapan className='opacity-50 pr-2'>Supports:</sapan><span className="opacity-100">YouTube / Instagram / Facebook</span></p>

         {transcript &&(
          <div className="lg:w-150 relative">
            <button
              onClick={copyToClipboard}
              className=" bg-red-500 px-4 w-full py-2 text-xs font-bold text-black hover:bg-amber-50 hover:text-black uppercase transition hover:"
              >         {copied ? "Copied" : "Copy"}
              </button>
            <div className=" mt-2 border border-stone-900 bg-stone-950 p-4 lg:w-150 whitespace-pre-wrap">
                {transcript}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}