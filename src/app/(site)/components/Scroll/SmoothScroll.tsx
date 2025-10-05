"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // wykryj urządzenia dotykowe (na nich zwykle lepszy natywny scroll)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    // jeśli chcesz całkiem pominąć Lenis na mobile:
    // if (isTouch) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true, // OK w typach
      // smoothTouch: false, // ❌ usuń – nie ma w Twojej wersji typów
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
