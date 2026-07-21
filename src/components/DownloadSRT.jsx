export default function DownloadSRT({ title, srt }) {
  const handleDownload = () => {
    if (!srt) return;

    const blob = new Blob([srt], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "subtitles"}.srt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#0d0d0d] rounded-2xl border border-zinc-800 p-6 my-5">
      <h3 className="text-white text-lg font-semibold">
        Subtitle (.srt) Ready
      </h3>

      <p className="text-zinc-400 text-sm mt-2">
        Your subtitle file has been generated successfully.
      </p>

      <button
        onClick={handleDownload}
        className="mt-5 w-full bg-red-500 hover:bg-white transition rounded-xl py-3 text-black uppercase font-bold"
      >
        Download SRT
      </button>
    </div>
  );
}