import { ArrowDown, Play, Sparkles } from "lucide-react";
import { useState } from "react";

export const VideoSection = () => {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative h-screen overflow-clip bg-[#161814] text-[#f8f4ec]">
      <div className="flex h-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={(event) => {
              const video = event.currentTarget;
              video.currentTime = 0;
              video.play().catch(() => undefined);
            }}
            onError={() => setVideoError(true)}
          >
            <source src="/Video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,10,0.1),rgba(10,12,10,0.72))]" />
        <div className="absolute inset-x-5 top-6 flex items-start justify-between sm:inset-x-10 sm:top-10 lg:inset-x-16">
          <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/70">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/45 font-serif text-[13px] tracking-normal text-[#e0b57d]">
              04
            </span>
            Motion study
          </div>
          <span className="hidden text-[9px] font-semibold uppercase tracking-[0.24em] text-white/50 sm:block">
            LËXŠA / 2026
          </span>
        </div>

        {videoError && (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <p className="m-0 max-w-md border border-white/30 bg-black/30 px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm">
              Video could not be loaded. Please check jwellery.webm or video.mp4 in the public folder.
            </p>
          </div>
        )}
        <div className="absolute inset-x-5 bottom-8 flex items-end justify-between gap-6 sm:inset-x-10 sm:bottom-12 lg:inset-x-16">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/15 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm">
              <Sparkles size={11} />
              The LËXŠA film
            </div>
            <h2 className="m-0 max-w-2xl font-serif text-[2.6rem] leading-[0.92] tracking-[-0.06em] text-white sm:text-[4.8rem]">
              Made to move with you.
            </h2>
          </div>

          <div className="hidden items-center gap-3 text-right text-[9px] font-semibold uppercase tracking-[0.22em] text-white/75 sm:flex">
            <span>{videoError ? "Video unavailable" : "Scroll to play"}</span>
            {videoError ? <ArrowDown size={13} /> : <Play size={13} fill="currentColor" />}
          </div>
        </div>

      </div>
    </section>
  );
};
