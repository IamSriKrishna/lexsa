import { ArrowDown, Play, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const videoSpeed = 3;

export const VideoSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetProgressRef = useRef(0);
  const displayedProgressRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const animate = () => {
      const currentProgress = displayedProgressRef.current;
      const targetProgress = targetProgressRef.current;
      const nextProgress = currentProgress + (targetProgress - currentProgress) * 0.08;
      displayedProgressRef.current = nextProgress;
      const zoomProgress = Math.sin(nextProgress * Math.PI);

      const video = videoRef.current;
      if (video && video.readyState >= 1 && Number.isFinite(video.duration)) {
        video.currentTime = video.duration * clamp(nextProgress * videoSpeed, 0, 1);
        video.pause();
      }

      sectionRef.current?.style.setProperty("--video-progress", nextProgress.toString());
      sectionRef.current?.style.setProperty("--video-scale", (1 + zoomProgress * 0.18).toString());

      if (Math.abs(targetProgress - nextProgress) > 0.001) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
      }
    };

    const updateFromScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollDistance = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / scrollDistance, 0, 1);
      targetProgressRef.current = progress;

      const video = videoRef.current;
      if (video) {
        video.playbackRate = videoSpeed;
        if (progress > 0 && progress < 1) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      }

      if (animationFrameRef.current === null) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);

    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[240vh] overflow-clip bg-[#161814] text-[#f8f4ec] [--video-progress:0] [--video-scale:1]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-100 ease-out"
          style={{ transform: "scale(var(--video-scale))" }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            onLoadedData={(event) => {
              const video = event.currentTarget;
              video.currentTime = video.duration * clamp(targetProgressRef.current * videoSpeed, 0, 1);
              video.playbackRate = videoSpeed;
              if (targetProgressRef.current > 0 && targetProgressRef.current < 1) {
                video.play().catch(() => undefined);
              }
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

        <div className="absolute bottom-8 left-3 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex lg:left-8">
          <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-white/45 [writing-mode:vertical-rl]">
            Scroll the story
          </span>
          <div className="relative h-28 w-px overflow-hidden bg-white/20">
            <div className="absolute left-0 top-0 w-full origin-top bg-[#d5a66d] transition-transform duration-100" style={{ transform: "scaleY(var(--video-progress))" }} />
          </div>
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

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 text-[8px] font-semibold uppercase tracking-[0.24em] text-white/45 sm:bottom-6">
          <span>01</span>
          <span className="h-px w-12 bg-white/30"><span className="block h-px origin-left bg-[#d5a66d]" style={{ transform: "scaleX(var(--video-progress))" }} /></span>
          <span>03</span>
        </div>
      </div>
    </section>
  );
};
