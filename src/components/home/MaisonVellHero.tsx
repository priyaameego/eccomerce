"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Product } from "@/data/products";
import { Maximize2, ShoppingBag, Heart, Check, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

// Image sheets from specification
const MODELS =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_042056_1a704ff7-b0e5-4a9f-bbda-62392b819fb6.png&w=3840&q=85";
const PIECES =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_042057_080e85b0-b4aa-4072-8eb9-2304c7baf42b.png&w=2400&q=85";

// Model bounding boxes on 960 x 540 sheet: [x0, x1], Y0=48, Y1=496, FIRST=15
const LOOKS: [number, number][] = [
  [12, 176],
  [178, 330],
  [331, 470],
  [476, 633],
  [634, 767],
  [767, 956],
];
const Y0 = 48;
const Y1 = 496;
const FIRST = 15;

// Pieces on 960 x 720 sheet: [x0, x1, y0, y1, name, price] (Integrated Indian Wholesale Pricing)
type ItemTuple = [number, number, number, number, string, string];
const ITEMS: ItemTuple[] = [
  [26, 224, 28, 214, "Feather Jacket", "₹2,900"],
  [304, 412, 22, 236, "Satin Wide Leg Trousers", "₹1,450"],
  [530, 666, 12, 242, "Pleated Dress", "₹2,200"],
  [752, 922, 100, 146, "Gold Waist Belt", "₹420"],
  [70, 176, 246, 466, "Satin Trench Dress", "₹2,350"],
  [294, 422, 294, 432, "Top Handle Bag", "₹980"],
  [508, 688, 240, 452, "Billow Sleeve Blouse", "₹860"],
  [780, 890, 252, 466, "Tie Waist Trousers", "₹740"],
  [64, 178, 484, 698, "Powder Long Coat", "₹1,980"],
  [316, 396, 482, 698, "Ivory Straight Trousers", "₹690"],
  [530, 672, 508, 682, "Sculpted Ruffle Top", "₹1,120"],
  [754, 916, 484, 700, "Pleated Maxi Skirt", "₹1,340"],
];

// Depth stops from d = -1 (leaving past the rail) to d = 5 (arriving out of haze)
const KX = [1.2, 0.744, 0.496, 0.346, 0.235, 0.15, 0.085];
const KF = [1.14, 0.89, 0.777, 0.704, 0.651, 0.616, 0.59];
const KH = [1.18, 0.832, 0.574, 0.436, 0.334, 0.258, 0.19];
const KB = [0, 0, 1.5, 4, 8, 12, 17];
const KO = [1, 1, 1, 1, 0.86, 0.5, 0];

const NS = "http://www.w3.org/2000/svg";
const wrap = (x: number, n: number) => ((x % n) + n) % n;
const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

// Helper: SVG Cropper
function createCropSvg(
  href: string,
  x0: number,
  y0: number,
  w: number,
  h: number,
  sheetW: number,
  sheetH: number
) {
  const s = document.createElementNS(NS, "svg");
  s.setAttribute("viewBox", `${x0} ${y0} ${w} ${h}`);
  s.setAttribute("aria-hidden", "true");
  const f = document.createElementNS(NS, "svg");
  [
    ["x", String(x0)],
    ["y", String(y0)],
    ["width", String(w)],
    ["height", String(h)],
    ["viewBox", `${x0} ${y0} ${w} ${h}`],
  ].forEach(([k, v]) => f.setAttribute(k, v));
  const i = document.createElementNS(NS, "image");
  i.setAttribute("href", href);
  i.setAttribute("width", String(sheetW));
  i.setAttribute("height", String(sheetH));
  f.append(i);
  s.append(f);
  return s;
}

interface MaisonVellHeroProps {
  standalone?: boolean;
}

export default function MaisonVellHero({ standalone = false }: MaisonVellHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rollRef = useRef<HTMLSpanElement>(null);
  const waitRef = useRef<HTMLDivElement>(null);

  const stepLookRef = useRef<((delta: number) => void) | null>(null);
  const setLookRef = useRef<((lookIdx: number) => void) | null>(null);
  const [activeLookIdx, setActiveLookIdx] = useState(0);

  const [addedToast, setAddedToast] = useState<string | null>(null);

  const addItemToCart = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);

  useEffect(() => {
    const stage = stageRef.current;
    const line = lineRef.current;
    const rail = railRef.current;
    const ring = ringRef.current;
    const roll = rollRef.current;
    const wait = waitRef.current;

    if (!stage || !line || !rail || !ring || !roll || !wait) return;

    // Clear previous children
    line.innerHTML = "";
    rail.innerHTML = "";
    roll.innerHTML = "";

    const N = LOOKS.length;
    const calm = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    // 1. Build Models
    const people = LOOKS.map(([a, b], i) => {
      const e = document.createElement("div");
      e.className = "m";
      e.dataset.i = String(i);
      e.append(createCropSvg(MODELS, a, Y0, b - a, Y1 - Y0, 960, 540));
      line.append(e);
      return { e, r: (b - a) / (Y1 - Y0), f: "", o: "" };
    });

    // 2. Build Product Rail Cards (Luxury E-commerce Pieces with Responsive Add Button & Rupee Pricing)
    const cards = ITEMS.map(([a, b, c, d, name, price], i) => {
      const e = document.createElement("article");
      e.className = "card" + (i % 2 ? " alt" : "");
      e.innerHTML = `
        <button class="fav" aria-pressed="false" aria-label="Save ${name}">
          <svg viewBox="0 0 24 24"><path d="M12 20S3.5 15 3.5 9A4.6 4.6 0 0 1 12 6.6 4.600 4.600 0 0 1 20.500 9C20.500 15 12 20 12 20Z"/></svg>
        </button>
        <span class="shot"></span>
        <div class="meta">
          <div class="meta-info">
            <h3 class="piece-title">${name}</h3>
            <div class="piece-row">
              <span class="piece-price">${price}</span>
              <span class="piece-delivery">Free Delivery</span>
            </div>
          </div>
          <button class="add-btn" aria-label="Add ${name} to cart" title="Add to Bag">
            <svg class="bag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span class="btn-text">Add</span>
          </button>
        </div>
      `;
      e.querySelector(".shot")?.append(
        createCropSvg(PIECES, a, c, b - a, d - c, 960, 720)
      );
      rail.append(e);
      return e;
    });

    // 3. Build Rolling Look Numbers (15, 16, 17, 18, 19, 20, 15)
    for (let i = 0; i <= N; i++) {
      const bEl = document.createElement("b");
      bEl.textContent = String(FIRST + (i % N));
      roll.append(bEl);
    }

    // 4. Cart & Heart Listeners
    const handleRailClick = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      const favBtn = targetEl.closest(".fav") as HTMLElement | null;
      if (favBtn) {
        const isPressed = favBtn.getAttribute("aria-pressed") === "true";
        favBtn.setAttribute("aria-pressed", isPressed ? "false" : "true");
        return;
      }

      const addBtn = targetEl.closest(".add, .add-btn") as HTMLElement | null;
      if (addBtn) {
        const cardEl = addBtn.closest(".card");
        const idx = cards.findIndex((c) => c === cardEl);
        if (idx !== -1) {
          const item = ITEMS[idx];
          const [a, b, c, d, name, priceStr] = item;
          const parsedPrice = parseInt(priceStr.replace(/[^0-9]/g, "")) || 1200;

          // Visual feedback on the button
          addBtn.classList.add("added");
          const btnText = addBtn.querySelector(".btn-text");
          if (btnText) btnText.textContent = "Added ✓";
          setTimeout(() => {
            addBtn.classList.remove("added");
            if (btnText) btnText.textContent = "Add";
          }, 1600);

          const pObj: Product = {
            id: `maison-runway-${idx}`,
            slug: `maison-${name.toLowerCase().replace(/\s+/g, "-")}`,
            title: `Maison Vell ${name}`,
            subtitle: "SS27 Paris Runway Collection",
            category: "Women Western",
            subcategory: "Dresses",
            brand: "Maison Vell",
            price: parsedPrice,
            rating: 5.0,
            reviewsCount: 168,
            inStock: true,
            stockCount: 8,
            images: [PIECES],
            turntableImages: [],
            colors: [{ name: "Ivory Silk", hex: "#f8f9fa" }],
            sizes: ["XS", "S", "M", "L"],
            description: `Exclusive Runway Lookpiece: ${name}. Handcrafted couture standard with pure silken drapery.`,
            craftsmanship: "Runway Atelier Masterpiece",
            specs: { Collection: "Spring Summer 2027", Origin: "Paris" },
            features: ["Runway Edition", "Hand-finished", "Limited Production"],
            reviews: [],
          };

          addItemToCart(pObj, 1, "Ivory Silk", "M");
          setAddedToast(`Added "${name}" (${priceStr}) to your Cart ✓`);
          setTimeout(() => setAddedToast(null), 3500);
        }
      }
    };
    rail.addEventListener("click", handleRailClick);

    // 5. Layout Sizing
    let W = 0,
      H = 0,
      base = 0,
      cardS = 0,
      side = false,
      dirty = true,
      p = 0,
      target = 0,
      last = 0;

    function size() {
      if (!stage || !rail || !roll) return;
      W = stage.clientWidth;
      H = stage.clientHeight;
      base = H * 1.15;
      side = window.innerWidth <= 820;

      people.forEach((m) => {
        m.e.style.width = base * m.r + "px";
        m.e.style.height = base + "px";
      });

      cardS = side ? 165 : rail.clientHeight / 3;
      cards.forEach((c) => {
        c.style.height = side ? "100%" : cardS + "px";
      });

      dirty = true;
    }

    window.addEventListener("resize", size);

    // 6. Paint Function (Mathematical Depth Projection)
    function paint() {
      people.forEach((m, i) => {
        let d = wrap(i - p, N);
        if (d > N - 1) d -= N; // depth runs from -1 to 5
        const k = clamp(d + 1, 0, 6);
        const a = Math.floor(k);
        const b = Math.min(6, a + 1);
        const t = k - a;
        const mix = (A: number[]) => A[a] + (A[b] - A[a]) * t;
        const h = mix(KH) * H * 0.94;
        const s = h / base;
        const w = h * m.r;
        const x = mix(KX) * W - w / 2;
        const y = mix(KF) * H * 0.97 - h;

        m.e.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) scale(${s.toFixed(4)})`;
        const f = mix(KB) / s;
        const fs = f < 0.2 ? "none" : `blur(${f.toFixed(1)}px)`;
        const o = mix(KO).toFixed(3);

        if (fs !== m.f) {
          m.f = fs;
          m.e.style.filter = fs;
        }
        if (o !== m.o) {
          m.o = o;
          m.e.style.opacity = o;
        }
        m.e.style.zIndex = String(100 - Math.round(d * 10));
      });

      const all = cardS * ITEMS.length;
      cards.forEach((c, i) => {
        let y = wrap(i * cardS - p * 2 * cardS, all);
        if (y > all - cardS) y -= all;
        c.style.transform = side
          ? `translate3d(${y.toFixed(1)}px,0,0)`
          : `translate3d(0,${y.toFixed(1)}px,0)`;
      });

      const firstB = roll?.firstChild as HTMLElement | null;
      const bHeight = firstB ? firstB.offsetHeight : 38;
      if (roll) {
        roll.style.transform = `translate3d(0,${(-wrap(p, N) * bHeight).toFixed(1)}px,0)`;
      }
    }

    // 7. RAF Loop with Exponential Easing
    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0;
    let animId = 0;
    let lastActiveIdx = 0;

    stepLookRef.current = (delta: number) => {
      target = Math.round(target) + delta;
    };

    setLookRef.current = (lookIdx: number) => {
      let currentIdx = wrap(Math.round(target), N);
      let diff = lookIdx - currentIdx;
      if (diff > N / 2) diff -= N;
      if (diff < -N / 2) diff += N;
      target = Math.round(target) + diff;
    };

    // Auto-slide runway timer (slides every 4.2 seconds smoothly)
    let autoSlideTimer: any = null;
    let isHovering = false;

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(() => {
        if (!isHovering && !down) {
          target = Math.round(target) + 1;
        }
      }, 4200);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    startAutoSlide();

    function frame(now: number) {
      const dt = Math.min(50, now - last) || 16;
      last = now;
      const was = p;
      if (calm) {
        p = target;
      } else {
        p += (target - p) * (1 - Math.exp(-dt * 0.0072));
      }

      if (Math.abs(target - p) < 0.0004) p = target;
      if (p !== was || dirty) {
        dirty = false;
        paint();
      }

      const curIdx = wrap(Math.round(p), N);
      if (curIdx !== lastActiveIdx) {
        lastActiveIdx = curIdx;
        setActiveLookIdx(curIdx);
      }

      cx += (mx - cx) * 0.32;
      cy += (my - cy) * 0.32;
      if (ring) {
        ring.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
      }
    }

    function loop(t: number) {
      frame(t);
      animId = requestAnimationFrame(loop);
    }

    // 8. Interaction Listeners (Drag, Wheel, Keys, Click)
    let down = false,
      sx = 0,
      st = 0,
      moved = 0,
      wheelT: any = 0;
    const PULL = () => Math.max(150, W * 0.2);

    const onPointerEnter = (e: PointerEvent) => {
      isHovering = true;
      if (e.pointerType === "mouse") ring.classList.add("show");
    };

    const onPointerLeave = () => {
      isHovering = false;
      ring.classList.remove("show");
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      if (!down) return;
      const dx = e.clientX - sx;
      moved = Math.max(moved, Math.abs(dx));
      target = st + dx / PULL();
    };

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      down = true;
      sx = e.clientX;
      st = target;
      moved = 0;
      stage.setPointerCapture(e.pointerId);
      ring.classList.add("drag");
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      ring.classList.remove("drag");
      if (moved < 6) {
        const hit = document
          .elementsFromPoint(e.clientX, e.clientY)
          .find((x) => x.classList && x.classList.contains("m")) as HTMLElement | undefined;
        if (hit && hit.dataset.i) {
          let d = wrap(+hit.dataset.i - target, N);
          d = Math.round(d);
          if (d > 0 && d < N) target = Math.round(target) + d;
        }
      } else {
        target = Math.round(target);
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target += clamp(e.deltaY + e.deltaX, -120, 120) / 420;
      clearTimeout(wheelT);
      wheelT = setTimeout(() => {
        target = Math.round(target);
      }, 150);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        target = Math.round(target) + 1;
      }
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        target = Math.round(target) - 1;
      }
    };

    stage.addEventListener("pointerenter", onPointerEnter);
    stage.addEventListener("pointerleave", onPointerLeave);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    // Initial load and decoding
    Promise.all(
      [MODELS, PIECES].map((u) => {
        const img = new Image();
        img.src = u;
        return img.decode().catch(() => {});
      })
    )
      .then(() => document.fonts?.ready)
      .then(() => {
        size();
        paint();
        wait.classList.add("gone");
      });

    size();
    animId = requestAnimationFrame(loop);

    return () => {
      stopAutoSlide();
      stepLookRef.current = null;
      setLookRef.current = null;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", size);
      window.removeEventListener("keydown", onKeyDown);
      rail.removeEventListener("click", handleRailClick);
      stage.removeEventListener("pointerenter", onPointerEnter);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("wheel", onWheel);
    };
  }, [addItemToCart]);

  return (
    <div
      ref={containerRef}
      className={`maison-vell-root relative w-full overflow-hidden bg-white text-[#16191f] select-none ${
        standalone
          ? "h-[100svh] min-h-[520px] flex flex-col"
          : "h-[540px] sm:h-[620px] lg:h-[700px] rounded-3xl border border-gray-200/90 shadow-xl my-2"
      }`}
    >
      {/* Toast Notification when adding piece to cart */}
      {addedToast && (
        <div className="absolute top-4 right-4 z-50 bg-[#16191f] text-white text-xs font-mono py-2 px-4 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{addedToast}</span>
          <button
            onClick={openCart}
            className="underline font-bold text-amber-300 ml-1 cursor-pointer"
          >
            View Cart
          </button>
        </div>
      )}

      {/* Standalone Header (Rendered only if standalone is true) */}
      {standalone && (
        <header className="relative z-10 bg-white border-b border-gray-100">
          <div className="r1">
            <Link className="brand wide" href="/" aria-label="Maison Vell">
              Maison Vell
            </Link>
            <nav className="tabs wide" aria-label="Sections">
              <Link className="on" href="/runway" aria-current="page">
                Runway
              </Link>
              <Link href="/about">The Maison</Link>
              <Link href="/stories">Lookbook</Link>
              <Link href="/shop">Shop</Link>
            </nav>
            <div className="acct wide">
              <Link href="/account">Login</Link>
              <button aria-label="Search">
                <svg viewBox="0 0 24 24">
                  <circle cx="10.5" cy="10.5" r="6.5" />
                  <path d="m15.5 15.5 5 5" />
                </svg>
              </button>
              <button aria-label="Saved">
                <svg viewBox="0 0 24 24">
                  <path d="M12 20S3.5 15 3.5 9A4.6 4.6 0 0 1 12 6.6 4.6 4.6 0 0 1 20.5 9C20.5 15 12 20 12 20Z" />
                </svg>
              </button>
              <button onClick={openCart} aria-label="Bag">
                <svg viewBox="0 0 24 24">
                  <path d="M5 8h14l1 13H4Z" />
                  <path d="M9 10V6a3 3 0 0 1 6 0v4" />
                </svg>
              </button>
              <button onClick={openCart}>
                Cart (<span id="cart">0</span>)
              </button>
            </div>
          </div>
          <nav className="r2 wide" aria-label="Departments">
            <Link href="/shop">Collections</Link>
            <Link href="/shop?category=Women%20Western">Clothing</Link>
            <Link href="/stories">Lookbook</Link>
            <Link href="/shop?category=Beauty%20%26%20Health">Beauty</Link>
            <Link href="/shop?category=Jewellery%20%26%20Accessories">Accessories</Link>
            <Link href="/about">Our World</Link>
          </nav>
        </header>
      )}

      {/* Embedded Banner Mini-Navbar (When in hero mode) */}
      {!standalone && (
        <div className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-8 py-3 flex items-center justify-between pointer-events-none bg-gradient-to-b from-white/90 via-white/40 to-transparent">
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="font-['Michroma'] uppercase tracking-[0.2em] text-[10px] sm:text-xs font-black text-[#16191f]">
              MAISON VELL
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#737b86] hidden sm:inline">
              • Runway SS27 Depth
            </span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-mono text-[#737b86] bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-gray-200 shadow-2xs">
              Drag or Scroll ↔
            </span>
            <Link
              href="/runway"
              className="p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-black border border-gray-200/80 shadow-2xs transition-transform active:scale-95"
              title="Expand to Full Viewport Runway"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Main Grid: Stage (Models) + Rail (Products) */}
      <div className="main flex-1">
        <section
          ref={stageRef}
          className="stage"
          tabIndex={0}
          aria-label="Runway looks. Drag, scroll or use the arrow keys to change look."
        >
          <div ref={lineRef} className="line" />

          {/* Intro Text */}
          <div className="intro">
            <h2 className="wide">Spring Summer 2027</h2>
            <p>
              A study in softness and strength. The new season collection from Maison
              Vell blends delicate textures and modern silhouettes, crafted for a more
              beautiful tomorrow.
            </p>
          </div>

          {/* Look Number Indicator */}
          <div className="tag">
            <div className="look wide" aria-live="polite">
              <span>Look</span>
              <span className="win">
                <span ref={rollRef} className="roll" />
              </span>
            </div>
            <Link className="shop wide" href="/shop?category=Women%20Western">
              Shop the look
            </Link>
          </div>

          {/* Interactive Mouse Ring Cursor */}
          <div ref={ringRef} className="ring" />
        </section>

        {/* Product Rail Column */}
        <aside
          ref={railRef}
          className="rail"
          aria-label="Pieces in this look"
        />
      </div>

      {/* Initial Decoding Cover */}
      <div ref={waitRef} className="wait" />
    </div>
  );
}

