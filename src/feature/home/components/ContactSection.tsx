import { ArrowUpRight, Mail, MessageCircle, Sparkles } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="relative scroll-mt-4 overflow-hidden bg-[#e9eee9] px-5 py-16 text-[#11151b] sm:px-8 sm:py-24 lg:px-12">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-[-8rem] h-80 w-80 rounded-full border border-[#7d918a]/35" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[-10rem] left-[-5rem] h-80 w-80 rounded-full border border-[#c48a4b]/25" />

      <div className="relative mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <div className="mb-5 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#55766d]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7d918a]/70">
              <Sparkles size={14} strokeWidth={1.5} />
            </span>
            Let us help you find your piece
          </div>
          <h2 className="m-0 max-w-2xl font-serif text-[3rem] leading-[0.9] tracking-[-0.07em] sm:text-[5.5rem]">
            Start a conversation.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-6 text-[#5f6d67]">
            Questions about a piece, a gift, or your next everyday stack? Our small team is happy to help.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <a href="mailto:hello@lexsa-jewelry.com" className="group flex items-center justify-between border-t border-[#b8c9c0] py-4 transition-colors hover:border-[#11151b]">
            <span className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em]">
              <Mail size={16} strokeWidth={1.5} className="text-[#b7793f]" />
              hello@lexsa-jewelry.com
            </span>
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
          <a href="https://wa.me/15550142624" className="group flex items-center justify-between border-t border-[#b8c9c0] py-4 transition-colors hover:border-[#11151b]">
            <span className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em]">
              <MessageCircle size={16} strokeWidth={1.5} className="text-[#55766d]" />
              WhatsApp us
            </span>
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
