import { useState } from "react";
import { Link } from 'lucide-react';

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
      className="lg:w-150 mx-auto items-center flex gap-3 bg-stone-950 text-xs border border-stone-800 p-2 outline-none focus:none"
    >
      <span className="pl-2 text-red-500"><Link size={12} /></span>
      <input
        type="url"
        placeholder="Paste video link here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 text-xs outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className=" hover:bg-white hover:text-black bg-red-500 text-xs uppercase px-6 py-3 font-bold text-black disabled:opacity-50"
      >
        {loading ? "Loading..." : "Transcribe"}
      </button>
    </form>
  );
}