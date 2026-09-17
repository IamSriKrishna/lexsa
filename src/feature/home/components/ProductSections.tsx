import { ArrowDown, ArrowRight, Minus, Plus, ShoppingBag, Sparkles, Star, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type ProductLayer = {
  title: string;
  subtitle: string;
  type: "Ring" | "Chain" | "Earring";
  accent: string;
  items: { name: string; price: string; image: string }[];
};

type ProductItem = ProductLayer["items"][number];

type CartItem = ProductItem & {
  type: ProductLayer["type"];
  accent: string;
  quantity: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const formatInr = (price: string) => `₹${Number(price.replace("$", "")).toFixed(2)}`;

const productLayers: ProductLayer[] = [
  {
    title: "Rings",
    subtitle: "Signature silhouettes",
    type: "Ring",
    accent: "#d3a368",
    items: [
      { name: "Halo Ring", price: "$34.00", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85" },
      { name: "Aura Band", price: "$28.00", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85" },
      { name: "Ivory Signet", price: "$38.00", image: "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?auto=format&fit=crop&w=900&q=85" },
      { name: "Solstice Ring", price: "$42.00", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=85" },
      { name: "Celia Stack", price: "$32.00", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85" },
      { name: "Muse Band", price: "$36.00", image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=85" },
      { name: "Opal Crest", price: "$44.00", image: "https://images.unsplash.com/photo-1603561596112-db9e52d4c5a1?auto=format&fit=crop&w=900&q=85" },
      { name: "Dune Ring", price: "$30.00", image: "https://images.unsplash.com/photo-1627293509201-cd7f7c6b7f1f?auto=format&fit=crop&w=900&q=85" },
      { name: "Eclipse Signet", price: "$48.00", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85" },
      { name: "Lustre Loop", price: "$35.00", image: "https://images.unsplash.com/photo-1599459183200-59c7687a027a?auto=format&fit=crop&w=900&q=85" },
    ],
  },
  {
    title: "Chains",
    subtitle: "Layered essentials",
    type: "Chain",
    accent: "#b9b3ab",
    items: [
      { name: "Luna Chain", price: "$42.00", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85" },
      { name: "Velvet Link", price: "$36.00", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85&sat=-20" },
      { name: "Leona Chain", price: "$46.00", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85&sat=-15" },
      { name: "Noir Thread", price: "$39.00", image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=85&sat=-35" },
      { name: "Citrine Cable", price: "$44.00", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=85&sat=20" },
      { name: "Mara Pendant", price: "$41.00", image: "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?auto=format&fit=crop&w=900&q=85&sat=-10" },
      { name: "Satin Link", price: "$52.00", image: "https://images.unsplash.com/photo-1603561596112-db9e52d4c5a1?auto=format&fit=crop&w=900&q=85&sat=-25" },
      { name: "Aster Chain", price: "$37.00", image: "https://images.unsplash.com/photo-1627293509201-cd7f7c6b7f1f?auto=format&fit=crop&w=900&q=85&sat=10" },
      { name: "Orbit Collar", price: "$58.00", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85&sat=-15" },
      { name: "Fine Thread", price: "$33.00", image: "https://images.unsplash.com/photo-1599459183200-59c7687a027a?auto=format&fit=crop&w=900&q=85&sat=-5" },
    ],
  },
  {
    title: "Earrings",
    subtitle: "Light-catching details",
    type: "Earring",
    accent: "#c58b7d",
    items: [
      { name: "Velvet Earring", price: "$29.00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85" },
      { name: "Rose Arc", price: "$31.00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85&sat=20" },
      { name: "Soleil Drop", price: "$27.00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85&sat=-20" },
      { name: "Mira Hoops", price: "$33.00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85&con=20" },
      { name: "Petal Studs", price: "$26.00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85&hue=20" },
      { name: "Luna Drops", price: "$35.00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85&sat=-35" },
      { name: "Cove Hoops", price: "$30.00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85&brightness=10" },
      { name: "Iris Pearl", price: "$39.00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85&sat=35" },
      { name: "Halo Drops", price: "$43.00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85&con=-15" },
      { name: "Serein Studs", price: "$28.00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85&sat=5" },
    ],
  },
];

const ProductLayerBlock = ({ layer, index, onAdd }: { layer: ProductLayer; index: number; onAdd: (layer: ProductLayer, item: ProductItem) => void }) => {
  const blockRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const update = () => {
      if (!blockRef.current || !trackRef.current) return;

      const rect = blockRef.current.getBoundingClientRect();
      const scrollDistance = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / scrollDistance, 0, 1);

      const containerWidth = blockRef.current.clientWidth;
      const totalWidth = trackRef.current.scrollWidth;
      const maxTranslate = Math.max(0, totalWidth - containerWidth);
      const startOffset = 0;
      const endOffset = -maxTranslate;
      const translate = startOffset + progress * (endOffset - startOffset);

      trackRef.current.style.transform = `translate3d(${translate}px, 0, 0)`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [index]);

  return (
    <div ref={blockRef} className="relative h-[180vh] px-0">
      <div className="sticky top-0 z-10 flex h-screen items-center bg-[#f5f1ea]">
        <div className="w-full overflow-hidden px-0">
          <div className="mb-4 flex items-end gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="font-serif text-[2.5rem] leading-none tracking-[-0.08em] text-[#c48a4b] sm:text-[3.5rem]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="h-10 w-px bg-[#d8c2a1] sm:h-14" />
              <div>
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#7a766f]">
                  The {layer.type} edit
                </p>
                <h3 className="m-0 font-serif text-[2rem] leading-none tracking-[-0.06em] text-[#11151b] sm:text-[2.7rem]">
                  {layer.title}
                </h3>
              </div>
            </div>

            <p className="ml-auto hidden max-w-[180px] pb-1 text-right text-[10px] font-medium uppercase tracking-[0.22em] text-[#6c665f] sm:block">
              {layer.subtitle}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-[#e9dfd0] bg-[#fbf8f4] p-3 shadow-[0_24px_70px_rgba(17,21,27,0.07)] sm:p-5">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#c48a4b] to-transparent opacity-70" />
            <div
              ref={trackRef}
              className="flex w-max items-center gap-4 sm:gap-5 md:gap-6"
              style={{ transition: "transform 180ms ease-out" }}
            >
              {layer.items.map((item, itemIndex) => (
                <article
                  key={item.name}
                  className="group relative min-w-[240px] rounded-[26px] border border-[#eae1d3] bg-white/80 p-4 shadow-[0_18px_38px_rgba(17,21,27,0.03)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-[#d9c3a5] hover:shadow-[0_24px_48px_rgba(17,21,27,0.1)] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[340px]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#7a766f]">
                      <span className="text-[#c48a4b]">{String(itemIndex + 1).padStart(2, "0")}</span>
                      {layer.type}
                    </span>
                    {itemIndex < 3 && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#d9c7a5] bg-[#faf4ed] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#11151b]">
                        <Star size={9} fill="currentColor" className="text-[#c48a4b]" />
                        Edit pick
                      </span>
                    )}
                  </div>

                  <div className="relative mb-5 flex h-[230px] items-center justify-center overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_28%),linear-gradient(135deg,#f6f1ea,#e7dfd4)]">
                    {failedImages[item.name] ? (
                      <>
                        <div className="absolute inset-0 opacity-70" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.45), rgba(17,21,27,0.03))" }} />
                        <ProductVisual type={layer.type} accent={layer.accent} />
                      </>
                    ) : (
                      <img
                        src={item.image}
                        alt={`${layer.type} product`}
                        className="h-full w-full object-cover"
                        onError={() => setFailedImages((current) => ({ ...current, [item.name]: true }))}
                      />
                    )}
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h4 className="m-0 font-serif text-[1.65rem] leading-none tracking-[-0.06em] text-[#11151b]">{item.name}</h4>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#76726d]">Signature finish</p>
                    </div>

                    <div className="text-right">
                      <p className="m-0 text-[15px] font-semibold text-[#11151b]">{formatInr(item.price)}</p>
                        <button type="button" onClick={() => onAdd(layer, item)} className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#11151b]">
                          Add to cart
                          <Plus size={10} strokeWidth={1.8} />
                        </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="relative mt-3 h-14 overflow-hidden rounded-full border border-[#e5d7c4] bg-[#f5f1ea] px-4 sm:mt-4 sm:h-16 sm:px-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage: "linear-gradient(135deg, rgba(187,132,72,0.16) 1px, transparent 1px), linear-gradient(45deg, rgba(187,132,72,0.1) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative flex h-full items-center justify-between text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8a8177]">
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c48a4b] bg-[#f5f1ea] font-serif text-[13px] tracking-normal text-[#b7793f]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                Complete
              </span>
              <span className="h-px flex-1 mx-4 bg-gradient-to-r from-[#c48a4b] via-[#d8c2a1] to-transparent" />
              <span className="flex items-center gap-2 text-right">
                {productLayers[index + 1]?.title ?? "Collection complete"}
                {productLayers[index + 1] && <ArrowDown size={13} strokeWidth={1.5} className="text-[#b7793f]" />}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductSections = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (layer: ProductLayer, item: ProductItem) => {
    setCart((currentCart) => {
      const existing = currentCart.find((cartItem) => cartItem.name === item.name);
      if (existing) return currentCart.map((cartItem) => cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
      return [...currentCart, { ...item, type: layer.type, accent: layer.accent, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const changeQuantity = (name: string, amount: number) => {
    setCart((currentCart) => currentCart
      .map((item) => item.name === name ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item)
      .filter((item) => item.quantity > 0));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + Number(item.price.replace("$", "")) * item.quantity, 0), [cart]);
  const orderText = [
    "Hello LEXSA, I would like to order:",
    ...cart.map((item) => `- ${item.name} (${item.type}) x${item.quantity} - ₹${(Number(item.price.replace("$", "")) * item.quantity).toFixed(2)}`),
    `Total: ₹${cartTotal.toFixed(2)}`,
  ].join("\n");
  const whatsappLink = (number: string) => `https://wa.me/${number}?text=${encodeURIComponent(orderText)}`;

  return (
    <section id="products" className="relative isolate scroll-mt-4 overflow-x-clip bg-[#f5f1ea] py-0">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_rgba(194,152,94,0.18),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(102,118,113,0.13),_transparent_34%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-60 mix-blend-multiply"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(187,132,72,0.12) 1px, transparent 1px), linear-gradient(45deg, rgba(187,132,72,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-[-18vw] top-[22%] z-0 h-[58vw] w-[58vw] rounded-full border border-[#c48a4b]/20 opacity-70" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-22vw] top-[58%] z-0 h-[66vw] w-[66vw] rounded-full border border-[#7d918a]/20 opacity-70" />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        <div aria-hidden="true" className="pointer-events-none absolute bottom-8 right-4 top-4 hidden w-16 lg:block">
          <div className="absolute bottom-0 left-1/2 top-0 w-px bg-gradient-to-b from-[#c48a4b] via-[#d8c2a1] to-transparent" />
          <div className="relative flex h-full flex-col items-center justify-between py-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c48a4b] bg-[#f5f1ea] font-serif text-[13px] text-[#b7793f] shadow-[0_0_0_6px_rgba(245,241,234,0.8)]">
              E
            </span>
            {productLayers.map((layer, index) => (
              <span key={layer.title} className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d8c2a1] bg-[#f5f1ea] font-serif text-[12px] text-[#8a8177] shadow-[0_0_0_5px_rgba(245,241,234,0.8)]">
                {String(index + 1).padStart(2, "0")}
              </span>
            ))}
            <span className="h-2 w-2 rounded-full bg-[#c48a4b] shadow-[0_0_0_5px_rgba(245,241,234,0.9)]" />
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#dccab0] bg-white/60 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#7a6c5b]">
              <Sparkles size={11} className="text-[#c79154]" />
              Curated edit
            </div>

            <h2 className="m-0 font-serif text-[2.2rem] leading-none tracking-[-0.06em] text-[#11151b] sm:text-[3rem]">
              Everyday jewelry, elevated.
            </h2>
          </div>

          <a href="/products" className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#11151b]">
            Shop all pieces
            <ArrowRight size={12} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-[2px]" />
          </a>
        </div>

        {productLayers.map((layer, index) => (
          <ProductLayerBlock key={layer.title} layer={layer} index={index} onAdd={addToCart} />
        ))}
      </div>

      <button type="button" onClick={() => setCartOpen(true)} className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-[#11151b] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_16px_35px_rgba(17,21,27,0.2)]">
        <ShoppingBag size={15} /> Cart {cartCount > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d5a66d] px-1 text-[9px] text-[#11151b]">{cartCount}</span>}
      </button>

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#11151b]/30 backdrop-blur-[2px]" onClick={() => setCartOpen(false)}>
          <aside className="h-full w-full max-w-[430px] overflow-y-auto bg-[#fbf8f4] p-5 text-[#11151b] shadow-[-20px_0_60px_rgba(17,21,27,0.16)] sm:p-7" onClick={(event) => event.stopPropagation()}>
            <div className="mb-8 flex items-center justify-between border-b border-[#e2d7c8] pb-5">
              <div><p className="m-0 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#a06f3e]">Your edit</p><h3 className="mt-2 font-serif text-[2.3rem] leading-none tracking-[-0.06em]">Cart</h3></div>
              <button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ded1c0]"><X size={16} /></button>
            </div>

            {cart.length === 0 ? <p className="text-sm text-[#766e64]">Your edit is waiting for its first piece.</p> : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.name} className="flex gap-3 border-b border-[#e2d7c8] pb-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#eee7dc]"><ProductVisual type={item.type} accent={item.accent} /></div>
                    <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div><p className="m-0 font-serif text-[1.25rem] leading-none">{item.name}</p><p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#857b70]">{item.type}</p></div><span className="text-sm font-semibold">₹{(Number(item.price.replace("$", "")) * item.quantity).toFixed(2)}</span></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-2 rounded-full border border-[#ded1c0] bg-white px-2 py-1"><button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => changeQuantity(item.name, -1)}><Minus size={12} /></button><span className="min-w-5 text-center text-xs font-semibold">{item.quantity}</span><button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => changeQuantity(item.name, 1)}><Plus size={12} /></button></div><span className="text-[10px] text-[#857b70]">{formatInr(item.price)} each</span></div></div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 border-t border-[#d8caba] pt-5"><div className="flex items-center justify-between text-sm"><span className="uppercase tracking-[0.16em] text-[#766e64]">Total</span><strong className="font-serif text-2xl">₹{cartTotal.toFixed(2)}</strong></div><div className="mt-5 grid gap-2"><a href={cart.length ? whatsappLink("917550246299") : undefined} target="_blank" rel="noreferrer" onClick={(event) => { if (!cart.length) event.preventDefault(); }} className="flex w-full items-center justify-center rounded-full border border-[#1f8f68] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#187554]">WhatsApp 7550246299</a><a href={cart.length ? whatsappLink("919940471832") : undefined} target="_blank" rel="noreferrer" onClick={(event) => { if (!cart.length) event.preventDefault(); }} className="flex w-full items-center justify-center rounded-full border border-[#1f8f68] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#187554]">WhatsApp 9940471832</a></div></div>
          </aside>
        </div>
      )}
    </section>
  );
};

const ProductVisual = ({ type, accent }: { type: "Ring" | "Chain" | "Earring"; accent: string }) => {
  const ringStyle = {
    borderColor: accent,
    boxShadow: `0 0 0 10px rgba(255,255,255,0.6), 0 16px 35px rgba(0,0,0,0.12)`,
  };

  if (type === "Ring") {
    return (
      <div className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full border-[14px] bg-[#f8f6f0]" style={ringStyle}>
        <div className="h-[42px] w-[42px] rotate-45 rounded-[12px] border-[5px] border-[#e8d9bf] bg-[#f8f6f0]" style={{ boxShadow: `0 0 0 7px #2d8c82` }} />
      </div>
    );
  }

  if (type === "Chain") {
    return (
      <div className="relative flex h-[150px] w-[180px] items-center justify-center">
        <div className="absolute top-4 h-[82px] w-[120px] rounded-[50%] border-[7px] border-[#d2c7b8] border-b-0" />
        <div className="absolute bottom-0 h-[52px] w-[65px] rounded-[18px] border-[7px] border-[#d2c7b8] bg-[#f5f1eb]" />
        <div className="absolute bottom-5 h-[30px] w-[30px] rounded-full border-[6px] border-[#c9a56d] bg-[#f4efe8]" />
        <div className="absolute left-[28%] top-[38%] h-[38px] w-[42px] rounded-full border-[5px] border-[#ba9e74]" />
      </div>
    );
  }

  return (
    <div className="relative flex h-[150px] w-[180px] items-center justify-center gap-6">
      <div className="relative h-[72px] w-[72px] rounded-full border-[7px] border-[#dcb7a0] bg-[#f9f0eb]" style={{ boxShadow: `0 0 0 6px rgba(255,255,255,0.7)` }}>
        <div className="absolute left-1/2 top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-[5px] bg-[#8f6a61] shadow-[0_0_0_3px_rgba(255,255,255,0.8)]" />
      </div>

      <div className="relative h-[72px] w-[72px] rounded-full border-[7px] border-[#dcb7a0] bg-[#f9f0eb]" style={{ boxShadow: `0 0 0 6px rgba(255,255,255,0.7)` }}>
        <div className="absolute left-1/2 top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-[5px] bg-[#8f6a61] shadow-[0_0_0_3px_rgba(255,255,255,0.8)]" />
      </div>
    </div>
  );
};
