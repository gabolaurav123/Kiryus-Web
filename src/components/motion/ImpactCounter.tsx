"use client";

import { animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { ImpactFigure } from "@/content/impact";

export function ImpactCounter({ figure }: { figure: ImpactFigure }) {
  const reducedMotion = useReducedMotion();
  const number = useRef<HTMLSpanElement>(null);
  const played = useRef(false);
  const stopAnimation = useRef<(() => void) | null>(null);
  const finalValue = `${figure.prefix ?? ""}${figure.value}`;

  useEffect(() => () => stopAnimation.current?.(), []);

  function enter() {
    if (
      played.current ||
      reducedMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    played.current = true;
    const control = animate(0, figure.value, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate(value) {
        if (number.current)
          number.current.textContent = `${figure.prefix ?? ""}${Math.round(value)}`;
      },
      onComplete() {
        if (number.current) number.current.textContent = finalValue;
      },
    });
    stopAnimation.current = () => control.stop();
  }

  return (
    <motion.div onViewportEnter={enter} viewport={{ once: true, amount: 0.7 }}>
      <strong>
        <span ref={number} aria-hidden="true">
          {finalValue}
        </span>
        <span className="sr-only">{finalValue}</span>
      </strong>
      <span>{figure.label}</span>
    </motion.div>
  );
}
