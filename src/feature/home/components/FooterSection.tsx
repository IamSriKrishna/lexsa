import { ArrowUpRight, Sparkles } from "lucide-react";

export const FooterSection = () => {
  return (
    <footer className="relative overflow-hidden bg-[#11151b] px-5 py-14 text-[#f7f2e9] sm:px-8 sm:py-20 lg:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#c48a4b]/30" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-[-5%] h-80 w-80 rounded-full border border-[#c48a4b]/15" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-12 border-b border-white/15 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#d5a66d]">
              <Sparkles size={11} />
              Stay in the edit
            </div>
            <h2 className="m-0 font-serif text-[3rem] leading-[0.9] tracking-[-0.07em] sm:text-[5.5rem]">
              Keep it close.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
              New silhouettes, quiet details, and pieces made for every day.
            </p>
          </div>

          <a href="#products" className="group inline-flex items-center gap-3 self-start text-[10px] font-semibold uppercase tracking-[0.2em] text-white lg:self-end">
            Explore the collection
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="flex flex-col gap-6 pt-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>LËXŠA Jewelry</span>
          <nav className="flex gap-5">
            <a href="#products" className="transition-colors hover:text-white">Shop</a>
            <a href="#about" className="transition-colors hover:text-white">About</a>
            <a href="#contact" className="transition-colors hover:text-white">Contact</a>
          </nav>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
};
