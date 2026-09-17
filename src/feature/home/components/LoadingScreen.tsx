import { useEffect, useState } from "react";

type LoadingScreenProps = {
  onComplete: () => void;
};

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setProgress((value) => Math.min(value + 2, 100));
    }, 22);
    const revealTimer = window.setTimeout(() => setIsLeaving(true), 1350);
    const completeTimer = window.setTimeout(onComplete, 2200);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      role="status"
      aria-label="Loading LËXŠA"
      className={`fixed inset-0 z-[100] isolate overflow-hidden bg-[#c48a4b] text-[#fffaf2] transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isLeaving ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,245,220,0.3),transparent_30%),linear-gradient(135deg,#b7793f,#d5a66d)]" />
      <div aria-hidden="true" className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(90deg, transparent 49.8%, rgba(255,255,255,0.5) 50%, transparent 50.2%), linear-gradient(transparent 49.8%, rgba(255,255,255,0.35) 50%, transparent 50.2%)", backgroundSize: "120px 120px" }} />
      <div aria-hidden="true" className="absolute -right-[18vw] top-[10%] h-[58vw] w-[58vw] rounded-full border border-white/20" />
      <div aria-hidden="true" className="absolute -bottom-[28vw] -left-[12vw] h-[52vw] w-[52vw] rounded-full border border-white/15" />

      <div className="relative flex h-full flex-col items-center justify-between px-6 py-8 text-center sm:px-10 sm:py-10">
        <div className="flex w-full items-center justify-between text-[9px] font-semibold uppercase tracking-[0.28em] text-white/70">
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white" />LËXŠA / 2026</span>
          <span className="hidden sm:block">Everyday essentials</span>
        </div>

        <div>
          <div className="relative mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-white/60 bg-white/10 text-[11px] font-semibold uppercase tracking-[0.18em] shadow-[0_20px_60px_rgba(92,55,28,0.18)] backdrop-blur-sm">
            <span className="absolute inset-2 rounded-full border border-white/30" />
            LËX
          </div>
          <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/75">The edit is taking shape</p>
          <h1 className="mt-4 font-serif text-[clamp(3.4rem,11vw,8rem)] leading-[0.78] tracking-[-0.09em] text-white">LËXŠA</h1>
          <div className="mx-auto mt-9 flex w-[min(72vw,320px)] items-center gap-4 text-left">
            <div className="h-px flex-1 overflow-hidden bg-white/30">
              <div className="h-full bg-white transition-[width] duration-100 ease-linear" style={{ width: `${progress}%` }} />
            </div>
            <span className="min-w-[34px] text-right text-[10px] font-semibold tabular-nums tracking-[0.1em] text-white/80">{String(progress).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="flex w-full items-end justify-between text-left text-[9px] font-semibold uppercase tracking-[0.25em] text-white/65">
          <span className="max-w-[180px] leading-[1.5]">Small details.<br />Everyday presence.</span>
          <span className="text-right">Preparing<br />your edit</span>
        </div>
      </div>
    </div>
  );
};
