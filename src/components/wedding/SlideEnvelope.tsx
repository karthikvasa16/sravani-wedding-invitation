import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";
import damaskBg from "@/assets/damask-bg.jpg";
import floralTL from "@/assets/floral-tl.png";
import floralBR from "@/assets/floral-br.png";
import medallionTop from "@/assets/medallion-top.png";
import medallionBanner from "@/assets/medallion-banner.png";
import ganeshaIcon from "@/assets/ganesha-icon.png";

/**
 * Slide 5 — The Grand Reveal
 * A hyper-realistic wedding card booklet that bifurcates vertically
 * down a center crease. Left & right panels swing outward like doors
 * (perspective transform) revealing the inner invitation text.
 */
export const SlideEnvelope = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const p = useSpring(scrollYProgress, { damping: 35, stiffness: 140, mass: 0.6 });

  // Card zooms in & settles
  const cardScale = useTransform(p, [0, 0.2, 0.45], [0.82, 1, 1]);
  const cardOpacity = useTransform(p, [0, 0.15], [0, 1]);

  // Doors open between 0.45 → 0.8
  const leftRotate = useTransform(p, [0.45, 0.85], [0, -165]);
  const rightRotate = useTransform(p, [0.45, 0.85], [0, 165]);
  const panelShadow = useTransform(p, [0.45, 0.85], [0.5, 0.15]);

  // Seal dissolves as doors crack open
  const sealOpacity = useTransform(p, [0.45, 0.58], [1, 0]);
  const sealScale = useTransform(p, [0.45, 0.58], [1, 1.15]);

  // Inner invitation fades in
  const innerOpacity = useTransform(p, [0.55, 0.8], [0, 1]);
  const innerScale = useTransform(p, [0.55, 0.9], [0.92, 1]);

  // Final caption
  const capOpacity = useTransform(p, [0.88, 0.98], [0, 1]);

  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-royal-deep via-royal to-royal-deep flex items-center justify-center">
        {/* ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--gold) / 0.18) 0%, transparent 55%)",
          }}
        />
        {/* sparkle field */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold-bright"
              style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 71) % 100}%`,
                opacity: 0.25 + ((i * 13) % 70) / 120,
              }}
            />
          ))}
        </div>

        {/* CARD STAGE */}
        <motion.div
          style={{
            scale: cardScale,
            opacity: cardOpacity,
            perspective: 2200,
          }}
          className="relative w-[88vw] max-w-[560px] aspect-[3/4]"
        >
          {/* INNER INVITATION — revealed behind doors */}
          <motion.div
            style={{ opacity: innerOpacity, scale: innerScale }}
            className="absolute inset-0"
          >
            <InnerInvitation />
          </motion.div>

          {/* LEFT DOOR */}
          <Panel
            side="left"
            rotate={leftRotate}
            shadow={panelShadow}
            sealOpacity={sealOpacity}
            sealScale={sealScale}
          />
          {/* RIGHT DOOR */}
          <Panel
            side="right"
            rotate={rightRotate}
            shadow={panelShadow}
            sealOpacity={sealOpacity}
            sealScale={sealScale}
          />
        </motion.div>

        {/* caption */}
        <motion.p
          style={{ opacity: capOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sans-clean tracking-luxury text-[10px] uppercase text-gold-bright"
        >
          With love & blessings
        </motion.p>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- */
/* One side of the bifurcating card.                                 */
/* Each panel shows HALF of the full card face via clipped          */
/* background-image, so together they form a seamless whole when    */
/* closed and break cleanly down the crease when opening.           */
/* ---------------------------------------------------------------- */

interface PanelProps {
  side: "left" | "right";
  rotate: MotionValue<number>;
  shadow: MotionValue<number>;
  sealOpacity: MotionValue<number>;
  sealScale: MotionValue<number>;
}

const Panel = ({ side, rotate, shadow, sealOpacity, sealScale }: PanelProps) => {
  const isLeft = side === "left";
  const boxShadow = useTransform(
    shadow,
    (v) =>
      `0 ${isLeft ? "30px" : "30px"} 60px -20px hsl(226 70% 8% / ${v}), inset ${
        isLeft ? "-" : ""
      }2px 0 0 hsl(var(--gold) / 0.25)`
  );

  return (
    <motion.div
      style={{
        rotateY: rotate,
        transformOrigin: isLeft ? "left center" : "right center",
        boxShadow,
        left: isLeft ? 0 : "50%",
      }}
      className="absolute top-0 h-full w-1/2 overflow-hidden will-change-transform"
    >
      {/* paper texture — damask tiled */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${damaskBg})`,
          backgroundSize: "120% auto",
          backgroundPosition: isLeft ? "left center" : "right center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* subtle paper warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream/30 via-transparent to-cream-deep/30" />

      {/* inner bevelled frame line */}
      <div
        className="absolute inset-4 border border-[hsl(36_20%_70%)]"
        style={{
          clipPath: isLeft
            ? "inset(0 0 0 0)"
            : "inset(0 0 0 0)",
        }}
      />

      {/* corner floral — only on the relevant corner */}
      {isLeft ? (
        <img
          src={floralTL}
          alt=""
          aria-hidden
          className="absolute top-0 left-0 w-[115%] max-w-none select-none pointer-events-none"
          style={{ transform: "translate(-2%, -4%)" }}
        />
      ) : (
        <img
          src={floralBR}
          alt=""
          aria-hidden
          className="absolute bottom-0 right-0 w-[115%] max-w-none select-none pointer-events-none"
          style={{ transform: "translate(2%, 4%)" }}
        />
      )}

      {/* faint crease shadow on the inner edge (center of whole card) */}
      <div
        className={`absolute top-0 bottom-0 w-6 ${
          isLeft ? "right-0" : "left-0"
        } pointer-events-none`}
        style={{
          background: isLeft
            ? "linear-gradient(90deg, transparent, hsl(36 25% 55% / 0.35))"
            : "linear-gradient(-90deg, transparent, hsl(36 25% 55% / 0.35))",
        }}
      />

      {/* HALF OF THE SEAL (medallion + banner) sitting on the closed crease */}
      <motion.div
        style={{ opacity: sealOpacity, scale: sealScale }}
        className={`absolute top-0 h-full pointer-events-none ${
          isLeft ? "right-0" : "left-0"
        }`}
        aria-hidden
      >
        {/* top medallion half */}
        <div
          className={`absolute ${isLeft ? "right-0" : "left-0"}`}
          style={{
            top: "22%",
            width: "180px",
            height: "180px",
            transform: isLeft ? "translateX(50%)" : "translateX(-50%)",
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              clipPath: isLeft ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
            }}
          >
            <img
              src={medallionTop}
              alt=""
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                filter: "drop-shadow(0 4px 8px hsl(226 70% 11% / 0.25))",
              }}
            />
            {/* Ganesha sits in the medallion's empty center */}
            <img
              src={ganeshaIcon}
              alt=""
              className="absolute left-1/2 top-1/2 w-[46%] h-[46%] object-contain -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        {/* lower banner half */}
        <div
          className={`absolute ${isLeft ? "right-0" : "left-0"}`}
          style={{
            top: "60%",
            width: "220px",
            height: "90px",
            transform: isLeft ? "translateX(50%)" : "translateX(-50%)",
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              clipPath: isLeft ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
            }}
          >
            <img
              src={medallionBanner}
              alt=""
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                filter: "drop-shadow(0 3px 6px hsl(226 70% 11% / 0.25))",
              }}
            />
            {/* "WEDDING INVITATION" text — half on each side */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.22em",
                color: "hsl(25 45% 22%)",
              }}
            >
              WEDDING INVITATION
            </div>
          </div>
        </div>
      </motion.div>

      {/* back face tint (visible when door swings past 90°) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "hsl(36 25% 80%)",
          opacity: 0,
          transform: "translateZ(-1px)",
        }}
      />
    </motion.div>
  );
};

/* ---------------------------------------------------------------- */
/* Inner invitation revealed behind the doors                        */
/* ---------------------------------------------------------------- */

const InnerInvitation = () => (
  <div
    className="relative w-full h-full overflow-hidden"
    style={{
      backgroundImage: `url(${damaskBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-cream-deep/40" />
    <div className="absolute inset-4 border border-[hsl(36_30%_60%)]" />
    <div className="absolute inset-5 border border-[hsl(36_30%_70%)]" />

    <div className="relative h-full flex flex-col items-center justify-center text-center px-8 py-10"
      style={{ color: "hsl(25 45% 22%)" }}
    >
      <p className="font-sans-clean tracking-luxury text-[9px] uppercase text-gold-deep">
        Together with their families
      </p>
      <div className="gold-divider w-24 my-4" />
      <h3 className="font-display text-4xl md:text-6xl leading-none">
        Aarav
      </h3>
      <p className="font-display italic text-2xl md:text-3xl my-2 gradient-gold-text">
        &amp;
      </p>
      <h3 className="font-display text-4xl md:text-6xl leading-none">
        Ananya
      </h3>

      <p className="mt-5 font-serif-soft italic text-sm md:text-base opacity-80">
        request the honour of your presence
      </p>

      <div className="mt-6 flex items-center gap-3 md:gap-4">
        <div className="text-right">
          <p className="font-display text-base md:text-lg leading-none">Saturday</p>
          <p className="font-sans-clean text-[9px] tracking-[0.3em] uppercase opacity-70 mt-1">
            November
          </p>
        </div>
        <div className="w-px h-12 bg-[hsl(36_30%_55%)]" />
        <div className="font-display text-4xl md:text-6xl gradient-gold-text leading-none">
          22
        </div>
        <div className="w-px h-12 bg-[hsl(36_30%_55%)]" />
        <div className="text-left">
          <p className="font-display text-base md:text-lg leading-none">2026</p>
          <p className="font-sans-clean text-[9px] tracking-[0.3em] uppercase opacity-70 mt-1">
            6 PM
          </p>
        </div>
      </div>

      <div className="gold-divider w-40 my-5" />

      <p className="font-serif-soft text-sm md:text-base leading-snug">
        The Leela Palace
        <br />
        <span className="opacity-70">Bengaluru, India</span>
      </p>

      <button
        type="button"
        className="mt-6 px-6 py-2 bg-royal text-cream font-sans-clean tracking-[0.3em] text-[10px] uppercase hover:bg-gold-deep transition-colors duration-500 border border-gold/40"
      >
        RSVP
      </button>
    </div>
  </div>
);
