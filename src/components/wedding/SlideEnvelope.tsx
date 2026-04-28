import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Ornament } from "./Ornament";

export const SlideEnvelope = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 120, mass: 0.6 });

  // Envelope appears + lifts
  const envScale = useTransform(smooth, [0, 0.25, 0.55], [0.7, 1, 1]);
  const envOpacity = useTransform(smooth, [0, 0.2], [0, 1]);

  // Flap opens (rotateX) between 0.35 - 0.55
  const flapRotate = useTransform(smooth, [0.35, 0.58], [0, -180]);

  // Card slides up & out between 0.55 - 0.85
  const cardY = useTransform(smooth, [0.55, 0.88], ["0%", "-78%"]);
  const cardScale = useTransform(smooth, [0.55, 0.88], [0.95, 1.05]);
  const cardOpacity = useTransform(smooth, [0.5, 0.6], [0, 1]);

  // Envelope sinks slightly behind once card is out
  const envBodyY = useTransform(smooth, [0.7, 0.95], ["0%", "8%"]);

  // Final caption
  const captionOpacity = useTransform(smooth, [0.85, 0.95], [0, 1]);
  const captionY = useTransform(smooth, [0.85, 0.95], [20, 0]);

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-royal-deep via-royal to-royal-deep flex items-center justify-center">
        {/* sparkle field */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold-bright"
              style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 71) % 100}%`,
                opacity: 0.3 + ((i * 13) % 70) / 100,
                transform: `scale(${0.5 + ((i * 7) % 10) / 10})`,
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ scale: envScale, opacity: envOpacity }}
          className="relative w-[88vw] max-w-[480px] aspect-[3/2] perspective-1200"
        >
          {/* INVITATION CARD (rendered behind, rises up) */}
          <motion.div
            style={{ y: cardY, scale: cardScale, opacity: cardOpacity }}
            className="absolute inset-x-3 top-3 bottom-3 z-10"
          >
            <InvitationCard />
          </motion.div>

          {/* ENVELOPE BODY (front pocket) — z above card so card emerges from inside */}
          <motion.div style={{ y: envBodyY }} className="absolute inset-0 preserve-3d">
            {/* back of envelope */}
            <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-cream to-cream-deep shadow-envelope" />

            {/* FLAP — anchored to top, rotates open */}
            <motion.div
              style={{ rotateX: flapRotate, transformOrigin: "50% 0%" }}
              className="absolute inset-x-0 top-0 h-1/2 z-30 backface-hidden"
            >
              <div
                className="w-full h-full"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(var(--cream-soft)) 0%, hsl(var(--cream-deep)) 100%)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  filter: "drop-shadow(0 4px 6px hsl(var(--royal-deep) / 0.3))",
                }}
              />
              {/* wax seal */}
              <div className="absolute left-1/2 top-[78%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold-bright to-gold-deep shadow-gold flex items-center justify-center">
                <span className="font-display text-cream text-2xl md:text-3xl italic">V&amp;P</span>
              </div>
            </motion.div>

            {/* FRONT POCKET — the lower triangle/pocket that hides the card */}
            <div
              className="absolute inset-x-0 bottom-0 h-[62%] z-20"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(var(--cream-deep)) 100%)",
                clipPath: "polygon(0 38%, 50% 0, 100% 38%, 100% 100%, 0 100%)",
                boxShadow: "inset 0 8px 20px hsl(var(--royal-deep) / 0.15)",
              }}
            >
              {/* gold border accents */}
              <div className="absolute inset-3 border border-gold/50 pointer-events-none"
                style={{ clipPath: "polygon(0 28%, 50% 0, 100% 28%, 100% 100%, 0 100%)" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Final caption */}
        <motion.p
          style={{ opacity: captionOpacity, y: captionY }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-sans-clean tracking-luxury text-[10px] uppercase text-gold-bright"
        >
          With love & blessings
        </motion.p>
      </div>
    </section>
  );
};

const InvitationCard = () => (
  <div className="relative w-full h-full bg-gradient-to-b from-cream to-cream-soft shadow-elegant overflow-hidden">
    <div className="absolute inset-2 border border-gold/70" />
    <div className="absolute inset-3.5 border border-gold/30" />

    <div className="relative h-full flex flex-col items-center justify-center text-royal text-center px-6 py-5">
      <p className="font-sans-clean tracking-luxury text-[8px] md:text-[10px] uppercase text-gold-deep">
        You are invited
      </p>
      <Ornament className="my-2 scale-75" />
      <h3 className="font-display text-2xl md:text-4xl leading-none">
        Viha <span className="italic gradient-gold-text">&</span> Pranay
      </h3>
      <p className="mt-2 font-serif-soft italic text-xs md:text-sm text-royal/70">
        request the honour of your presence
      </p>

      <div className="mt-3 flex items-center gap-3 md:gap-4">
        <div className="text-right">
          <p className="font-display text-base md:text-xl leading-none">Wed</p>
          <p className="font-sans-clean text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-royal/60 mt-1">
            May
          </p>
        </div>
        <div className="w-px h-10 bg-gold/50" />
        <div className="font-display text-3xl md:text-5xl gradient-gold-text leading-none">
          6
        </div>
        <div className="w-px h-10 bg-gold/50" />
        <div className="text-left">
          <p className="font-display text-base md:text-xl leading-none">2026</p>
          <p className="font-sans-clean text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-royal/60 mt-1">
            10:29 AM
          </p>
        </div>
      </div>

      <div className="gold-divider w-3/4 my-3" />

      <p className="font-serif-soft text-xs md:text-sm text-royal/80 leading-snug">
        P.S.R. Gardens
        <br />
        <span className="text-royal/60">Muthangi, Hyderabad, Telangana</span>
      </p>

      <button
        type="button"
        className="mt-3 px-5 py-1.5 md:px-6 md:py-2 bg-royal text-cream font-sans-clean tracking-[0.3em] text-[9px] md:text-[10px] uppercase hover:bg-gold-deep transition-colors duration-500 border border-gold/40"
      >
        RSVP
      </button>
    </div>
  </div>
);
