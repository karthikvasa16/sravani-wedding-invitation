import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import couple from "@/assets/couple.jpg";
import { Ornament } from "./Ornament";

export const SlideCouple = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Ken Burns: slow zoom + drift
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.35]);
  const imgX = useTransform(scrollYProgress, [0, 1], ["-2%", "3%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["2%", "-4%"]);

  const textOpacity = useTransform(scrollYProgress, [0.3, 0.55, 0.8, 0.95], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.3, 0.55], [40, 0]);

  const sectionScale = useTransform(scrollYProgress, [0.7, 1], [1, 0.92]);
  const sectionOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-[180vh]">
      <motion.div
        style={{ scale: sectionScale, opacity: sectionOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden bg-royal-deep"
      >
        <motion.div
          style={{ scale: imgScale, x: imgX, y: imgY }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src={couple}
            alt="The Couple"
            width={1920}
            height={1080}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-royal-deep via-royal-deep/30 to-royal-deep/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_hsl(var(--royal-deep))_95%)]" />

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative h-full flex flex-col items-center justify-end pb-20 md:pb-32 text-cream text-center px-6"
        >
          <p className="font-sans-clean tracking-luxury text-[10px] uppercase text-gold-bright mb-6">
            Together, Forever
          </p>
          <h2 className="font-display text-6xl md:text-8xl leading-none">
            Viha <span className="italic gradient-gold-text">&</span> Pranay
          </h2>
          <Ornament className="mt-8" />
          <p className="mt-6 font-serif-soft italic text-xl md:text-2xl text-cream/80 max-w-xl">
            “Two souls, one journey — written in the stars, sealed by the divine.”
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
