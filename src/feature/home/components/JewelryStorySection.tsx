import { Gem, ShieldCheck, Sparkles, WandSparkles } from "lucide-react";

export const JewelryStorySection = () => {
  return (
    <section id="about" className="relative scroll-mt-4 overflow-hidden bg-[#f4eee5] px-5 py-16 text-[#11151b] sm:px-8 sm:py-24 lg:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#c48a4b]/25" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 left-[-5%] h-80 w-80 rounded-full border border-[#7d918a]/20" />

      <div className="relative mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end">
        <div>
          <div className="mb-5 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#a06f3e]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c48a4b]/60">
              <Gem size={15} strokeWidth={1.4} />
            </span>
            Made for the everyday ritual
          </div>
          <h2 className="m-0 max-w-xl font-serif text-[2.8rem] leading-[0.95] tracking-[-0.06em] sm:text-[4.5rem]">
            Jewelry with a little more meaning.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#6f685f]">
            Quiet pieces, considered proportions, and details that stay with you long after the first look.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-[#d9cbb9] pt-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#766e64]">
          <div className="border-l border-[#c48a4b]/60 pl-3">
            <WandSparkles size={15} className="mb-3 text-[#b7793f]" />
            Thoughtful forms
          </div>
          <div className="border-l border-[#c48a4b]/60 pl-3">
            <ShieldCheck size={15} className="mb-3 text-[#b7793f]" />
            Made to last
          </div>
          <div className="border-l border-[#c48a4b]/60 pl-3">
            <Sparkles size={15} className="mb-3 text-[#b7793f]" />
            Easy to layer
          </div>
        </div>
      </div>
    </section>
  );
};
