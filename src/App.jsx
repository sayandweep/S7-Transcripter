import { useState } from "react";
import UrlInput from "./components/UrlInput";

export default function App() {
  const [loading, setLoading] = useState(false);

  const handleUrl = async (url) => {
    setLoading(true);

    console.log(url);

    // Fetch metadata
    // Start transcription

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-8 text-center text-4xl font-bold">
        Multi Platform Reels Transcriber
      </h1>

      <UrlInput
        onSubmit={handleUrl}
        loading={loading}
      />
    </div>
  );
}