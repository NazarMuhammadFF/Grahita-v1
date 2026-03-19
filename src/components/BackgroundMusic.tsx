"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("/backsound.mp3");

  useEffect(() => {
    const handleSwitchMusic = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newTrack = customEvent.detail?.track;
      if (newTrack && newTrack !== currentTrack) {
        setCurrentTrack(newTrack);
      }
    };

    window.addEventListener("switchMusic", handleSwitchMusic);
    return () => {
      window.removeEventListener("switchMusic", handleSwitchMusic);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.log("Play after switch failed:", err));
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    // Attempt auto-play when user interacts with the page (browser policy)
    const enableAudio = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((err) => {
            console.log("Autoplay prevented:", err);
          });

        // Remove listeners once interacted
        window.removeEventListener("click", enableAudio);
        window.removeEventListener("scroll", enableAudio);
        window.removeEventListener("touchstart", enableAudio);
      }
    };

    window.addEventListener("click", enableAudio);
    window.addEventListener("scroll", enableAudio);
    window.addEventListener("touchstart", enableAudio);

    return () => {
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("scroll", enableAudio);
      window.removeEventListener("touchstart", enableAudio);
    };
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Play failed:", err));
    }
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
  };

  return (
    <div className="fixed top-6 right-6 z-[100]">
      <audio ref={audioRef} src={currentTrack} loop preload="auto" />
      <button
        onClick={toggleMusic}
        className="group relative p-3 rounded-full bg-abyss/10 backdrop-blur-md border border-abyss/20 hover:bg-abyss/20 transition-all duration-300"
        aria-label={
          isPlaying ? "Mute Background Music" : "Unmute Background Music"
        }
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-abyss opacity-70 group-hover:opacity-100 transition-opacity" />
        ) : (
          <VolumeX className="w-5 h-5 text-crimson opacity-70 group-hover:opacity-100 transition-opacity" />
        )}

        {/* Simple visual indicator */}
        {!hasInteracted && !isPlaying && (
          <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-crimson"></span>
          </span>
        )}
      </button>
    </div>
  );
}
