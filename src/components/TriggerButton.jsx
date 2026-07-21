import { Loader2 } from "lucide-react";

export default function TriggerButton({
  loading,
  disabled,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full mt-6 rounded-xl py-3 font-bold uppercase transition-all duration-200 ${
        disabled || loading
          ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          : "bg-red-500 hover:bg-white hover:text-black text-black"
      }`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing...
        </span>
      ) : (
        "Generate"
      )}
    </button>
  );
}