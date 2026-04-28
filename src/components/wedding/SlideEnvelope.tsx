import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import floralTL from "@/assets/floral-tl.png";
import floralBR from "@/assets/floral-br.png";
import damaskBg from "@/assets/damask-bg.jpg";
import ganeshaIcon from "@/assets/Ganesh-icon.png";
import vinayaka from "@/assets/vinayaka.png";
import medallionTop from "@/assets/medallion-top.png";

/* ─── INVITATION CONTENT ───────────────────────────────────── */
const INVITE = {
  blessings: ["Shrirasthu", "Shubhamasthu", "Avighnamasthu"],
  heading: "Wedding Invitation",
  intro: "We solicit your gracious presence",
  intro2: "with family & friends on the auspicious occasion",
  intro3: "of the marriage of our beloved son",
  groomPrefix: "Chi.",
  groom: "Pranay Chary",
  with: "with",
  bridePrefix: "Chi.La.Sow.",
  bride: "Viha Sravani",
  brideParents:
    "Elder S/o. Smt. & Sri Uma Maheshwari – Kolloju Narsimha Charyi, R/o. Chitkul",
  muhurthamLabel: "Sumuhurtham",
  date: "Wednesday, 06th May 2026",
  time: 'at 10:49 a.m. \u201CKarkataka Lagnam\u201D',
  venueLabel: "Venue",
  venue: "P.S.R. Gardens",
  venueAddress:
    "Beside Kotak Mahendra Bank,\nVill. Muthangi, Mdl. Patancheru,\nSangareddy Dist.",
  invitedBy: "Invited By",
  hosts: ["Smt. Ravuri Padhmavathi", "Sri Subrhamanya Veerabhadra Malleshwara Rao"],
  closing: "With Best Compliments from : Near & Dear.",
};
/* ──────────────────────────────────────────────────────────── */

export const SlideEnvelope = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, { damping: 40, stiffness: 140, mass: 0.6 });

  /* Card enter */
  const cardY       = useTransform(p, [0, 0.18], ["8%", "0%"]);
  const cardOpacity = useTransform(p, [0, 0.15], [0, 1]);
  const cardScale   = useTransform(p, [0, 0.18], [0.92, 1]);

  /* Gate fold 0.28 → 0.72 */
  const leftRot  = useTransform(p, [0.28, 0.72], [0, -172]);
  const rightRot = useTransform(p, [0.28, 0.72], [0,  172]);

  /* Gate face brightness while rotating */
  const leftShade  = useTransform(p, [0.28, 0.5, 0.72], [1, 0.55, 0.7]);
  const rightShade = useTransform(p, [0.28, 0.5, 0.72], [1, 0.55, 0.7]);

  /* Inner reveal */
  const innerOpacity = useTransform(p, [0.45, 0.72], [0, 1]);
  const innerScale   = useTransform(p, [0.45, 0.88], [0.96, 1]);

  /* Slide gates off-screen after they've opened */
  const gatesX        = useTransform(p, [0.72, 0.95], [0, 90]);
  const negGatesX     = useTransform(gatesX, (v) => -v); /* ← FIX: top-level hook */
  const gatesOpacity  = useTransform(p, [0.85, 0.98], [1, 0]);

  /* Crease shadow fades as gates open */
  const creaseOpacity = useTransform(p, [0.15, 0.38], [0.6, 0]);

  /* Prompts */
  const captionOpacity = useTransform(p, [0.9, 1], [0, 1]);
  const promptOpacity  = useTransform(p, [0, 0.08], [0.9, 0]);

  /* 3-D hover tilt on the whole card */
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r  = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    setTilt({ rx: dy * -5, ry: dx * 6 });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <section ref={ref} className="relative h-[360vh]">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{
          background:
            "radial-gradient(ellipse at 35% 45%, hsl(226 55% 17%) 0%, hsl(226 70% 8%) 55%, hsl(226 78% 5%) 100%)",
        }}
      >
        {/* Star-dust background */}
        <StarField />

        {/* Floating flower symbols */}
        <FloatingSymbols />

        {/* "Scroll to open" prompt */}
        <motion.p
          style={{ opacity: promptOpacity }}
          className="absolute top-9 left-1/2 -translate-x-1/2 font-sans-clean tracking-luxury text-[10px] uppercase text-gold-bright/70 z-30 pointer-events-none"
        >
          Scroll to open the invitation
        </motion.p>

        {/* ── CARD STAGE ─────────────────────────────── */}
        <motion.div
          className="relative w-[95vw] sm:w-[90vw] md:w-[85vw] max-w-[1800px] max-h-[80vh] aspect-[0.75/1] sm:aspect-[1.1/1] md:aspect-[1.4/1] lg:aspect-[1.6/1] 2xl:aspect-[1.8/1]"
          style={{
            y: cardY, opacity: cardOpacity, scale: cardScale,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.12)) drop-shadow(0 24px 48px rgba(0,0,0,0.38))",
          }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          {/* 3-D perspective + tilt — overflow-hidden clips everything to card bounds */}
          <div
            className="relative w-full h-full overflow-hidden rounded-[2px]"
            style={{
              perspective: "2000px",
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* INNER PAGE (revealed behind gates) */}
            <motion.div
              style={{ opacity: innerOpacity, scale: innerScale }}
              className="absolute inset-0 z-0 overflow-hidden"
            >
              <InnerInvitation />
            </motion.div>

            {/* ── LEFT GATE ── */}
            <motion.div
              style={{ x: negGatesX, opacity: gatesOpacity }}
              className="absolute inset-0 z-10"
            >
              <div className="absolute inset-0" style={{ perspective: "2600px" }}>
                <motion.div
                  style={{
                    rotateY: leftRot,
                    transformOrigin: "0% 50%",
                    transformStyle: "preserve-3d",
                  }}
                  className="absolute left-0 top-0 w-1/2 h-full"
                >
                  <GatePanel side="left" shade={leftShade} />
                </motion.div>
              </div>
            </motion.div>

            {/* ── RIGHT GATE ── */}
            <motion.div
              style={{ x: gatesX, opacity: gatesOpacity }}
              className="absolute inset-0 z-10"
            >
              <div className="absolute inset-0" style={{ perspective: "2600px" }}>
                <motion.div
                  style={{
                    rotateY: rightRot,
                    transformOrigin: "100% 50%",
                    transformStyle: "preserve-3d",
                  }}
                  className="absolute right-0 top-0 w-1/2 h-full"
                >
                  <GatePanel side="right" shade={rightShade} />
                </motion.div>
              </div>
            </motion.div>

            {/* ── CENTER CREASE SHADOW ── */}
            <motion.div
              style={{ opacity: creaseOpacity }}
              className="absolute left-1/2 top-[2%] bottom-[2%] w-[4px] -translate-x-1/2 z-20 pointer-events-none"
            >
              <div className="w-full h-full bg-gradient-to-b from-transparent via-black/50 to-transparent" />
            </motion.div>
          </div>
        </motion.div>
        {/* ─────────────────────────────────────────── */}

        {/* Final caption */}
        <motion.div
          style={{ opacity: captionOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-30 pointer-events-none"
        >
          <p className="font-display italic text-gold-bright text-xl">
            With love &amp; blessings
          </p>
          <p className="mt-1 font-sans-clean tracking-luxury text-[10px] uppercase text-gold-bright/60">
            Viha &amp; Pranay
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════
   GATE PANEL  (outer cover half)
══════════════════════════════════════════════════════════════ */
const GatePanel = ({
  side,
  shade,
}: {
  side: "left" | "right";
  shade: MotionValue<number>;
}) => {
  const brightness = useTransform(shade, (v) => `brightness(${v})`);
  const isLeft = side === "left";

  return (
    <motion.div
      style={{ filter: brightness, backfaceVisibility: "hidden" } as any}
      className="relative w-full h-full overflow-hidden"
    >
      {/* ── Paper base ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, hsl(40 42% 97%) 0%, hsl(38 30% 93%) 55%, hsl(36 24% 87%) 100%)",
        }}
      />

      {/* ── Medallion Background for each panel ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={medallionTop}
          alt=""
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* ── CENTER VINAYAKA / GANESHA — split across both gates ── */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 h-[44%] aspect-square pointer-events-none z-10 ${
          isLeft ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
        }`}
        style={{
          clipPath: isLeft ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
        }}
      >
        {/* Damask background in the center, masked to fade out radially */}
        <div
          className="absolute inset-0 opacity-[0.8]"
          style={{
            backgroundImage: `url(${damaskBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "radial-gradient(circle, black 25%, transparent 68%)",
            WebkitMaskImage: "radial-gradient(circle, black 25%, transparent 68%)",
          }}
        />
        
        {/* Plain Vinayaka image */}
        <img
          src={vinayaka}
          alt="Lord Vinayaka"
          className="absolute inset-0 w-full h-full object-contain p-4"
        />
      </div>

      {/* ── Directional lighting (bright edges, no dark shadows) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: isLeft
            ? "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.3) 100%)"
            : "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.4) 100%)",
        }}
      />
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════
   INNER INVITATION  (revealed when gates open)
══════════════════════════════════════════════════════════════ */
const InnerInvitation = () => (
  <div
    className="relative w-full h-full overflow-hidden"
    style={{
      background:
        "linear-gradient(170deg, hsl(40 38% 97%) 0%, hsl(38 30% 94%) 45%, hsl(36 24% 89%) 100%)",
    }}
  >
    {/* Damask watermark — very subtle */}
    <div
      className="absolute inset-0 opacity-[0.13] mix-blend-multiply pointer-events-none"
      style={{
        backgroundImage: `url(${damaskBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />

    {/* Fold line */}
    <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-stone-400/20 pointer-events-none" />

    {/* Floral top-left: floral-tl.png */}
    <img
      src={floralTL}
      alt=""
      className="absolute top-0 left-0 w-[22%] pointer-events-none select-none mix-blend-multiply"
      style={{ opacity: 0.85 }}
    />
    {/* Floral bottom-right: floral-br.png */}
    <img
      src={floralBR}
      alt=""
      className="absolute bottom-0 right-0 w-[22%] pointer-events-none select-none mix-blend-multiply"
      style={{ opacity: 0.85 }}
    />

    {/* Gold embossed frame */}
    <div
      className="absolute inset-[10px] pointer-events-none"
      style={{ border: "1px solid hsl(38 55% 50% / 0.5)" }}
    />
    <div
      className="absolute inset-[14px] pointer-events-none"
      style={{ border: "0.5px solid hsl(345 55% 30% / 0.2)" }}
    />

    {/* Corner flourishes */}
    {[
      "top-[10px] left-[10px]",
      "top-[10px] right-[10px] rotate-90",
      "bottom-[10px] right-[10px] rotate-180",
      "bottom-[10px] left-[10px] -rotate-90",
    ].map((cls) => (
      <svg
        key={cls}
        className={`absolute ${cls} w-5 h-5 z-10 pointer-events-none`}
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M2 2 L10 2 M2 2 L2 10 M2 2 Q8 2 8 8"
          stroke="hsl(38 55% 50%)"
          strokeWidth="0.8"
        />
        <circle cx="2" cy="2" r="1.2" fill="hsl(38 55% 50%)" />
      </svg>
    ))}

    {/* ── CONTENT ── */}
    <div
      className="relative z-20 h-full flex flex-col items-center text-center px-[9%] py-[2%]"
      style={{ color: "hsl(345 60% 26%)" }}
    >
      {/* Blessings */}
      <div className="flex w-full justify-around max-w-[95%] md:max-w-[80%]">
        {INVITE.blessings.map((b) => (
          <span
            key={b}
            className="font-serif-soft italic text-[clamp(8px,1.5vw,28px)] tracking-wide opacity-80"
          >
            {b}
          </span>
        ))}
      </div>

      {/* ── Ganesha icon — no colour filter, just a soft shadow ── */}
      <div className="mt-[1%] h-[8%] flex items-center justify-center">
        <img
          src={ganeshaIcon}
          alt="Ganesha"
          className="h-full w-auto object-contain"
          style={{ filter: "drop-shadow(0 2px 8px rgba(100,50,10,0.35))" }}
        />
      </div>

      {/* Heading */}
      <h3
        className="mt-[1%] font-display italic leading-none"
        style={{ fontSize: "clamp(14px,3.2vw,56px)" }}
      >
        {INVITE.heading}
      </h3>

      {/* Gold divider */}
      <div className="gold-divider w-[55%] my-[1%] opacity-50" />

      {/* Intro lines */}
      <p className="font-serif-soft italic leading-tight" style={{ fontSize: "clamp(8px,1.5vw,30px)" }}>
        {INVITE.intro}
      </p>
      <p className="font-serif-soft italic leading-tight" style={{ fontSize: "clamp(8px,1.5vw,30px)" }}>
        {INVITE.intro2}
      </p>
      <p className="font-serif-soft italic leading-tight" style={{ fontSize: "clamp(8px,1.5vw,30px)" }}>
        {INVITE.intro3}
      </p>

      {/* Groom name */}
      <p className="mt-[1.5%] font-display leading-tight" style={{ fontSize: "clamp(14px,2.5vw,44px)" }}>
        <span style={{ fontSize: "0.72em" }} className="mr-1">{INVITE.bridePrefix}</span>
        <span className="italic font-semibold">{INVITE.bride}</span>
      </p>

      <p className="font-serif-soft italic opacity-70 my-[0.5%]" style={{ fontSize: "clamp(8px,1.3vw,24px)" }}>
        {INVITE.with}
      </p>

      {/* Bride name */}
      <p className="font-display leading-tight" style={{ fontSize: "clamp(14px,2.5vw,44px)" }}>
        <span style={{ fontSize: "0.68em" }} className="mr-1">{INVITE.groomPrefix}</span>
        <span className="italic font-semibold">{INVITE.groom}</span>
      </p>

      <p
        className="font-serif-soft opacity-65 leading-snug max-w-[90%] mt-[1%]"
        style={{ fontSize: "clamp(7px,1.1vw,20px)" }}
      >
        {INVITE.brideParents}
      </p>

      {/* Thin divider */}
      <div className="gold-divider w-[45%] my-[1%] opacity-40" />

      {/* Muhurtham */}
      <p className="font-display italic" style={{ fontSize: "clamp(10px,1.9vw,32px)" }}>
        {INVITE.muhurthamLabel} :
      </p>
      <p className="font-serif-soft italic leading-snug" style={{ fontSize: "clamp(8px,1.4vw,24px)" }}>
        {INVITE.date}
      </p>
      
      {/* Venue & Time */}
      <div className="mt-[1%] flex flex-col items-center">
        <p className="font-serif-soft text-[clamp(8px,1.4vw,24px)] mb-[0.5%]">
          {INVITE.time}
        </p>
        <p
          className="font-sans-clean tracking-widest uppercase text-gold-bright drop-shadow-sm font-semibold"
          style={{ fontSize: "clamp(9px,1.7vw,32px)" }}
        >
          {INVITE.venue}
        </p>
        <p className="font-serif-soft opacity-80" style={{ fontSize: "clamp(7px,1.2vw,22px)" }}>
          {INVITE.venueAddress}
        </p>
      </div>

      {/* Invited by */}
      <p className="mt-[1.5%] font-display italic" style={{ fontSize: "clamp(9px,1.6vw,28px)" }}>
        {INVITE.invitedBy} :
      </p>
      {INVITE.hosts.map((h) => (
        <p
          key={h}
          className="font-display italic leading-tight"
          style={{ fontSize: "clamp(8px,1.3vw,18px)" }}
        >
          {h}
        </p>
      ))}

      {/* Closing */}
      <p
        className="mt-auto mb-0.5 font-serif-soft italic opacity-60"
        style={{ fontSize: "clamp(7px,0.9vw,10px)" }}
      >
        {INVITE.closing}
      </p>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   BACKGROUND HELPERS
══════════════════════════════════════════════════════════════ */

/** 60 twinkling gold star-dust particles */
const StarField = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 60 }).map((_, i) => (
      <span
        key={i}
        className="absolute rounded-full"
        style={{
          top:    `${(i * 41)  % 100}%`,
          left:   `${(i * 73)  % 100}%`,
          width:  `${1 + (i % 3)}px`,
          height: `${1 + (i % 3)}px`,
          background: `hsl(${40 + (i % 6) * 3} ${60 + (i % 5) * 4}% ${58 + (i % 4) * 4}%)`,
          animation: `sparkle-twinkle ${2.5 + (i % 5)}s ${(i * 0.25) % 4}s ease-in-out infinite`,
          opacity: 0.15 + ((i * 11) % 55) / 100,
        }}
      />
    ))}
  </div>
);

/** Floating ✿ flower symbols drift upward */
const FloatingSymbols = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 14 }).map((_, i) => (
      <span
        key={i}
        className="absolute text-gold-bright animate-float-petal select-none"
        style={{
          bottom: `-${(i * 7) % 20}%`,
          left:   `${(i * 19 + 4) % 95}%`,
          fontSize: `${10 + (i % 5) * 5}px`,
          opacity: 0,
          "--duration": `${9 + (i % 6) * 2}s`,
          "--delay":    `${(i * 0.9) % 6}s`,
          "--drift-x":  `${(i % 2 === 0 ? 1 : -1) * (25 + (i * 11) % 45)}px`,
          "--spin":     `${(i % 2 === 0 ? 1 : -1) * (100 + (i * 43) % 260)}deg`,
        } as React.CSSProperties}
      >
        {["✿", "❀", "✾", "❁"][i % 4]}
      </span>
    ))}
  </div>
);
