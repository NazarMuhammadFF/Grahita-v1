"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

// Plugin registration is centralized in SmoothScroller.tsx
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

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
  const s3Revealed = useRef(false);
  const isInDarkZone = useRef(false);
  const [s3CursorNone, setS3CursorNone] = useState(false);

  // Helper to switch music track
  const dispatchMusicSwitch = (track: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("switchMusic", { detail: { track } }),
      );
    }
  };

  const handleS3Click = (e: React.MouseEvent<HTMLDivElement>) => {
    if (s3TopLayer.current && s3Section.current) {
      const isFirstTime = !s3Revealed.current;

      if (isFirstTime) {
        s3Revealed.current = true;
        setS3CursorNone(true);
        // On first click, if we're in the dark zone, switch to backsound2.mp3
        if (isInDarkZone.current) {
          dispatchMusicSwitch("/backsound2.mp3");
        }
      }

      const rect = s3Section.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      s3TopLayer.current.style.setProperty("--x", `${x}px`);
      s3TopLayer.current.style.setProperty("--y", `${y}px`);

      gsap.fromTo(
        s3TopLayer.current,
        { "--radius": isFirstTime ? "0px" : "150px" },
        {
          "--radius": "250px",
          ease: "elastic.out(1, 0.5)",
          duration: 1.5,
        },
      );
    }
  };

  // SCENE 4
  const s4Container = useRef<HTMLDivElement>(null);
  const s4Wrapper = useRef<HTMLDivElement>(null);
  const s4CircleFill = useRef<SVGCircleElement>(null);
  const s4Text60 = useRef<HTMLSpanElement>(null);
  const s4Panel2Title = useRef<HTMLHeadingElement>(null);
  const s4Panel2Line = useRef<HTMLDivElement>(null);
  const s4Panel2Text = useRef<HTMLParagraphElement>(null);

  // SCENE 5
  const s5Container = useRef<HTMLElement>(null);
  const s5CupStroke = useRef<SVGPathElement>(null);
  const s5CupGroup = useRef<SVGGElement>(null);
  const s5Liquid = useRef<SVGRectElement>(null);
  const s5Text1 = useRef<HTMLDivElement>(null);
  const s5Text2 = useRef<HTMLParagraphElement>(null);
  const s5Text3 = useRef<HTMLParagraphElement>(null);

  // SCENE 6
  const s6Glyph = useRef<SVGGElement>(null);
  const s6Links = useRef<HTMLDivElement>(null);
  const s6Pulse = useRef<HTMLDivElement>(null);
  const s6MainText = useRef<HTMLParagraphElement>(null);
  const s6Section = useRef<HTMLElement>(null);
  const s6Link1 = useRef<HTMLButtonElement>(null);
  const s6Link2 = useRef<HTMLButtonElement>(null);
  const s6Arrow = useRef<HTMLDivElement>(null);
  const s6Trigger = useRef<HTMLDivElement>(null);

  const [isDecrypted, setIsDecrypted] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [s6Hovered, setS6Hovered] = useState(false);
  const router = useRouter();

  const handleS1MouseMove = (e: React.MouseEvent) => {
    if (!s1Title.current) return;
    const rect = s1Title.current.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    // Check if mouse is inside the title bounds
    const isInside =
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

    if (isInside) {
      // Calculate distance relative to center for intensity
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2),
      );
      const intensity = Math.max(0.015, 0.08 - dist / 1200);

      gsap.to("#turbS1", {
        attr: { baseFrequency: `${intensity * 0.5} ${intensity}` },
        duration: 0.8,
        ease: "sine.out",
      });

      gsap.to(s1Title.current, {
        opacity: 0.5,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to("#turbS1", {
        attr: { baseFrequency: "0.001 0.001" },
        duration: 1.2,
        ease: "sine.inOut",
      });

      gsap.to(s1Title.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut",
      });
    }
  };

  useEffect(() => {
    if (!s3TopLayer.current || !s3Section.current) return;

    // Use GSAP quickSetter for tracking X-ray
    const setX = gsap.quickSetter(s3TopLayer.current, "--x", "px");
    const setY = gsap.quickSetter(s3TopLayer.current, "--y", "px");

    // Also track mouse for the hint element sync
    const setHintX = gsap.quickSetter(".s3-hint", "left", "px");
    const setHintY = gsap.quickSetter(".s3-hint", "top", "px");

    const updateMouse = (e: MouseEvent) => {
      const rect = s3Section.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setX(x);
      setY(y);
      setHintX(x);
      setHintY(y);
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger to fix initial load layout shifts
    // caused by custom fonts or images loading asynchronously.
    const refresh = () => ScrollTrigger.refresh();

    if (document.fonts) {
      document.fonts.ready.then(refresh);
    }
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }

    return () => window.removeEventListener("load", refresh);
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

      // Track boundaries to orchestrate music changes
      ScrollTrigger.create({
        trigger: s3Section.current,
        start: "top 50%", // When user is starting to see scene 3
        onEnter: () => {
          isInDarkZone.current = true;
          if (s3Revealed.current) {
            dispatchMusicSwitch("/backsound2.mp3");
          }
        },
        onLeaveBack: () => {
          isInDarkZone.current = false;
          dispatchMusicSwitch("/backsound.mp3");
        },
      });

      // === TRANSITION SCENE 2 -> SCENE 3 ===
      gsap.fromTo(
        s2Container.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: s3Section.current,
            start: "top bottom",
            end: "top center",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        s3Section.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: s3Section.current,
            start: "top bottom",
            end: "top center",
            scrub: 1,
          },
        },
      );

      // === SCENE 4 ===
      const s4Width = s4Wrapper.current?.scrollWidth || 0;
      const scrollEnd = Math.max(s4Width - window.innerWidth, 0);
      const s4Panels = s4Wrapper.current?.children.length || 1;
      const extraReadDistance = window.innerHeight * Math.max(s4Panels - 1, 1);

      // Master Pin Timeline for Scene 4
      // Handles pinning and the main horizontal scroll
      const pinDistance = scrollEnd + extraReadDistance;
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

      const circleLength = 283;

      // Phase 1: Count to 100% and fill circle
      const s4Proxy = { val: 0 };
      const targetVal = 100;
      const fillAmount = circleLength * (1 - targetVal / 100);

      scene4Tl
        .to(
          s4CircleFill.current,
          { strokeDashoffset: fillAmount, ease: "power2.out", duration: 0.4 },
          0,
        )
        .to(
          s4Proxy,
          {
            val: targetVal,
            ease: "power2.out",
            duration: 0.4,
            onUpdate: () => {
              if (s4Text60.current) {
                s4Text60.current.innerText = Math.round(s4Proxy.val) + "%";
              }
            },
          },
          0,
        )
        // Pause gently at 100% before starting the slide
        .to({}, { duration: 0.1 })

        // Phase 2: Tie horizontal scroll to the master pin timeline after content 1 is done
        .to(s4Wrapper.current, {
          x: -scrollEnd,
          ease: "power1.inOut",
          duration: 0.7, // scroll durasi
        })

        // Panel 2 Entrance Animations (starts near the end of the slide)
        .fromTo(
          s4Panel2Line.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.2, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          [s4Panel2Title.current, s4Panel2Text.current],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: "power2.out" },
          "-=0.2",
        )

        // Phase 3: Hold at the end
        .to({}, { duration: 0.2 });

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

      // === SCENE 5 ===
      const s5Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: s5Container.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      // Reset the cup initially
      gsap.set(s5CupStroke.current, { rotation: 0, x: 0, stroke: "#121820" });

      s5Timeline
        // The Draining Process
        .to(
          s5Liquid.current,
          {
            scaleY: 0,
            duration: 1.5,
            ease: "power1.inOut",
          },
          0,
        )
        // The Breaking Point
        .to(
          s5CupStroke.current,
          {
            rotation: 12,
            x: 5,
            stroke: "#9B2226", // Crimson
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          1.5, // Triggered exactly right when liquid hits 0
        )
        // Staggered text reveal with blur
        .fromTo(
          [s5Text1.current, s5Text2.current, s5Text3.current],
          {
            opacity: 0,
            y: 30,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.3,
            duration: 1.2,
            ease: "power2.out",
          },
          0.5, // start halfway through the pour
        );

      // Refresh ScrollTrigger after all animations are registered
      // This ensures proper sync with Lenis smooth scroll positions
      ScrollTrigger.refresh();
    },
    { scope: container },
  );

  // SCENE 6 - GLITCH ROUTER MECHANIC
  const handleDecryptClick = () => {
    if (isDecrypted) return;
    setIsDecrypted(true);
  };

  useEffect(() => {
    if (isDecrypted) {
      // Expand the terminal box
      if (s6Links.current) {
        gsap.fromTo(
          s6Links.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" },
        );
      }

      if (s6Pulse.current) {
        gsap.to(s6Pulse.current, {
          opacity: 1,
          scale: 1.5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Typewriter effect on links
      if (s6Link1.current && s6Link2.current) {
        gsap.to(s6Link1.current, {
          text: "[ DECRYPT: THE_BLUEPRINT.exe ]",
          duration: 1.5,
          delay: 0.3,
          ease: "none",
        });
        gsap.to(s6Link2.current, {
          text: "[ ACCESS: THE_PITCH.sys ]",
          duration: 1.5,
          delay: 1.8,
          ease: "none",
        });
      }
    }
  }, [isDecrypted]);

  const handleS6MouseMove = (e: React.MouseEvent) => {
    if (!s6Arrow.current || !s6Trigger.current || isDecrypted) return;

    const triggerBox = s6Trigger.current.getBoundingClientRect();
    const targetX = triggerBox.left + triggerBox.width / 2;
    const targetY = triggerBox.top + triggerBox.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const angle =
      Math.atan2(targetY - mouseY, targetX - mouseX) * (180 / Math.PI);

    const sectionRect = s6Section.current!.getBoundingClientRect();
    const relX = mouseX - sectionRect.left;
    const relY = mouseY - sectionRect.top;

    gsap.to(s6Arrow.current, {
      x: relX + 20,
      y: relY + 20,
      rotation: angle,
      duration: 0.1,
      ease: "none",
    });
  };

  const handleNavigation = (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string,
  ) => {
    e.preventDefault();
    if (isNavigating) return;
    setIsNavigating(true);

    const tl = gsap.timeline();

    // Glitch the main text
    if (s6MainText.current) {
      tl.to(s6MainText.current, {
        x: () => (Math.random() - 0.5) * 50,
        y: () => (Math.random() - 0.5) * 50,
        skewX: 20,
        opacity: 0.5,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
      }).to(
        s6MainText.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        },
        "+=0.1",
      );
    }

    // Massive timeline on entire 100vh container
    if (s6Section.current) {
      tl.to(
        s6Section.current,
        {
          filter: "invert(1) contrast(200%) hue-rotate(90deg)",
          duration: 0.2,
        },
        0,
      )
        .to(
          s6Section.current,
          {
            scaleY: 0.01,
            duration: 0.3,
            ease: "power4.in",
          },
          "+=0.2",
        )
        .to(s6Section.current, {
          scaleX: 0,
          opacity: 0,
          backgroundColor: "#000",
          duration: 0.2,
          ease: "power2.inOut",
        });
    }

    setTimeout(() => {
      router.push(url);
    }, 1200);
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
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-visible"
        style={{ backgroundColor: "#fdf3eb" }}
        onMouseMove={handleS1MouseMove}
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
              className="font-serif italic text-[#9b2226] text-2xl md:text-4xl mt-4"
            >
              The Burden of Empathy
            </p>
          </div>
        </div>
      </section>

      {/* SCENE 2 */}
      <section
        ref={s2Container}
        className="relative w-full flex flex-col md:flex-row pb-32"
        style={{ backgroundColor: "#fdf3eb" }}
      >
        <div
          ref={s2Left}
          className="md:sticky md:top-0 z-10 w-full md:w-1/2 h-screen flex border-r border-abyss/10 items-center justify-center overflow-hidden flex-shrink-0"
          style={{ backgroundColor: "#fdf3eb" }}
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

          <div className="relative mb-4">
            <h2 className="font-serif text-5xl md:text-7xl text-crimson leading-tight invisible selection:bg-transparent">
              Semester 10. Dropout Imminent.
            </h2>
            <h2
              ref={s2Text1}
              className="font-serif text-5xl md:text-7xl text-crimson leading-tight absolute top-0 left-0 w-full h-full"
            ></h2>
          </div>

          <div className="relative mb-8">
            <p className="font-sans text-xl md:text-2xl text-abyss/80 leading-relaxed max-w-xl invisible selection:bg-transparent">
              Layar laptop berkedip menampakkan draf skripsi yang tak tersentuh
              selama berbulan-bulan. Di luar jendela, riuh rendah mahasiswa
              berlalu-lalang menapaki jalanan kampus yang familiar—sebuah
              pemandangan kontras dengan ruang batinmu yang terasa makin hampa
              dan buntu. Ekspektasi keluarga perlahan berubah menjadi beban yang
              mencekik leher.
            </p>
            <p
              ref={s2Text2}
              className="font-sans text-xl md:text-2xl text-abyss/80 leading-relaxed max-w-xl absolute top-0 left-0 w-full h-full"
            ></p>
          </div>

          <div className="relative mb-8">
            <p className="font-sans text-xl md:text-2xl text-abyss/80 leading-relaxed max-w-xl invisible selection:bg-transparent">
              Surat Peringatan itu akhirnya datang membawa ketakutan terburuk:
              ancaman Drop Out sudah di depan mata. Namun, Dosen Pembimbingmu
              memberikan satu kesempatan terakhir. Sebuah jalan keluar sekaligus
              penebusan akademis yang tak biasa: 30 Hari untuk melakukan Riset
              Aksi secara langsung.
            </p>
            <p
              ref={s2Text3}
              className="font-sans text-xl md:text-2xl text-abyss/80 leading-relaxed max-w-xl absolute top-0 left-0 w-full h-full"
            ></p>
          </div>

          <div className="relative mb-8">
            <p className="font-sans text-xl md:text-2xl text-abyss/80 leading-relaxed max-w-xl invisible selection:bg-transparent">
              Tugasmu bukan lagi berkutat dengan teori mati di sudut
              perpustakaan. Kamu dituntut untuk turun langsung, mengobservasi,
              dan menyusup ke dalam labirin krisis mental teman-temanmu. Sebuah
              perjalanan psikologis yang akan membawamu melintasi 5 fakultas
              yang berbeda—menyelami tekanan presisi yang gila di fakultas
              teknik, hingga beratnya beban moral di ranah medis.
            </p>
            <p
              ref={s2Text4}
              className="font-sans text-xl md:text-2xl text-abyss/80 leading-relaxed max-w-xl absolute top-0 left-0 w-full h-full"
            ></p>
          </div>

          <div className="relative mb-8">
            <p className="font-sans text-xl md:text-2xl text-abyss/80 leading-relaxed max-w-xl invisible selection:bg-transparent">
              Mereka tertawa di lorong kampus, namun hancur tak bersuara di
              balik pintu kamar kos. Tugasmu adalah menemukan anomali tersebut
              dan memahami penderitaan mereka tanpa perlu diucapkan. Sembuhkan
              mereka... sebelum empati itu sendiri yang berbalik menelan
              kewarasanmu.
            </p>
            <p
              ref={s2Text5}
              className="font-sans text-xl md:text-2xl text-abyss/80 leading-relaxed max-w-xl absolute top-0 left-0 w-full h-full"
            ></p>
          </div>

          <div className="h-[15vh]"></div>
        </div>
      </section>

      {/* SCENE 3 - X-RAY REVEAL */}
      <section
        ref={s3Section}
        onClick={handleS3Click}
        className={`relative h-screen w-full overflow-hidden bg-white transition-colors cursor-pointer ${s3CursorNone ? "cursor-none" : ""}`}
      >
        {/* BASE LAYER (Normal World - Storybook) */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 z-0">
            <img
              src="/normal.png"
              alt="Normal Background"
              className="w-full h-full object-cover object-center"
            />
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
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{
            clipPath:
              "circle(var(--radius, 0px) at var(--x, -1000px) var(--y, -1000px))",
          }}
        >
          <div className="absolute inset-0 z-0">
            <img
              src="/distrosi.png"
              alt="Distorsi Background"
              className="w-full h-full object-cover object-center"
            />
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

        {/* CLICK HINT FOR SCENE 3 */}
        {!s3CursorNone && (
          <div
            className="s3-hint pointer-events-none z-50 mix-blend-difference font-mono text-[10px] uppercase tracking-[0.2em] text-white absolute"
            style={{
              transform: "translate(20px, 20px)",
            }}
          >
            [ Click to reveal ]
          </div>
        )}
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
            {/* Ambient radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#9B2226]/10 to-transparent blur-3xl pointer-events-none z-0"></div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 max-w-6xl mx-auto w-full z-10">
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full rotate-[-90deg] drop-shadow-[0_0_15px_rgba(155,34,38,0.3)]"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#1f2937"
                    strokeWidth="4"
                  />
                  <circle
                    ref={s4CircleFill}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#9B2226"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    ref={s4Text60}
                    className="font-serif text-6xl md:text-8xl text-crimson font-bold drop-shadow-[0_0_10px_rgba(155,34,38,0.5)]"
                  >
                    0%
                  </span>
                </div>
              </div>
              <div className="flex-1 max-w-xl">
                <p className="font-sans text-2xl md:text-4xl leading-snug text-gray-200">
                  Dari mahasiswa di sekitarmu{" "}
                  <span className="text-[#9B2226] italic font-serif">
                    bertarung dalam diam
                  </span>{" "}
                  melawan stres, kecemasan, dan depresi.
                </p>
              </div>
            </div>
          </div>

          <div className="w-[100vw] h-full flex items-center justify-center flex-shrink-0 px-8 relative overflow-hidden">
            {/* Depth/Background Number */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[350px] text-white/[0.03] font-serif select-none z-0 pointer-events-none leading-none tracking-tighter">
              03
            </div>

            <div className="max-w-4xl text-center z-10 w-full">
              <div ref={s4Panel2Title} className="flex flex-col items-center">
                <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#84A59D] to-white drop-shadow-lg tracking-tight">
                  Targeting SDG 3
                </h2>
                <span className="font-serif text-2xl md:text-4xl text-gray-300 italic font-light tracking-wide">
                  Good Health & Well-being
                </span>
              </div>

              <div
                ref={s4Panel2Line}
                className="h-[1px] w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-[#84A59D]/70 to-transparent my-10"
                style={{ transformOrigin: "center" }}
              ></div>

              <div ref={s4Panel2Text}>
                <p className="font-sans font-light text-lg md:text-2xl text-gray-400 leading-relaxed max-w-2xl mx-auto px-4">
                  Grahita bukan sekadar game. Ini adalah simulasi P3K Psikologis
                  (Psychological First Aid) berbalut puzzle RPG.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 5 */}
      <section
        ref={s5Container}
        className="relative min-h-screen py-32 w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden text-abyss"
      >
        {/* Highly transparent Sage Green radial background */}
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(circle at center, rgba(132, 165, 157, 0.05) 0%, transparent 70%)",
          }}
        ></div>

        <div className="relative mb-16 w-32 h-40">
          <svg viewBox="0 0 100 150" className="w-full h-full overflow-visible">
            <defs>
              <clipPath id="cupClip">
                <path d="M10,20 C10,20 20,130 30,140 C40,145 60,145 70,140 C80,130 90,20 90,20 Z" />
              </clipPath>
            </defs>
            <g
              ref={s5CupGroup}
              style={{ transformOrigin: "50px 140px" }}
              className="relative z-10"
            >
              {/* Cup Stroke */}
              <path
                ref={s5CupStroke}
                d="M10,20 C10,20 20,130 30,140 C40,145 60,145 70,140 C80,130 90,20 90,20"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transformOrigin: "bottom center" }}
              />
              {/* Liquid Scale Y with Clip Path */}
              <g clipPath="url(#cupClip)">
                <rect
                  ref={s5Liquid}
                  x="0"
                  y="0"
                  width="100"
                  height="150"
                  fill="#84A59D"
                  style={{ transformOrigin: "bottom center" }}
                />
              </g>
            </g>
          </svg>
        </div>

        <div ref={s5Text1}>
          <h3 className="font-sans font-bold text-abyss/50 tracking-[0.2em] md:tracking-[0.4em] uppercase mb-12 max-w-lg mx-auto">
            Grahita (Kawi): Insting batin untuk memahami penderitaan tanpa perlu
            diucapkan.
          </h3>
        </div>

        <div ref={s5Text2}>
          <p className="font-serif italic text-sage text-4xl md:text-7xl max-w-5xl mx-auto mb-16 px-4 leading-tight">
            &quot;You cannot pour from an empty cup.&quot;
          </p>
        </div>

        <div ref={s5Text3}>
          <p className="font-sans text-xl md:text-2xl text-abyss/80 max-w-2xl mx-auto font-medium">
            Menolong orang lain tanpa batasan hanya akan menghancurkan dirimu
            sendiri.
          </p>
        </div>
      </section>

      {/* SCENE 6 */}
      <section
        ref={s6Section}
        className="relative h-screen w-full bg-abyss flex items-center justify-center overflow-hidden"
        onMouseMove={handleS6MouseMove}
        onMouseEnter={() => setS6Hovered(true)}
        onMouseLeave={() => setS6Hovered(false)}
      >
        {/* GLITCH ARROW TRACKER */}
        {!isDecrypted && (
          <div
            ref={s6Arrow}
            className={`absolute top-0 left-0 text-crimson font-mono font-bold text-5xl pointer-events-none transition-opacity duration-300 z-40 ${
              s6Hovered ? "opacity-90" : "opacity-0"
            }`}
            style={{
              transformOrigin: "center right",
              textShadow: "0 0 15px rgba(220, 20, 60, 0.8)",
            }}
          >
            <span className="inline-block animate-pointing">&rarr;</span>
          </div>
        )}

        <div className="text-center z-10">
          <p
            ref={s6MainText}
            className="font-serif text-3xl md:text-5xl text-canvas/40 mix-blend-screen leading-relaxed"
          >
            Empati adalah beban yang sunyi. <br />
            <span className="text-canvas mx-2">Istirahatkan pikiranmu.</span>
          </p>
        </div>

        {/* THE HIDDEN ANOMALY */}
        <div className="absolute bottom-12 right-12 z-50 interactable">
          <div className="relative flex flex-col items-end justify-end w-auto h-auto min-w-[50px] min-h-[50px]">
            {!isDecrypted ? (
              <div
                ref={s6Trigger}
                className="cursor-pointer text-crimson font-mono font-bold animate-pulse opacity-30 text-xl"
                onClick={handleDecryptClick}
              >
                [ ! ]
              </div>
            ) : (
              <div
                ref={s6Links}
                className="text-right whitespace-nowrap min-w-[200px]"
              >
                <button
                  ref={s6Link1}
                  onClick={(e) =>
                    handleNavigation(e, "https://grahita-v2-bv6n.vercel.app/")
                  }
                  className="block w-full text-right font-mono text-xs md:text-sm text-crimson hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 mb-3 tracking-widest bg-abyss/80 p-2 border border-crimson/20"
                >
                  {""}
                </button>
                <button
                  ref={s6Link2}
                  onClick={(e) =>
                    handleNavigation(e, "https://granita-v3.vercel.app/")
                  }
                  className="block w-full text-right font-mono text-xs md:text-sm text-crimson hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 tracking-widest bg-abyss/80 p-2 border border-crimson/20"
                >
                  {""}
                </button>
              </div>
            )}

            <div
              ref={s6Pulse}
              className="absolute inset-0 -z-10 bg-gradient-to-r from-crimson/20 to-sage/20 rounded-full blur-3xl scale-50 pointer-events-none"
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
}
