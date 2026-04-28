import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";
import floralTL from "@/assets/floral-tl.png";
import floralBR from "@/assets/floral-br.png";
import damaskBg from "@/assets/damask-bg.jpg";
import ganeshaIcon from "@/assets/ganesha-icon.png";
import medallionTop from "@/assets/medallion-top.png";
import medallionBanner from "@/assets/medallion-banner.png";

/* ---------- EASY-TO-EDIT CONTENT ---------- */
const INVITE = {
  blessings: ["Shrirasthu", "Shubhamasthu", "Avighnamasthu"],
  heading: "Wedding Invitation",
  intro: "We solicit your gracious presence",
  intro2: "with family & friends on the auspicious occasion",
  intro3: "of the marriage of our elder son",
  groomPrefix: "Chi.",
  groom: "Pranay Chary",
  with: "with",
  bridePrefix: "Chi.La.Sow.",
  bride: "Viha (Sravani)",
  brideParents:
    "(Elder D/o. Smt. & Sri Ravuri Padhmavathi - Subrhamanya Veerabhadra Malleshwara Rao R/o. Chinthaparru)",
  muhurthamLabel: "Sumuhurtham",
  date: "On Wednesday, 06th May 2026",
  time: "at 10:49 a.m. \u201CKarkataka Lagnam\u201D",
  venueLabel: "Venue",
  venue: "P.S.R. Gardens",
  venueAddress: "Beside Kotak Mahendra Bank,\nVill. Muthangi, Mdl. Patancheru,\nSangareddy Dist.",
  invitedBy: "Invited By",
  hosts: ["Smt. Kolloju Uma Maheshwari", "Sri Kolloju Narsimha Chary"],
  closing: "With Best Compliments from : Near & Dear.",
};
/* ------------------------------------------ */

export const SlideEnvelope = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, { damping: 40, stiffness: 140, mass: 0.6 });

  // Card enters & settles
  const cardY = useTransform(p, [0, 0.18], ["10%", "0%"]);
  const cardOpacity = useTransform(p, [0, 0.15], [0, 1]);
  const cardScale = useTransform(p, [0, 0.18], [0.9, 1]);

  // Gate rotation 0.28 - 0.72
  const leftRot = useTransform(p, [0.28, 0.72], [0, -168]);
  const rightRot = useTransform(p, [0.28, 0.72], [0, 168]);

  // Lighting on panels (front face brightness)
  const leftShade = useTransform(p, [0.28, 0.5, 0.72], [1, 0.62, 0.78]);
  const rightShade = useTransform(p, [0.28, 0.5, 0.72], [1, 0.62, 0.78]);

  // Inner reveal
  const innerOpacity = useTransform(p, [0.42, 0.7], [0, 1]);
  const innerScale = useTransform(p, [0.42, 0.85], [0.95, 1]);

  // Push gates fully aside
  const gatesX = useTransform(p, [0.72, 0.95], [0, 80]);
  const gatesOpacity = useTransform(p, [0.85, 0.98], [1, 0]);

  // Crease fade
  const creaseOpacity = useTransform(p, [0.15, 0.35], [0.55, 0]);

  // Final caption
  const captionOpacity = useTransform(p, [0.9, 1], [0, 1]);
  const promptOpacity = useTransform(p, [0, 0.1], [0.85, 0]);

  return (
    <section ref={ref} className="relative h-[360vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--royal-soft)) 0%, hsl(var(--royal-deep)) 70%)",
        }}
      >
        <Sparkles />

        {/* Scroll prompt */}
        <motion.p
          style={{ opacity: promptOpacity }}
          className="absolute top-10 left-1/2 -translate-x-1/2 font-sans-clean tracking-luxury text-[10px] uppercase text-gold-bright/80 z-30"
        >
          Scroll to open the invitation
        </motion.p>

        {/* Card stage */}
        <motion.div
          style={{
            y: cardY,
            opacity: cardOpacity,
            scale: cardScale,
            perspective: 2600,
          }}
          className="relative w-[90vw] max-w-[860px] aspect-[1.45/1] drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
        >
          {/* INNER PAGE (revealed behind gates) */}
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
            <div className="absolute inset-0" style={{ perspective: 2600 }}>
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

          <motion.div
            style={{ x: gatesX, opacity: gatesOpacity }}
            className="absolute inset-0 z-10"
          >
            <div className="absolute inset-0" style={{ perspective: 2600 }}>
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

          {/* center crease shadow */}
          <motion.div
            style={{ opacity: creaseOpacity }}
            className="absolute left-1/2 top-[3%] bottom-[3%] w-[3px] -translate-x-1/2 z-20 pointer-events-none"
          >
            <div className="w-full h-full bg-gradient-to-b from-transparent via-black/40 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Final caption */}
        <motion.div
          style={{ opacity: captionOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center z-30"
        >
          <p className="font-display italic text-gold-bright text-lg">
            With love &amp; blessings
          </p>
          <p className="mt-1 font-sans-clean tracking-luxury text-[10px] uppercase text-gold-bright/70">
            Pranay &amp; Viha
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
}: {
  side: "left" | "right";
  shade: MotionValue<number>;
}) => {
  const brightness = useTransform(shade, (v) => `brightness(${v})`);
  const isLeft = side === "left";

  return (
    <motion.div
      style={{ filter: brightness, backfaceVisibility: "hidden" }}
      className="relative w-full h-full overflow-hidden"
    >
      {/* Cream paper base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(40 38% 97%) 0%, hsl(38 28% 92%) 50%, hsl(36 22% 86%) 100%)",
        }}
      />
      {/* damask floral pattern background */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-multiply"
        style={{
          backgroundImage: `url(${damaskBg})`,
          backgroundSize: "cover",
          backgroundPosition: isLeft ? "left center" : "right center",
        }}
      />

      {/* double inner frame */}
      <div className="absolute inset-[14px] border border-stone-300/70" />
      <div className="absolute inset-[18px] border border-stone-200/50" />

      {/* Floral corners — only on outer corners of each panel */}
      {isLeft ? (
        <img
          src={floralTL}
          alt=""
          className="absolute top-0 left-0 w-[55%] pointer-events-none select-none"
        />
      ) : (
        <img
          src={floralBR}
          alt=""
          className="absolute bottom-0 right-0 w-[55%] pointer-events-none select-none"
        />
      )}

      {/* CENTER MEDALLIONS — clipped to half so each panel shows its side */}
      {/* Top: Ganesha medallion */}
      <div
        className={`absolute top-[14%] ${isLeft ? "right-0" : "left-0"} h-[42%] aspect-square ${
          isLeft ? "translate-x-1/2" : "-translate-x-1/2"
        } z-10 pointer-events-none`}
      >
        <div
          className="relative w-full h-full"
          style={{ clipPath: isLeft ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)" }}
        >
          <img
            src={medallionTop}
            alt=""
            className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(80,60,30,0.25)]"
          />
          <img
            src={ganeshaIcon}
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34%] h-[34%] object-contain"
          />
        </div>
      </div>

      {/* Bottom: Wedding Invitation banner */}
      <div
        className={`absolute bottom-[12%] ${isLeft ? "right-0" : "left-0"} h-[14%] w-[58%] ${
          isLeft ? "translate-x-1/2" : "-translate-x-1/2"
        } z-10 pointer-events-none`}
      >
        <div
          className="relative w-full h-full"
          style={{ clipPath: isLeft ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)" }}
        >
          <img
            src={medallionBanner}
            alt=""
            className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_3px_6px_rgba(80,60,30,0.25)]"
          />
        </div>
      </div>

      {/* directional edge lighting (spine vs outer edge) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isLeft
            ? "linear-gradient(90deg, rgba(255,255,255,0.25) 0%, transparent 18%, transparent 80%, rgba(0,0,0,0.35) 100%)"
            : "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, transparent 20%, transparent 82%, rgba(255,255,255,0.25) 100%)",
        }}
      />
    </motion.div>
  );
};

/* ---------- INNER INVITATION PAGE ---------- */
const InnerInvitation = () => (
  <div
    className="relative w-full h-full overflow-hidden shadow-elegant"
    style={{
      background:
        "linear-gradient(180deg, hsl(40 35% 96%) 0%, hsl(38 28% 93%) 50%, hsl(36 22% 88%) 100%)",
    }}
  >
    {/* damask pattern */}
    <div
      className="absolute inset-0 opacity-25 mix-blend-multiply"
      style={{
        backgroundImage: `url(${damaskBg})`,
        backgroundSize: "cover",
      }}
    />
    {/* paper texture grain */}
    <div
      className="absolute inset-0 opacity-[0.18] mix-blend-multiply pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle at 30% 20%, hsl(var(--gold-deep)/0.15) 1px, transparent 2px), radial-gradient(circle at 70% 80%, hsl(var(--gold-deep)/0.1) 1px, transparent 2px)",
        backgroundSize: "40px 40px, 30px 30px",
      }}
    />

    {/* Center crease line */}
    <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-stone-400/30 z-20 pointer-events-none" />

    {/* Floral corners */}
    <img src={floralTL} alt="" className="absolute top-0 left-0 w-[22%] pointer-events-none select-none z-10" />
    <img src={floralBR} alt="" className="absolute bottom-0 right-0 w-[22%] pointer-events-none select-none z-10" />

    {/* double frame */}
    <div className="absolute inset-[14px] border border-rose-900/30 z-10" />
    <div className="absolute inset-[18px] border border-rose-900/15 z-10" />

    {/* Content - matches reference card exactly */}
    <div className="relative z-20 h-full w-full px-[6%] py-[4%] flex flex-col items-center text-center"
      style={{ color: "hsl(345 55% 28%)" /* deep maroon ink like the reference */ }}
    >
      {/* Top blessings row */}
      <div className="flex w-full justify-around max-w-[78%] mt-1">
        {INVITE.blessings.map((b) => (
          <span key={b} className="font-serif-soft italic text-[clamp(9px,1.05vw,13px)] tracking-wide">
            {b}
          </span>
        ))}
      </div>

      {/* Ganesha icon */}
      <img
        src={ganeshaIcon}
        alt="Ganesha"
        className="mt-2 h-[10%] object-contain"
        style={{ filter: "sepia(1) hue-rotate(-25deg) saturate(2)" }}
      />

      {/* Heading */}
      <h3 className="mt-1 font-display italic text-[clamp(20px,2.6vw,30px)] leading-none">
        {INVITE.heading}
      </h3>

      {/* Intro */}
      <p className="mt-2 font-serif-soft italic text-[clamp(10px,1.15vw,14px)] leading-tight">
        {INVITE.intro}
      </p>
      <p className="font-serif-soft italic text-[clamp(10px,1.15vw,14px)] leading-tight">
        {INVITE.intro2}
      </p>
      <p className="font-serif-soft italic text-[clamp(10px,1.15vw,14px)] leading-tight">
        {INVITE.intro3}
      </p>

      {/* Names */}
      <p className="mt-2 font-display text-[clamp(15px,2vw,22px)] leading-tight">
        <span className="text-[0.75em] mr-1">{INVITE.groomPrefix}</span>
        <span className="italic font-semibold">{INVITE.groom}</span>
      </p>
      <p className="font-serif-soft italic text-[clamp(10px,1.1vw,13px)] my-0.5 opacity-80">
        {INVITE.with}
      </p>
      <p className="font-display text-[clamp(15px,2vw,22px)] leading-tight">
        <span className="text-[0.7em] mr-1">{INVITE.bridePrefix}</span>
        <span className="italic font-semibold">{INVITE.bride}</span>
      </p>
      <p className="font-serif-soft text-[clamp(8px,0.95vw,11px)] opacity-75 leading-snug max-w-[88%] mt-1">
        {INVITE.brideParents}
      </p>

      {/* Sumuhurtham */}
      <p className="mt-2 font-display italic text-[clamp(13px,1.7vw,18px)]">
        {INVITE.muhurthamLabel} :
      </p>
      <p className="font-serif-soft italic text-[clamp(10px,1.2vw,14px)] leading-tight">
        {INVITE.date}
      </p>
      <p className="font-serif-soft italic text-[clamp(10px,1.2vw,14px)] leading-tight">
        {INVITE.time}
      </p>

      {/* Venue box */}
      <div className="mt-2 px-4 py-1.5 border border-rose-900/40 max-w-[80%]">
        <p className="font-display italic text-[clamp(12px,1.5vw,17px)] leading-tight">
          {INVITE.venueLabel} :
        </p>
        <p className="font-display italic font-semibold text-[clamp(13px,1.7vw,19px)] leading-tight">
          {INVITE.venue}
        </p>
        <p className="font-serif-soft italic text-[clamp(9px,1.05vw,12px)] leading-tight whitespace-pre-line opacity-85">
          {INVITE.venueAddress}
        </p>
      </div>

      {/* Invited by */}
      <p className="mt-2 font-display italic text-[clamp(11px,1.35vw,15px)]">
        {INVITE.invitedBy} :
      </p>
      {INVITE.hosts.map((h) => (
        <p key={h} className="font-display italic text-[clamp(11px,1.4vw,16px)] leading-tight">
          {h}
        </p>
      ))}

      {/* Closing */}
      <p className="mt-auto mb-1 font-serif-soft italic text-[clamp(8px,0.95vw,11px)] opacity-70">
        {INVITE.closing}
      </p>
    </div>
  </div>
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
