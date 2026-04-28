import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Ornament } from "./Ornament";
import vinayaka from "@/assets/vinayaka.png";

export const SlideIntro = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.4, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section ref={ref} className="relative h-[100vh]">
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          scale, opacity, y,
          background: "linear-gradient(160deg, hsl(40 38% 97%) 0%, hsl(38 30% 93%) 40%, hsl(36 25% 89%) 100%)",
        }}
      >
        {/* Animated mandala rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="animate-mandala-slow opacity-[0.06]">
            <MandalaRing size={700} />
          </div>
          <div className="absolute animate-mandala-medium opacity-[0.04]">
            <MandalaRing size={480} />
          </div>
        </div>

        {/* Gold floating particles */}
        <GoldParticles />

        {/* Corner ornaments */}
        <CornerOrnaments />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-sans-clean tracking-luxury text-[10px] sm:text-xs md:text-sm lg:text-base 2xl:text-xl uppercase text-royal/60 mb-[3vh] relative z-10"
        >
          ॥ Shubh Vivah ॥
        </motion.p>

        {/* 3D Vinayaka */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
          style={{
            transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.4s ease",
          }}
        >
          {/* Glow ring behind Vinayaka */}
          <div
            className="absolute inset-[-20px] rounded-full animate-gold-glow pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(42 70% 65% / 0.18) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full animate-pulse-ring pointer-events-none"
            style={{
              border: "1px solid hsl(38 55% 58% / 0.3)",
              borderRadius: "50%",
              transform: "scale(1.15)",
            }}
          />
          <img
            src={vinayaka}
            alt="Lord Vinayaka"
            width={400}
            height={400}
            className="w-[200px] sm:w-[260px] md:w-[380px] lg:w-[480px] 2xl:w-[640px] max-w-[40vh] max-h-[40vh] h-auto object-contain animate-breathe select-none drop-shadow-[0_8px_30px_hsl(38_55%_58%/0.4)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-[4vh] text-center relative z-10"
        >
          <p className="font-display italic text-base sm:text-lg md:text-2xl lg:text-3xl 2xl:text-5xl text-royal/80 max-w-[90vw] px-6 leading-relaxed">
            Vakratunda Mahakaya
            <br />
            Suryakoti Samaprabha
          </p>
          <Ornament className="mt-[3vh] lg:scale-125 2xl:scale-150 origin-top" />
          <p className="mt-[3vh] font-sans-clean tracking-[0.4em] text-[10px] sm:text-xs lg:text-sm 2xl:text-base uppercase text-royal/50">
            Scroll to begin
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

const MandalaRing = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="text-gold">
    {Array.from({ length: 12 }).map((_, i) => (
      <g key={i} transform={`rotate(${i * 30}, 50, 50)`}>
        <ellipse cx="50" cy="20" rx="3" ry="8" stroke="currentColor" strokeWidth="0.3" fill="none" />
        <circle cx="50" cy="12" r="1.5" fill="currentColor" fillOpacity="0.4" />
      </g>
    ))}
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.4" fill="none" />
    <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="0.2" fill="none" />
    {Array.from({ length: 8 }).map((_, i) => (
      <g key={i} transform={`rotate(${i * 45}, 50, 50)`}>
        <line x1="50" y1="22" x2="50" y2="28" stroke="currentColor" strokeWidth="0.5" />
      </g>
    ))}
  </svg>
);

const GoldParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 18 }).map((_, i) => (
      <span
        key={i}
        className="absolute w-1 h-1 rounded-full animate-float-petal"
        style={{
          bottom: `-${(i * 7) % 20}%`,
          left: `${(i * 19 + 5) % 100}%`,
          background: `hsl(${38 + (i % 6) * 4} ${60 + (i % 4) * 5}% ${55 + (i % 5) * 4}%)`,
          "--duration": `${7 + (i % 5) * 2}s`,
          "--delay": `${(i * 0.7) % 5}s`,
          "--drift-x": `${(i % 2 === 0 ? 1 : -1) * (20 + (i * 11) % 40)}px`,
          "--spin": `${(i % 2 === 0 ? 1 : -1) * (180 + (i * 37) % 200)}deg`,
          width: `${3 + (i % 3) * 2}px`,
          height: `${3 + (i % 3) * 2}px`,
          opacity: 0,
        } as React.CSSProperties}
      />
    ))}
  </div>
);

const CornerOrnaments = () => (
  <>
    {[
      "top-6 left-6 rotate-0",
      "top-6 right-6 rotate-90",
      "bottom-6 right-6 rotate-180",
      "bottom-6 left-6 -rotate-90",
    ].map((pos) => (
      <svg
        key={pos}
        className={`absolute ${pos} w-16 h-16 md:w-20 md:h-20 text-gold/50`}
        viewBox="0 0 80 80"
        fill="none"
      >
        <path
          d="M5 5 L40 5 M5 5 L5 40 M5 5 Q25 5 25 25 Q25 5 45 5"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle cx="5" cy="5" r="2" fill="currentColor" />
      </svg>
    ))}
  </>
);
