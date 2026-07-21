import { Upload } from "lucide-react";

export default function SourceInput({
  url,
  setUrl,
  file,
  setFile,
}) {
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
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube, Instagram, Facebook..."
          className="w-full rounded-xl border border-zinc-800 bg-[#0d0d0d] px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-red-500 transition"
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-zinc-800"></div>
        <span className="text-zinc-500 text-sm">OR</span>
        <div className="flex-1 h-px bg-zinc-800"></div>
      </div>

      {/* MP3 Upload */}
      <label className="block border-2 border-dashed border-zinc-700 hover:border-red-500 rounded-xl p-8 cursor-pointer transition">
        <input
          type="file"
          accept=".mp3,audio/mpeg"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <Upload className="w-7 h-7 text-red-500" />
          </div>

          <h3 className="text-white text-lg font-semibold">
            {file ? file.name : "Upload MP3 File"}
          </h3>

          <p className="text-zinc-400 text-sm mt-2">
            Click to browse your computer
          </p>

          <p className="text-zinc-500 text-xs mt-4">
            Supported format: MP3
          </p>
        </div>
      </label>
    </div>
  );
}