import { useState } from "react";

export default function UrlInput({ onSubmit, loading }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.trim()) return;

    onSubmit(url.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto flex gap-3"
    >
      <input
        type="url"
        placeholder="Paste YouTube, Instagram, TikTok or Facebook Reel URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-black"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Loading..." : "Transcribe"}
      </button>
    </form>
  );
}