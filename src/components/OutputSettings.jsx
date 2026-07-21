export default function OutputSettings({
  outputFormat,
  setOutputFormat,
  maxWords,
  setMaxWords,
}) {
  const wordOptions = ["Auto", 1, 2, 3, 4, 5];

  return (
    <div className="lg:w-180 mt-5 border border-zinc-800 bg-[#0d0d0d] rounded-xl p-6">

      {/* Heading */}
      <h2 className="text-xl font-bold mb-6">
        2. Output settings
      </h2>

      {/* Output format */}
      <p className="text-sm mb-4">
        Choose output format
      </p>

      <div className="grid md:grid-cols-2 gap-4">

        {/* TXT */}
        <button
          type="button"
          onClick={() => setOutputFormat("txt")}
          className={`border rounded-lg p-5 text-left transition ${
            outputFormat === "txt"
              ? "border-red-500 bg-red-500/10"
              : "border-stone-800 hover:border-stone-700"
          }`}
        >
          <div className="flex items-center gap-3">

            <div
              className={`w-4 h-4 rounded-full border ${
                outputFormat === "txt"
                  ? "border-red-500 bg-red-500"
                  : "border-stone-500"
              }`}
            />

            <div>
              <h3 className="font-semibold">
                Plain Transcript (.txt)
              </h3>

              <p className="text-sm text-stone-400 mt-1">
                Get full transcript in text format
              </p>
            </div>

          </div>
        </button>

        {/* SRT */}
        <button
          type="button"
          onClick={() => setOutputFormat("srt")}
          className={`border rounded-lg p-5 text-left transition ${
            outputFormat === "srt"
              ? "border-red-500 bg-red-500/10"
              : "border-stone-800 hover:border-stone-700"
          }`}
        >
          <div className="flex items-center gap-3">

            <div
              className={`w-4 h-4 rounded-full border ${
                outputFormat === "srt"
                  ? "border-red-500 bg-red-500"
                  : "border-stone-500"
              }`}
            />

            <div>
              <h3 className="font-semibold">
                Subtitle (.srt)
              </h3>

              <p className="text-sm text-stone-400 mt-1">
                Generate subtitles in SRT format
              </p>
            </div>

          </div>
        </button>

      </div>

      {/* Word Split */}
      <div className="mt-8">

        <p className="text-sm mb-4">
          Maximum words per subtitle
        </p>

        <div className="flex flex-wrap gap-3">

          {wordOptions.map((option) => (
            <button
              key={option}
              type="button"
              disabled={outputFormat !== "srt"}
              onClick={() => setMaxWords(option)}
              className={`px-5 py-2 rounded-lg border text-sm transition
                ${
                  maxWords === option
                    ? "border-red-500 bg-red-500 text-white"
                    : "border-stone-800 text-stone-300"
                }
                ${
                  outputFormat !== "srt"
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:border-red-400"
                }`}
            >
              {option === "Auto"
                ? "Auto"
                : `${option} word${option > 1 ? "s" : ""}`}
            </button>
          ))}

        </div>

        <p className="text-xs text-stone-500 mt-3">
          This setting is only available for Subtitle (.srt).
        </p>

      </div>

    </div>
  );
}