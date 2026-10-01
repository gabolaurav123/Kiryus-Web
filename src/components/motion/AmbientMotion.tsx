"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useSyncExternalStore, type ReactNode } from "react";
import styles from "./AmbientMotion.module.css";

// Match the server on first hydration; CSS disables motion before the preference is read.
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/** Opt-in image atmosphere. The parent supplies its height and position: relative. */
export function HeroAtmosphere({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const target = useRef<HTMLDivElement>(null);
  const preference = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const reducedMotion = hydrated && preference;
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  return (
    <div
      ref={target}
      className={`${styles.frame} ${className}`}
    >
      <motion.div
        className={styles.layer}
        initial={false}
        style={{ y: reducedMotion ? 0 : y, scale: reducedMotion ? 1 : scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}
