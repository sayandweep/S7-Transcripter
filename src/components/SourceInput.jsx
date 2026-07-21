import { Upload } from "lucide-react";

export default function SourceInput({
  url,
  setUrl,
  file,
  setFile,
}) {
  const hasUrl = url.trim().length > 0;
  const hasFile = file !== null;

  return (
    <div className="lg:w-180 space-y-6">
      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Video URL
        </label>

        <input
          type="text"
          value={url}
          disabled={hasFile}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={
            hasFile
              ? "Remove the uploaded file to enter a URL"
              : "Paste YouTube, Instagram, Facebook..."
          }
          className="w-full rounded-xl border border-zinc-800 bg-[#0d0d0d] px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-zinc-800"></div>
        <span className="text-zinc-500 text-sm">OR</span>
        <div className="flex-1 h-px bg-zinc-800"></div>
      </div>

      {/* MP3 Upload */}
      <label
        className={`block border-2 border-dashed rounded-xl p-8 transition ${
          hasUrl
            ? "border-zinc-800 opacity-50 cursor-not-allowed"
            : "border-zinc-700 hover:border-red-500 cursor-pointer"
        }`}
      >
        <input
          type="file"
          accept=".mp3,audio/mpeg"
          className="hidden"
          disabled={hasUrl}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <Upload className="w-7 h-7 text-red-500" />
          </div>

          <h3 className="text-white text-lg font-semibold">
            {file
              ? file.name
              : hasUrl
              ? "Clear the URL to upload a file"
              : "Upload MP3 File"}
          </h3>

          <p className="text-zinc-400 text-sm mt-2">
            {hasUrl
              ? "File upload is disabled while a URL is entered"
              : "Click to browse your computer"}
          </p>

          <p className="text-zinc-500 text-xs mt-4">
            Supported format: MP3
          </p>
        </div>
      </label>
    </div>
  );
}