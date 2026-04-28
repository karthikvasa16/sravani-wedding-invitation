import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Ornament } from "./Ornament";

/* ---------- EASY-TO-EDIT CONTENT ---------- */
const INVITE = {
  heading: "Wedding Invitation",
  subheading: "We solicit your gracious presence with family & friends on the auspicious occasion of the marriage of",
  groom: "Chi. Pranay Chary",
  with: "with",
  bride: "Chi.La.Sow. Viha (Sravani)",
  brideParents:
    "(Elder D/o. Smt. & Sri Ravuri Padhmavathi – Subrhamanya Veerabhadra Malleshwara Rao, R/o. Chinthaparru)",
  muhurthamLabel: "Sumuhurtham",
  date: "Wednesday, 06th May 2026",
  time: "10:49 A.M. · Karkataka Lagnam",
  venueLabel: "Venue",
  venue: "P.S.R. Gardens",
  venueAddress: "Beside Kotak Mahendra Bank, Vill. Muthangi, Mdl. Patancheru, Sangareddy Dist.",
  invitedBy: "Invited By",
  hosts: "Smt. Kolloju Uma Maheshwari · Sri Kolloju Narsimha Chary",
  blessings: "With best compliments from · Near & Dear",
};
/* ------------------------------------------ */

export const SlideEnvelope = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, { damping: 40, stiffness: 140, mass: 0.6 });

  // Closed card appears & settles 0 - 0.2
  const cardEnterY = useTransform(p, [0, 0.15], ["8%", "0%"]);
  const cardEnterOpacity = useTransform(p, [0, 0.15], [0, 1]);
  const cardEnterScale = useTransform(p, [0, 0.15], [0.92, 1]);

  // Medallions fade as gates begin opening (0.22 - 0.35)
  const medallionOpacity = useTransform(p, [0.22, 0.35], [1, 0]);
  const medallionScale = useTransform(p, [0.22, 0.35], [1, 0.85]);

  // Gate rotation 0.3 - 0.75
  const leftRot = useTransform(p, [0.3, 0.75], [0, -165]);
  const rightRot = useTransform(p, [0.3, 0.75], [0, 165]);

  // Lighting on panels (brighter when flat, darker when rotated)
  const leftShade = useTransform(p, [0.3, 0.55, 0.75], [1, 0.55, 0.75]);
  const rightShade = useTransform(p, [0.3, 0.55, 0.75], [1, 0.55, 0.75]);

  // Inner page reveal
  const innerOpacity = useTransform(p, [0.45, 0.7], [0, 1]);
  const innerScale = useTransform(p, [0.45, 0.8], [0.96, 1]);

  // Gates push outward slightly after fully opened (> 0.75)
  const gatesX = useTransform(p, [0.75, 1], [0, 60]);
  const gatesOpacity = useTransform(p, [0.85, 1], [1, 0]);

  // Final caption
  const captionOpacity = useTransform(p, [0.9, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-royal-deep via-royal to-royal-deep flex items-center justify-center">
        {/* ambient sparkles */}
        <Sparkles />

        {/* Scroll prompt (fades out quickly) */}
        <motion.p
          style={{ opacity: useTransform(p, [0, 0.1], [0.8, 0]) }}
          className="absolute top-10 left-1/2 -translate-x-1/2 font-sans-clean tracking-luxury text-[10px] uppercase text-gold-bright/80"
        >
          Scroll to open
        </motion.p>

        {/* Card stage */}
        <motion.div
          style={{
            y: cardEnterY,
            opacity: cardEnterOpacity,
            scale: cardEnterScale,
            perspective: 2400,
          }}
          className="relative w-[88vw] max-w-[720px] aspect-[3/4]"
        >
          {/* INNER PAGE (revealed) */}
          <motion.div
            style={{ opacity: innerOpacity, scale: innerScale }}
            className="absolute inset-0 z-0"
          >
            <InnerInvitation />
          </motion.div>

          {/* GATES */}
          <motion.div
            style={{ x: useTransform(gatesX, (v) => -v), opacity: gatesOpacity }}
            className="absolute inset-0 z-10"
          >
            <div className="absolute inset-0" style={{ perspective: 2400 }}>
              {/* LEFT GATE */}
              <motion.div
                style={{
                  rotateY: leftRot,
                  transformOrigin: "0% 50%",
                  transformStyle: "preserve-3d",
                }}
                className="absolute left-0 top-0 w-1/2 h-full"
              >
                <GatePanel side="left" shade={leftShade} medallionOpacity={medallionOpacity} medallionScale={medallionScale} />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            style={{ x: gatesX, opacity: gatesOpacity }}
            className="absolute inset-0 z-10"
          >
            <div className="absolute inset-0" style={{ perspective: 2400 }}>
              {/* RIGHT GATE */}
              <motion.div
                style={{
                  rotateY: rightRot,
                  transformOrigin: "100% 50%",
                  transformStyle: "preserve-3d",
                }}
                className="absolute right-0 top-0 w-1/2 h-full"
              >
                <GatePanel side="right" shade={rightShade} medallionOpacity={medallionOpacity} medallionScale={medallionScale} />
              </motion.div>
            </div>
          </motion.div>

          {/* center crease shadow (fades when gates open) */}
          <motion.div
            style={{ opacity: useTransform(p, [0.15, 0.35], [0.5, 0]) }}
            className="absolute left-1/2 top-[4%] bottom-[4%] w-[2px] -translate-x-1/2 z-20 pointer-events-none"
          >
            <div className="w-full h-full bg-gradient-to-b from-transparent via-royal-deep/40 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Final caption */}
        <motion.div
          style={{ opacity: captionOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        >
          <Ornament />
          <p className="mt-4 font-sans-clean tracking-luxury text-[10px] uppercase text-gold-bright">
            With love &amp; blessings
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ---------- GATE PANEL (outer cover half) ---------- */
const GatePanel = ({
  side,
  shade,
  medallionOpacity,
  medallionScale,
}: {
  side: "left" | "right";
  shade: MotionValue<number>;
  medallionOpacity: MotionValue<number>;
  medallionScale: MotionValue<number>;
}) => {
  const brightness = useTransform(shade, (v) => `brightness(${v})`);

  return (
    <motion.div
      style={{ filter: brightness, backfaceVisibility: "hidden" }}
      className="relative w-full h-full overflow-hidden"
    >
      {/* Paper base — light cream with subtle floral emboss */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--cream-soft)) 0%, hsl(var(--cream)) 45%, hsl(var(--cream-deep)) 100%)",
        }}
      />
      {/* floral emboss pattern */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 30%, hsl(var(--gold-deep) / 0.35) 1.5px, transparent 2px), radial-gradient(circle at 75% 70%, hsl(var(--gold-deep) / 0.25) 1.5px, transparent 2px), radial-gradient(circle at 50% 50%, hsl(var(--gold-deep) / 0.2) 1px, transparent 1.5px)",
          backgroundSize: "80px 80px, 60px 60px, 40px 40px",
        }}
      />
      {/* inner frame */}
      <div className="absolute inset-4 border border-gold/40" />
      <div className="absolute inset-5 border border-gold/20" />

      {/* Eucalyptus / roses corner accents — SVG flourish */}
      {side === "left" && <CornerFlourish className="absolute -top-2 -left-2 w-40 h-40" />}
      {side === "right" && (
        <CornerFlourish className="absolute -bottom-2 -right-2 w-40 h-40 rotate-180" />
      )}

      {/* CENTER MEDALLIONS — only show across the spine; each panel renders its half */}
      {/* Top medallion (Vinayaka) */}
      <motion.div
        style={{ opacity: medallionOpacity, scale: medallionScale }}
        className={`absolute top-[18%] h-[32%] aspect-square z-10 ${
          side === "left" ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            clipPath: side === "left" ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
          }}
        >
          <Medallion>
            <GaneshIcon />
          </Medallion>
        </div>
      </motion.div>

      {/* Bottom plaque "Wedding Invitation" */}
      <motion.div
        style={{ opacity: medallionOpacity, scale: medallionScale }}
        className={`absolute bottom-[14%] h-[10%] w-[60%] z-10 ${
          side === "left" ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            clipPath: side === "left" ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
          }}
        >
          <Plaque />
        </div>
      </motion.div>

      {/* directional edge lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            side === "left"
              ? "linear-gradient(90deg, hsl(var(--royal-deep) / 0.15) 0%, transparent 25%, transparent 92%, hsl(var(--royal-deep) / 0.35) 100%)"
              : "linear-gradient(90deg, hsl(var(--royal-deep) / 0.35) 0%, transparent 8%, transparent 75%, hsl(var(--royal-deep) / 0.15) 100%)",
        }}
      />
    </motion.div>
  );
};

/* ---------- DECORATIVE BITS ---------- */
const Medallion = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full h-full">
    {/* Ornate outer flower shape */}
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-gold-deep">
      <defs>
        <radialGradient id="medBg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="hsl(var(--cream))" />
          <stop offset="100%" stopColor="hsl(var(--cream-deep))" />
        </radialGradient>
      </defs>
      {/* scalloped frame */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 12;
        const x = 100 + Math.cos(a) * 88;
        const y = 100 + Math.sin(a) * 88;
        return <circle key={i} cx={x} cy={y} r="16" fill="url(#medBg)" stroke="currentColor" strokeWidth="0.8" />;
      })}
      <circle cx="100" cy="100" r="78" fill="url(#medBg)" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="68" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
      <circle cx="100" cy="100" r="56" fill="hsl(var(--cream-soft))" stroke="currentColor" strokeWidth="0.6" />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">{children}</div>
  </div>
);

const GaneshIcon = () => (
  <svg viewBox="0 0 64 64" className="w-[38%] h-[38%] text-gold-deep drop-shadow">
    <path
      d="M32 8c4 0 7 3 7 7 0 2-1 3-2 4 3 1 6 3 7 7 1 3 0 6-2 8l3 5c1 2 0 4-2 5l-4 1-1 4c-1 3-4 5-7 5h-4c-3 0-5-1-6-4l-1-5-5-2c-2-1-3-3-2-5l3-5c-2-2-3-5-2-8 1-4 4-6 7-7-1-1-2-2-2-4 0-4 3-7 7-7z"
      fill="currentColor"
      fillOpacity="0.85"
    />
    <circle cx="27" cy="22" r="1.5" fill="hsl(var(--cream))" />
    <circle cx="37" cy="22" r="1.5" fill="hsl(var(--cream))" />
  </svg>
);

const Plaque = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 300 60" className="absolute inset-0 w-full h-full text-gold-deep">
      <rect x="40" y="12" width="220" height="36" fill="hsl(var(--cream))" stroke="currentColor" strokeWidth="1" />
      <path d="M10 30 Q 25 10 40 30 Q 25 50 10 30 Z" fill="currentColor" fillOpacity="0.85" />
      <path d="M290 30 Q 275 10 260 30 Q 275 50 290 30 Z" fill="currentColor" fillOpacity="0.85" />
    </svg>
    <span className="relative font-display italic text-gold-deep text-[clamp(10px,1.6vw,18px)] tracking-[0.25em] uppercase">
      Wedding Invitation
    </span>
  </div>
);

const CornerFlourish = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 160 160" className={className} fill="none">
    {/* eucalyptus-ish stem with leaves */}
    <g stroke="hsl(var(--gold-deep))" strokeWidth="0.8" opacity="0.8">
      <path d="M10 20 Q 60 40 80 110" />
      <path d="M20 10 Q 50 60 110 80" />
    </g>
    {Array.from({ length: 14 }).map((_, i) => {
      const t = i / 13;
      const x = 10 + t * 70 + Math.sin(t * 6) * 10;
      const y = 20 + t * 90 + Math.cos(t * 5) * 6;
      const r = 6 + (i % 3) * 2;
      return (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={r}
          ry={r * 0.55}
          fill="hsl(120 20% 70% / 0.55)"
          stroke="hsl(120 25% 40% / 0.5)"
          strokeWidth="0.5"
          transform={`rotate(${i * 23} ${x} ${y})`}
        />
      );
    })}
    {/* roses */}
    {[
      { cx: 28, cy: 28, r: 14 },
      { cx: 55, cy: 18, r: 10 },
      { cx: 18, cy: 58, r: 11 },
    ].map((c, i) => (
      <g key={i}>
        <circle cx={c.cx} cy={c.cy} r={c.r} fill="hsl(40 30% 96%)" stroke="hsl(40 25% 75%)" strokeWidth="0.6" />
        <circle cx={c.cx} cy={c.cy} r={c.r * 0.6} fill="none" stroke="hsl(40 25% 70%)" strokeWidth="0.5" />
        <circle cx={c.cx} cy={c.cy} r={c.r * 0.3} fill="none" stroke="hsl(40 25% 65%)" strokeWidth="0.5" />
      </g>
    ))}
  </svg>
);

const Sparkles = () => (
  <div className="absolute inset-0 opacity-50 pointer-events-none">
    {Array.from({ length: 40 }).map((_, i) => (
      <span
        key={i}
        className="absolute w-1 h-1 rounded-full bg-gold-bright"
        style={{
          top: `${(i * 37) % 100}%`,
          left: `${(i * 71) % 100}%`,
          opacity: 0.2 + ((i * 13) % 70) / 100,
          transform: `scale(${0.4 + ((i * 7) % 10) / 10})`,
        }}
      />
    ))}
  </div>
);

/* ---------- INNER INVITATION PAGE ---------- */
const InnerInvitation = () => (
  <div
    className="relative w-full h-full overflow-hidden shadow-elegant"
    style={{
      background:
        "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(var(--cream-soft)) 50%, hsl(var(--cream-deep)) 100%)",
    }}
  >
    {/* premium paper texture */}
    <div
      className="absolute inset-0 opacity-[0.25] mix-blend-multiply"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 25%, hsl(120 20% 55% / 0.15) 2px, transparent 3px), radial-gradient(circle at 80% 75%, hsl(40 35% 55% / 0.12) 2px, transparent 3px), radial-gradient(circle at 50% 50%, hsl(var(--gold-deep) / 0.08) 1px, transparent 2px)",
        backgroundSize: "120px 120px, 90px 90px, 30px 30px",
      }}
    />
    {/* corner flourishes */}
    <CornerFlourish className="absolute -top-3 -left-3 w-36 h-36 opacity-80" />
    <CornerFlourish className="absolute -bottom-3 -right-3 w-36 h-36 rotate-180 opacity-80" />

    {/* double frame */}
    <div className="absolute inset-5 border border-gold/50" />
    <div className="absolute inset-[26px] border border-gold/25" />

    <div className="relative h-full flex flex-col items-center justify-center px-[8%] py-[6%] text-center text-royal">
      <GaneshIcon />
      <h3 className="mt-3 font-display italic text-[clamp(18px,2.8vw,32px)] gradient-gold-text leading-none">
        {INVITE.heading}
      </h3>
      <Ornament className="my-3 scale-75" />

      <p className="font-serif-soft italic text-[clamp(10px,1.4vw,15px)] text-royal/75 leading-snug max-w-[88%]">
        {INVITE.subheading}
      </p>

      <p className="mt-3 font-display text-[clamp(16px,2.4vw,26px)] leading-tight">
        {INVITE.groom}
      </p>
      <p className="font-serif-soft italic text-[clamp(10px,1.2vw,14px)] text-royal/60 my-0.5">
        {INVITE.with}
      </p>
      <p className="font-display text-[clamp(16px,2.4vw,26px)] leading-tight">
        {INVITE.bride}
      </p>
      <p className="font-serif-soft text-[clamp(9px,1.05vw,12px)] text-royal/55 mt-1 leading-snug max-w-[90%]">
        {INVITE.brideParents}
      </p>

      <div className="gold-divider w-2/3 my-3" />

      <p className="font-sans-clean tracking-[0.3em] text-[clamp(8px,0.9vw,10px)] uppercase text-gold-deep">
        {INVITE.muhurthamLabel}
      </p>
      <p className="mt-1 font-display text-[clamp(13px,1.8vw,20px)]">{INVITE.date}</p>
      <p className="font-serif-soft italic text-[clamp(10px,1.25vw,14px)] text-royal/70">
        {INVITE.time}
      </p>

      <div className="mt-3 px-4 py-2 border border-gold/50">
        <p className="font-sans-clean tracking-[0.3em] text-[clamp(8px,0.9vw,10px)] uppercase text-gold-deep">
          {INVITE.venueLabel}
        </p>
        <p className="font-display text-[clamp(13px,1.8vw,20px)] leading-tight mt-0.5">
          {INVITE.venue}
        </p>
        <p className="font-serif-soft text-[clamp(9px,1.1vw,13px)] text-royal/65 leading-snug mt-0.5 max-w-[42ch] mx-auto">
          {INVITE.venueAddress}
        </p>
      </div>

      <p className="mt-3 font-sans-clean tracking-[0.3em] text-[clamp(8px,0.9vw,10px)] uppercase text-gold-deep">
        {INVITE.invitedBy}
      </p>
      <p className="font-serif-soft italic text-[clamp(10px,1.25vw,14px)] text-royal/80 max-w-[90%]">
        {INVITE.hosts}
      </p>

      <p className="mt-3 font-sans-clean tracking-[0.25em] text-[clamp(8px,0.85vw,10px)] uppercase text-royal/50">
        {INVITE.blessings}
      </p>
    </div>
  </div>
);
