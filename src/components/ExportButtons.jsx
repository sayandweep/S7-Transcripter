import { Copy, FileText, FileDown } from "lucide-react";

export default function ExportButtons({ transcript }) {
  const copyTranscript = async () => {
    if (!transcript) return;

    await navigator.clipboard.writeText(transcript);
  };

  const downloadFile = (extension, mimeType) => {
    if (!transcript) return;

    const blob = new Blob([transcript], {
      type: mimeType,
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript.${extension}`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={copyTranscript}
        disabled={!transcript}
        className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Copy size={16} />
        Copy
      </button>

      <button
        onClick={() => downloadFile("txt", "text/plain")}
        disabled={!transcript}
        className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FileText size={16} />
        TXT
      </button>

      <button
        onClick={() => downloadFile("md", "text/markdown")}
        disabled={!transcript}
        className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FileDown size={16} />
        Markdown
      </button>
    </div>
  );
}