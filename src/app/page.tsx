"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Plugin registration is centralized in SmoothScroller.tsx

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  // SCENE 1
  const s1Section = useRef<HTMLDivElement>(null);
  const s1Inner = useRef<HTMLDivElement>(null);
  const s1Title = useRef<HTMLHeadingElement>(null);
  const s1Subtitle = useRef<HTMLParagraphElement>(null);
  const s1Eyebrow = useRef<HTMLParagraphElement>(null);
  const blob1 = useRef<SVGCircleElement>(null);
  const blob2 = useRef<SVGCircleElement>(null);
  const blob3 = useRef<SVGCircleElement>(null);

  // SCENE 2
  const s2Container = useRef<HTMLDivElement>(null);
  const s2Left = useRef<HTMLDivElement>(null);
  const s2Shapes = useRef<HTMLDivElement>(null);
  const s2Text1 = useRef<HTMLHeadingElement>(null);
  const s2Text2 = useRef<HTMLParagraphElement>(null);
  const s2Text3 = useRef<HTMLParagraphElement>(null);
  const s2Text4 = useRef<HTMLParagraphElement>(null);
  const s2Text5 = useRef<HTMLParagraphElement>(null);

  // SCENE 3
  const s3TopLayer = useRef<HTMLDivElement>(null);
  const s3Section = useRef<HTMLDivElement>(null);

  // SCENE 4
  const s4Container = useRef<HTMLDivElement>(null);
  const s4Wrapper = useRef<HTMLDivElement>(null);
  const s4CircleFill = useRef<SVGCircleElement>(null);
  const s4Text60 = useRef<HTMLSpanElement>(null);

  // SCENE 5
  const s5CupStroke = useRef<SVGPathElement>(null);
  const s5CupGroup = useRef<SVGGElement>(null);
  const s5Liquid = useRef<SVGPathElement>(null);

  // SCENE 6
  const s6Glyph = useRef<SVGGElement>(null);
  const s6Links = useRef<HTMLDivElement>(null);
  const s6Pulse = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!s3TopLayer.current || !s3Section.current) return;

    // Use GSAP quickSetter for tracking X-ray
    const setX = gsap.quickSetter(s3TopLayer.current, "--x", "px");
    const setY = gsap.quickSetter(s3TopLayer.current, "--y", "px");

    const updateMouse = (e: MouseEvent) => {
      const rect = s3Section.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setX(x);
      setY(y);
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  useGSAP(
    () => {
      // === SCENE 1 ===
      // Continuous morphing of blobs
      gsap.to(blob1.current, {
        x: 50,
        y: -50,
        scale: 1.1,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(blob2.current, {
        x: -60,
        y: 30,
        scale: 0.9,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(blob3.current, {
        x: 40,
        y: 70,
        scale: 1.2,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const tl1 = gsap.timeline();
      tl1
        .fromTo(
          s1Eyebrow.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", delay: 0.5 },
        )
        .to(s1Title.current, { text: "GRAHITA", duration: 1.5, ease: "none" })
        .fromTo(
          s1Subtitle.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 1 },
        );

      // Hero shrink effect
      gsap.to(s1Inner.current, {
        width: "calc(100% - 300px)",
        height: "calc(100% - 400px)",
        borderRadius: "20px",
        ease: "none",
        scrollTrigger: {
          trigger: s1Section.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Wobble filter effect tied to ScrollTrigger
      gsap.to("#turbS1", {
        attr: { baseFrequency: "0.08 0.08" },
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=800",
          scrub: true,
        },
      });

      // === SCENE 2 ===
      // Shapes collapse chaotically on scroll
      if (s2Shapes.current && s2Container.current) {
        const paperElements = Array.from(s2Shapes.current.children);
        gsap.to(paperElements, {
          y: () => 300 + Math.random() * 200,
          x: () => (Math.random() - 0.5) * 400,
          rotation: () => (Math.random() - 0.5) * 720,
          opacity: 0,
          stagger: {
            each: 0.05,
            from: "end", // Animates from the last child (visually the top/front layer in DOM order)
          },
          ease: "power2.in",
          scrollTrigger: {
            trigger: s2Container.current,
            start: "top top",
            end: "bottom center",
            scrub: true,
          },
        });
      }

      // Staggered typing for each paragraph
      const scene2Elems = [
        { ref: s2Text1.current, text: "Semester 10. Dropout Imminent." },
        {
          ref: s2Text2.current,
          text: "Layar laptop berkedip menampakkan draf skripsi yang tak tersentuh selama berbulan-bulan. Di luar jendela, riuh rendah mahasiswa berlalu-lalang menapaki jalanan kampus yang familiar—sebuah pemandangan kontras dengan ruang batinmu yang terasa makin hampa dan buntu. Ekspektasi keluarga perlahan berubah menjadi beban yang mencekik leher.",
        },
        {
          ref: s2Text3.current,
          text: "Surat Peringatan itu akhirnya datang membawa ketakutan terburuk: ancaman Drop Out sudah di depan mata. Namun, Dosen Pembimbingmu memberikan satu kesempatan terakhir. Sebuah jalan keluar sekaligus penebusan akademis yang tak biasa: 30 Hari untuk melakukan Riset Aksi secara langsung.",
        },
        {
          ref: s2Text4.current,
          text: "Tugasmu bukan lagi berkutat dengan teori mati di sudut perpustakaan. Kamu dituntut untuk turun langsung, mengobservasi, dan menyusup ke dalam labirin krisis mental teman-temanmu. Sebuah perjalanan psikologis yang akan membawamu melintasi 5 fakultas yang berbeda—menyelami tekanan presisi yang gila di fakultas teknik, hingga beratnya beban moral di ranah medis.",
        },
        {
          ref: s2Text5.current,
          text: "Mereka tertawa di lorong kampus, namun hancur tak bersuara di balik pintu kamar kos. Tugasmu adalah menemukan anomali tersebut dan memahami penderitaan mereka tanpa perlu diucapkan. Sembuhkan mereka... sebelum empati itu sendiri yang berbalik menelan kewarasanmu.",
        },
      ];

      scene2Elems.forEach((el) => {
        if (!el.ref) return;
        gsap.to(el.ref, {
          text: el.text,
          scrollTrigger: {
            trigger: el.ref,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        });
      });

      // === SCENE 4 ===
      const s4Width = s4Wrapper.current?.scrollWidth || 0;
      const scrollEnd = Math.max(s4Width - window.innerWidth, 0);

      // Master Pin Timeline for Scene 4
      // Handles pinning and the main horizontal scroll
      const pinDistance = scrollEnd * 1.5; // Memperpanjang jarak pin agar scroll horizontal lebih rileks dan smooth
      const scene4Tl = gsap.timeline({
        scrollTrigger: {
          trigger: s4Container.current,
          start: "top top",
          end: () => `+=${pinDistance}`,
          scrub: 1.5, // Menambah sedikit kelembutan pada gerakan mengikuti scroll
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Tie horizontal scroll to the master pin timeline
      scene4Tl.to(s4Wrapper.current, {
        x: -scrollEnd,
        ease: "sine.inOut", // Animasi horizontal dimulai dan diakhiri dengan lebih mulus
      });

      // Background morph: dimulai segera setelah Scene 4 masuk dari bawah layar
      // Selesai dengan mulus sebelum mencapai puncak
      const tl4Bg = gsap.timeline({
        scrollTrigger: {
          trigger: s4Container.current,
          start: "top bottom",
          end: "top 20%",
          scrub: 1.5,
        },
      });
      tl4Bg.fromTo(
        s4Container.current,
        { backgroundColor: "#FDFBF7", color: "#121820" },
        { backgroundColor: "#121820", color: "#FDFBF7", ease: "power2.inOut" },
        0,
      );

      // 60% glitch fill animation: runs during the first half of the pin
      const circleLength = 283;
      const fillAmount = circleLength * 0.4;
      const tl4Fill = gsap.timeline({
        scrollTrigger: {
          trigger: s4Container.current,
          start: "top top",
          end: () => `+=${pinDistance / 2 || 500}`,
          scrub: 1.5,
        },
      });
      tl4Fill
        .to(
          s4CircleFill.current,
          { strokeDashoffset: fillAmount, ease: "none" },
          0,
        )
        .to(s4Text60.current, { text: "60%", ease: "none" }, 0)
        .to("#jaggedS4", { attr: { baseFrequency: "0.1" }, duration: 1 }, 0);

      // === SCENE 5 ===
      const tl5 = gsap.timeline({
        scrollTrigger: {
          trigger: s5CupGroup.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      // Cup deforms/cracks and liquid pours out
      tl5
        .to(
          s5CupStroke.current,
          {
            strokeDashoffset: 0,
            ease: "power1.inOut",
            duration: 1,
          },
          0,
        )
        .to(
          s5Liquid.current,
          {
            y: 150,
            opacity: 0,
            scaleY: 2,
            duration: 1.5,
            ease: "power2.in",
          },
          0.5,
        )
        .to(
          s5CupStroke.current,
          {
            scaleX: 1.2,
            scaleY: 0.8,
            rotation: 5,
            y: 10,
            ease: "elastic.out(1, 0.3)",
            duration: 1,
          },
          1,
        );

      // Refresh ScrollTrigger after all animations are registered
      // This ensures proper sync with Lenis smooth scroll positions
      ScrollTrigger.refresh();
    },
    { scope: container },
  );

  // SCENE 6 - GLYPH HOVER
  const handleGlyphHover = () => {
    if (!s6Glyph.current || !s6Links.current || !s6Pulse.current) return;
    const bits = Array.from(s6Glyph.current.children);

    // Disintegration
    gsap.to(bits, {
      x: () => (Math.random() - 0.5) * 100,
      y: () => (Math.random() - 0.5) * 100,
      rotation: () => (Math.random() - 0.5) * 360,
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: "power3.out",
      overwrite: "auto",
    });

    // Reveal links
    gsap.to(s6Links.current, {
      opacity: 1,
      y: -20,
      pointerEvents: "auto",
      duration: 0.6,
      delay: 0.3,
      ease: "back.out(1.5)",
      overwrite: "auto",
    });

    // Pulse bg
    gsap.to(s6Pulse.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "sine.out",
      overwrite: "auto",
    });
  };

  const handleGlyphLeave = () => {
    if (!s6Glyph.current || !s6Links.current || !s6Pulse.current) return;
    const bits = Array.from(s6Glyph.current.children);

    gsap.to(bits, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.01,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(s6Links.current, {
      opacity: 0,
      y: 0,
      pointerEvents: "none",
      duration: 0.3,
      overwrite: "auto",
    });

    gsap.to(s6Pulse.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      overwrite: "auto",
    });
  };

  return (
    <div ref={container} className="relative w-full">
      {/* GLOBAL SVG FILTERS */}
      <svg className="hidden">
        <filter id="displaceS1">
          <feTurbulence
            id="turbS1"
            type="fractalNoise"
            baseFrequency="0.001 0.001"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="jaggedS4">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="3"
            result="fractal"
          />
          <feDisplacementMap in="SourceGraphic" in2="fractal" scale="20" />
        </filter>
      </svg>

      {/* SCENE 1 */}
      <section
        ref={s1Section}
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-visible bg-white"
      >
        <div
          ref={s1Inner}
          className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <img
              src="/bgcanvas.png"
              alt="Background Canvas"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply blur-3xl z-1">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <circle ref={blob1} cx="30" cy="30" r="40" fill="#84A59D" />
              <circle ref={blob2} cx="70" cy="60" r="45" fill="#9B2226" />
              <circle ref={blob3} cx="50" cy="50" r="35" fill="#121820" />
            </svg>
          </div>
          <div className="z-10 text-center px-4">
            <p
              ref={s1Eyebrow}
              className="font-sans text-sm md:text-base text-abyss/70 uppercase tracking-widest mb-6"
            >
              To heal others, you must first learn how to carry the weight...
            </p>
            <div className="min-h-[1em] text-6xl md:text-9xl mb-4 text-abyss">
              <h1
                ref={s1Title}
                className="font-serif font-bold inline-block select-none"
                style={{ filter: "url(#displaceS1)" }}
              ></h1>
            </div>
            <p
              ref={s1Subtitle}
              className="font-serif italic text-whi text-2xl md:text-4xl mt-4"
            >
              The Burden of Empathy
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 2 */}
      <section
        ref={s2Container}
        className="relative w-full bg-white flex flex-col md:flex-row pb-32"
      >
        <div
          ref={s2Left}
          className="md:sticky md:top-0 z-10 w-full md:w-1/2 h-screen flex border-r border-abyss/10 items-center justify-center overflow-hidden bg-white flex-shrink-0"
        >
          {/* Background Image for Meja */}
          <div className="absolute inset-0 z-0">
            <img
              src="/meja.png"
              alt="Background Meja"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 w-[80%] h-[80%] max-w-[400px] -translate-x-12 -translate-y-20">
            <div ref={s2Shapes} className="absolute inset-0">
              {Array.from({ length: 40 }).map((_, i) => {
                const r1 = ((i * 13) % 100) / 100;
                const r2 = ((i * 17) % 100) / 100;
                const r3 = ((i * 23) % 100) / 100;
                const r4 = ((i * 29) % 100) / 100;
                const r5 = ((i * 31) % 100) / 100;
                const size = 100 + r3 * 120;
                return (
                  <img
                    key={i}
                    src="/paper.png"
                    alt="Paper decoration"
                    className="absolute drop-shadow-2xl"
                    style={{
                      left: `${200 + (r1 - 0.5) * 150}px`,
                      top: `${200 + (r2 - 0.5) * 150}px`,
                      width: `${size}px`,
                      height: "auto",
                      transform: `rotate(${r5 * 360}deg)`,
                    }}
                  />
                );
              })}
              {Array.from({ length: 25 }).map((_, i) => {
                const r1 = ((i * 37) % 100) / 100;
                const r2 = ((i * 41) % 100) / 100;
                const r3 = ((i * 43) % 100) / 100;
                const r4 = ((i * 47) % 100) / 100;
                const r5 = ((i * 53) % 100) / 100;
                const size = 80 + r3 * 100;
                return (
                  <img
                    key={`paper-alt-${i}`}
                    src="/paper.png"
                    alt="Paper decoration"
                    className="absolute grayscale contrast-125 drop-shadow-xl"
                    style={{
                      left: `${250 + (r1 - 0.5) * 100}px`,
                      top: `${250 + (r2 - 0.5) * 100}px`,
                      width: `${size}px`,
                      height: "auto",
                      transform: `rotate(${r5 * 360}deg)`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 min-h-screen py-32 px-8 md:px-20 flex flex-col justify-center gap-8 mt-[100vh] md:mt-0">
          <div className="h-[10vh] md:h-[20vh]"></div>
          <h2
            ref={s2Text1}
            className="font-serif text-5xl md:text-7xl text-crimson leading-tight min-h-[3em] mb-4"
          ></h2>
          <p
            ref={s2Text2}
            className="font-sans text-xl md:text-2xl text-abyss/80 leading-relaxed max-w-xl min-h-[5em]"
          ></p>
          <p
            ref={s2Text3}
            className="font-sans text-xl md:text-2xl text-abyss/80 leading-relaxed max-w-xl min-h-[5em]"
          ></p>
          <p
            ref={s2Text4}
            className="font-sans text-xl md:text-2xl text-abyss/80 leading-relaxed max-w-xl min-h-[5em]"
          ></p>
          <p
            ref={s2Text5}
            className="font-sans text-xl md:text-2xl text-abyss/80 leading-relaxed max-w-xl min-h-[5em]"
          ></p>
          <div className="h-[15vh]"></div>
        </div>
      </section>

      {/* SCENE 3 - X-RAY REVEAL */}
      <section
        ref={s3Section}
        className="relative h-screen w-full overflow-hidden cursor-none bg-white"
      >
        {/* BASE LAYER (Normal World - Storybook) */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sage via-white to-white"></div>
          <div className="absolute inset-0 pointer-events-none opacity-50 mix-blend-multiply blur-[60px]">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <ellipse cx="20" cy="80" rx="30" ry="20" fill="#84A59D" />
              <ellipse cx="80" cy="20" rx="40" ry="30" fill="#FDFBF7" />
            </svg>
          </div>
          <div className="z-10 flex flex-col items-center max-w-4xl px-4 text-center pointer-events-none">
            <h2 className="font-serif text-5xl md:text-7xl text-abyss mb-6">
              Penyakit mental tidak selalu berwujud air mata.
            </h2>
            <p className="font-sans text-lg text-abyss/70 max-w-2xl">
              The Visibility Paradox: Surreal storybook aesthetics built from
              organic shapes hide heavy psychological horrors beneath.
            </p>
          </div>
        </div>
        {/* TOP LAYER (Alterworld) */}
        <div
          ref={s3TopLayer}
          className="absolute inset-0 bg-abyss flex items-center justify-center pointer-events-none z-20"
          style={{
            clipPath: "circle(250px at var(--x, -1000px) var(--y, -1000px))",
          }}
        >
          <div className="absolute inset-0 opacity-40">
            <svg width="100%" height="100%">
              <pattern
                id="pattern-dark"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,0 L80,80 M80,0 L0,80 M40,0 L40,80 M0,40 L80,40"
                  fill="none"
                  stroke="#9B2226"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <polygon
                  points="40,20 60,60 20,60"
                  fill="none"
                  stroke="#FDFBF7"
                  opacity="0.3"
                />
              </pattern>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#pattern-dark)"
              />
            </svg>
          </div>
          <div className="z-10 flex flex-col items-center max-w-4xl px-4 text-center pointer-events-none">
            <h2
              className="font-serif text-5xl md:text-7xl text-canvas mb-6 font-bold"
              style={{ textShadow: "0 0 20px #9B2226" }}
            >
              Penyakit mental tidak selalu berwujud air mata.
            </h2>
            <p className="font-sans text-lg text-canvas/70 max-w-2xl">
              The Visibility Paradox: Surreal storybook aesthetics built from
              organic shapes hide heavy psychological horrors beneath.
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 4 */}
      <section
        ref={s4Container}
        className="relative h-screen w-full overflow-hidden"
      >
        <div
          ref={s4Wrapper}
          className="w-[200vw] h-full flex flex-row items-center"
        >
          <div className="w-[100vw] h-full flex items-center justify-center relative flex-shrink-0 px-8">
            <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto w-full">
              <div className="relative w-64 h-64 md:w-96 md:h-96 flex-shrink-0">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full rotate-[-90deg]"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeOpacity="0.2"
                  />
                  <circle
                    ref={s4CircleFill}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#9B2226"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                    style={{ filter: "url(#jaggedS4)" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    ref={s4Text60}
                    className="font-serif text-5xl md:text-7xl text-crimson font-bold"
                  >
                    0%
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-sans text-2xl md:text-5xl leading-tight">
                  Dari mahasiswa di sekitarmu bertarung dalam diam melawan
                  stres, kecemasan, dan depresi.
                </p>
              </div>
            </div>
          </div>

          <div className="w-[100vw] h-full flex items-center justify-center flex-shrink-0 px-8 relative">
            <div className="max-w-4xl text-center">
              <h2 className="font-serif text-5xl md:text-8xl mb-6 text-sage">
                Targeting SDG 3<br />
                <span className="text-[0.5em] text-canvas opacity-80">
                  Good Health & Well-being
                </span>
              </h2>
              <p className="font-sans text-xl md:text-3xl text-canvas/70 leading-relaxed border-t border-sage/30 pt-8 mt-4 inline-block">
                Grahita bukan sekadar game. Ini adalah simulasi P3K Psikologis
                (Psychological First Aid) berbalut puzzle RPG.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 5 */}
      <section className="relative min-h-screen py-32 w-full bg-white flex flex-col items-center justify-center text-center px-4 overflow-hidden text-abyss">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-abyss opacity-20 z-10"></div>
        <div className="relative z-10 mb-24 mt-16 w-64 h-64">
          <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible">
            <g ref={s5CupGroup} style={{ transformOrigin: "50px 50px" }}>
              <path
                ref={s5CupStroke}
                d="M20,20 L20,80 Q20,100 50,100 Q80,100 80,80 L80,20"
                fill="none"
                stroke="#121820"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="200"
                strokeDashoffset="200"
              />
              <line
                x1="20"
                y1="20"
                x2="80"
                y2="20"
                stroke="#121820"
                strokeWidth="3"
                strokeDasharray="60"
                strokeLinecap="round"
              />
            </g>
            <path
              ref={s5Liquid}
              d="M45,95 L55,95 L52,180 L48,180 Z"
              fill="#84A59D"
            />
          </svg>
        </div>
        <h3 className="font-sans font-bold text-abyss/50 tracking-[0.2em] md:tracking-[0.4em] uppercase mb-12 max-w-lg mx-auto">
          Grahita (Kawi): Insting batin untuk memahami penderitaan tanpa perlu
          diucapkan.
        </h3>
        <p className="font-serif italic text-sage text-4xl md:text-7xl max-w-5xl mx-auto mb-16 px-4 leading-tight">
          "You cannot pour from an empty cup."
        </p>
        <p className="font-sans text-xl md:text-2xl text-abyss/80 max-w-2xl mx-auto font-medium">
          Menolong orang lain tanpa batasan hanya akan menghancurkan dirimu
          sendiri.
        </p>
      </section>

      {/* SCENE 6 */}
      <section className="relative h-[80vh] w-full bg-abyss flex items-center justify-center overflow-hidden">
        <div className="text-center z-10">
          <p className="font-serif text-3xl md:text-5xl text-canvas/40 mix-blend-screen leading-relaxed">
            Empati adalah beban yang sunyi. <br />
            <span className="text-canvas mx-2">Istirahatkan pikiranmu.</span>
          </p>
        </div>

        {/* THE HIDDEN ANOMALY */}
        <div
          className="absolute bottom-12 right-12 z-50 interactable"
          onMouseEnter={handleGlyphHover}
          onMouseLeave={handleGlyphLeave}
        >
          <div className="relative flex items-center justify-center cursor-pointer w-16 h-16">
            <svg viewBox="0 0 50 50" className="w-10 h-10 overflow-visible">
              <g
                ref={s6Glyph}
                stroke="#84A59D"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
              >
                <path d="M25,5 L25,20" />
                <path d="M25,30 L25,45" />
                <path d="M5,25 L20,25" />
                <path d="M30,25 L45,25" />
                <circle cx="25" cy="25" r="5" fill="#84A59D" stroke="none" />
                <path d="M10,10 L20,20" />
                <path d="M40,40 L30,30" />
              </g>
            </svg>

            <div
              ref={s6Links}
              className="absolute bottom-full right-full text-right opacity-0 pointer-events-none mb-4 mr-4 whitespace-nowrap min-w-[200px]"
            >
              <a
                href="#"
                className="block font-mono text-xs md:text-sm text-crimson hover:text-sage transition-colors duration-300 mb-3 tracking-widest bg-abyss/80 p-2 border border-crimson/20"
              >
                [ DECRYPT: THE_BLUEPRINT.exe ]
              </a>
              <a
                href="#"
                className="block font-mono text-xs md:text-sm text-crimson hover:text-sage transition-colors duration-300 tracking-widest bg-abyss/80 p-2 border border-crimson/20"
              >
                [ ACCESS: THE_PITCH.sys ]
              </a>
            </div>

            <div
              ref={s6Pulse}
              className="absolute inset-0 -z-10 bg-gradient-to-r from-crimson/20 to-sage/20 rounded-full blur-3xl scale-50 opacity-0 pointer-events-none"
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
}
