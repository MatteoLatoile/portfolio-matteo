import MuxPlayer from "@mux/mux-player-react";

export default function ProjectModal({ isOpen, onClose, muxId, description }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center px-4">
      <div className="bg-[#1A0032] p-6 max-w-2xl w-full rounded-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl z-50 p-2 bg-black/50 rounded-full hover:bg-black/70 transition"
        >
          ✕
        </button>
        <div className="aspect-video mb-4 rounded overflow-hidden">
          <MuxPlayer
            playbackId={muxId}
            streamType="on-demand"
            autoPlay
            className="w-full h-full"
          />
        </div>
        <p className="text-white text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
