import { ArrowUpRight, Code2 } from "lucide-react";

export const DeveloperSection = () => {
  return (
    <section id="developer" className="relative overflow-hidden bg-[#11151b] px-5 py-16 text-[#f7f2e9] sm:px-8 sm:py-24 lg:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(rgba(247,242,233,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(247,242,233,0.12) 1px, transparent 1px)", backgroundSize: "46px 46px" }} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#d5a66d]/30" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-white/15 pb-8 sm:flex-row sm:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#d5a66d]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5a66d]/60">
                <Code2 size={15} strokeWidth={1.5} />
              </span>
              Developer section
            </div>
            <h2 className="m-0 max-w-3xl font-serif text-[3.2rem] leading-[0.9] tracking-[-0.07em] sm:text-[5.8rem]">
              Crafted by <span className="text-[#d5a66d]">Sri Krishna.</span>
            </h2>
          </div>

          <span className="inline-flex items-center gap-2 self-start rounded-full border border-[#9ed0ae]/35 bg-[#9ed0ae]/10 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b7e2c2] sm:self-end">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9ed0ae] shadow-[0_0_12px_#9ed0ae]" />
            Available for select projects
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="max-w-xl text-sm leading-7 text-white/60 sm:text-base">
              Digital experiences with a sharp point of view, careful interaction, and a little more feeling in every detail.
            </p>
            <a href="https://www.instagram.com/_iamsrikrishna_" target="_blank" rel="noreferrer" className="group mt-8 inline-flex items-center gap-3 border-b border-[#d5a66d] pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f7f2e9]">
              @ _iamsrikrishna_
              <ArrowUpRight size={14} className="text-[#d5a66d] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid grid-cols-3 border-t border-white/15 pt-5">
            <div>
              <p className="m-0 font-serif text-3xl text-[#d5a66d]">01</p>
              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">Creative direction</p>
            </div>
            <div className="border-l border-white/15 pl-4">
              <p className="m-0 font-serif text-3xl text-[#d5a66d]">02</p>
              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">Frontend craft</p>
            </div>
            <div className="border-l border-white/15 pl-4">
              <p className="m-0 font-serif text-3xl text-[#d5a66d]">03</p>
              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">Brand details</p>
            </div>
          </div>
        </div>

        <a href="#home" className="group mt-12 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-white">
          Back to top
          <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};
