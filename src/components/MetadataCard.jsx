import {
  Globe,
  Clock3,
  Youtube,
  Instagram,
  Facebook,
  Music2,
} from "lucide-react";

const platformIcons = {
  youtube: Youtube,
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Music2,
};

export default function MetadataCard({ metadata }) {
  if (!metadata) return null;

  const Icon = platformIcons[metadata.platform] || Globe;

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <img
        src={metadata.thumbnail}
        alt={metadata.title}
        className="mb-4 aspect-video w-full rounded-xl object-cover"
      />

      <div className="flex items-center gap-2 mb-3">
        <Icon size={18} />
        <span className="text-sm capitalize text-gray-600">
          {metadata.platform}
        </span>
      </div>

      <h2 className="line-clamp-2 text-lg font-semibold">
        {metadata.title}
      </h2>

      {metadata.duration && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <Clock3 size={16} />
          <span>{metadata.duration}</span>
        </div>
      )}
    </div>
  );
}