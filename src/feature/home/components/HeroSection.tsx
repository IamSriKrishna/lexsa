import { ArrowRight, ArrowUpRight, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";

export const HeroSection = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(Math.min(window.scrollY * 0.7, 180));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative isolate scroll-mt-4 overflow-hidden bg-[#f4f4f2] px-3 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(232,187,129,0.2),_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(70,99,84,0.08),_transparent_28%)]" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="relative h-[calc(100svh-64px)] min-h-[640px] md:min-h-[700px]">
          <div className="absolute inset-x-0 top-4 z-30 flex justify-center px-1 sm:top-5 sm:px-2">
            <div className="flex w-full max-w-[1220px] items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#262b30]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d5d0c5] bg-white/60 px-2.5 py-2 text-[9px] backdrop-blur-sm sm:px-3 sm:text-[10px]">
                <Sparkles size={12} className="text-[#c78c4b]" />
                New edit
              </span>
              <span className="hidden rounded-full border border-[#d5d0c5] bg-[#fbfaf6] px-3 py-2 sm:inline-flex">
                Free shipping over $75
              </span>
            </div>
          </div>

          <div className="absolute inset-x-0 top-[92px] z-10 px-1 text-center sm:top-[86px] sm:px-0">
            <h1
              className="m-0 text-center font-sans text-[clamp(3.2rem,15vw,5.8rem)] font-black leading-[0.8] tracking-[-0.08em] text-[#10141b] transition-transform duration-75 ease-out sm:whitespace-nowrap sm:text-[clamp(3.8rem,8vw,10.25rem)] sm:leading-[0.82]"
              style={{ transform: `translate3d(0, ${scrollOffset}px, 0)` }}
            >
              EVERYDAY
              <span className="block text-[#b98650]">ESSENTIALS</span>
            </h1>
          </div>

          <div className="absolute left-1/2 top-[142px] z-20 w-[min(78vw,370px)] -translate-x-1/2 sm:top-[70px] sm:w-[420px] md:top-[38px] md:w-[470px] lg:w-[520px] xl:w-[560px]">
            <div className="relative">
              <div className="absolute inset-x-10 top-12 h-24 rounded-full bg-[#d8c3a0]/25 blur-3xl" />
              <img
                src="/hero-girl.png"
                alt="Jewelry model"
                className="relative block h-auto w-full select-none object-contain drop-shadow-[0_34px_60px_rgba(15,22,31,0.12)]"
                draggable={false}
              />
            </div>
          </div>

          <div className="absolute bottom-[132px] left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 sm:left-3 sm:top-[210px] sm:bottom-auto sm:translate-x-0 lg:left-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#products"
                className="group inline-flex h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#f47721] px-5 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_rgba(244,119,33,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#11151b] sm:text-[11px]"
              >
                <span>Shop Now</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                />
              </a>

              <a
                href="#products"
                className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1e242b] transition-colors hover:text-[#b98650]"
              >
                Explore lookbook
                <ArrowRight size={12} strokeWidth={2} />
              </a>
            </div>
          </div>

          <div className="absolute right-0 top-[170px] z-30 hidden w-[215px] rounded-[22px] border border-[#e7e0d5] bg-white/85 p-4 shadow-[0_20px_55px_rgba(17,21,27,0.08)] backdrop-blur-sm lg:block">
            <div className="flex items-center justify-between border-b border-[#e7e0d5] pb-3">
              <h2 className="m-0 font-serif text-[19px] font-bold leading-none tracking-[-0.05em] text-[#11151b]">
                Wear The Moment
              </h2>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f9f3eb] text-[#c78c4b]">
                <Star size={12} fill="currentColor" />
              </span>
            </div>

            <div className="flex h-[120px] items-center justify-center py-4">
              <img
                src="/hero/earing.jpeg"
                alt="Signature earring"
                className="h-[88px] w-[88px] rounded-full object-cover"
              />
            </div>

            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="m-0 text-[10px] uppercase tracking-[0.2em] text-[#6b6e72]">Signature</p>
                <p className="mt-2 font-serif text-[20px] font-bold leading-none tracking-[-0.04em] text-[#11151b]">$16.00</p>
              </div>

              <a href="#products" className="group inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#11151b]">
                Buy Now
                <ArrowUpRight size={10} strokeWidth={1.8} className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
              </a>
            </div>
          </div>

          <div className="absolute bottom-[28px] left-1/2 z-30 w-[calc(100%-2rem)] -translate-x-1/2 text-center sm:bottom-[36px] sm:left-3 sm:w-[220px] sm:translate-x-0 sm:text-left lg:left-0">
            <div className="mb-[14px] flex items-center">
              <div className="flex justify-center -space-x-[5px] sm:justify-start">
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
              </div>
            </div>

            <h2 className="mx-auto m-0 max-w-[300px] font-serif text-[19px] font-semibold leading-[1] tracking-[-0.05em] text-[#11151b] sm:mx-0 sm:max-w-[180px] sm:text-[22px]">
              Elegant Accessories Made To Shine From Day To Night.
            </h2>

            <a href="#products" className="group mt-[14px] inline-flex items-center gap-2 border-b border-[#11151b] pb-[4px] font-serif text-[11px] font-semibold italic text-[#11151b] sm:mt-[18px]">
              Shop Collection
              <ArrowUpRight size={11} strokeWidth={1.8} className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
            </a>
          </div>

          <div className="absolute bottom-[42px] right-0 z-30 hidden rounded-full border border-[#d8d0c5] bg-white/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1d232a] shadow-[0_12px_32px_rgba(0,0,0,0.04)] backdrop-blur-sm md:flex md:items-center md:gap-2 lg:right-6">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#2a9d74]" />
            4.9/5 customer rating
          </div>
        </div>
      </div>
    </section>
  );
};

const Avatar = () => {
  return (
    <div className="h-[26px] w-[26px] rounded-full border-[1.5px] border-[#f4f4f2] bg-gradient-to-br from-[#a8765c] to-[#e5bca4]" />
  );
};