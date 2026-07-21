import { Copy, Download } from "lucide-react";

export default function TranscriptView({ transcript = "", loading }) {
  const copyTranscript = async () => {
    if (!transcript) return;

    await navigator.clipboard.writeText(transcript);
    alert("Transcript copied!");
  };

  const downloadTxt = () => {
    if (!transcript) return;

    const blob = new Blob([transcript], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transcript.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex lg:w-180 h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Transcript</h2>

        <div className="flex gap-2">
          <button
            onClick={copyTranscript}
            disabled={!transcript}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
          >
            <Copy size={16} />
            Copy
          </button>

          <button
            onClick={downloadTxt}
            disabled={!transcript}
            className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-sm text-white hover:opacity-90 disabled:opacity-50"
          >
            <Download size={16} />
            TXT
          </button>
        </div>
      </div>

      <div className="min-h-112.5 overflow-y-auto rounded-xl bg-gray-50 p-4 text-sm leading-7">
        {loading ? (
          <p className="text-gray-500">Transcribing...</p>
        ) : transcript ? (
          <pre className="whitespace-pre-wrap font-sans">
            {transcript}
          </pre>
        ) : (
          <p className="text-gray-400">
            Paste a video URL to generate a transcript.
          </p>
        )}
      </div>
    </div>
  );
}