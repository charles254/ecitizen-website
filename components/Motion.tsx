'use client';

import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useEffect, ReactNode } from 'react';

// Shared viewport config — animate once when any part is visible
const viewportOnce = { once: true, amount: 0 };

// ─── FadeIn ────────────────────────────────────────────
// Fades + slides an element into view on scroll.
// direction: "up" | "down" | "left" | "right"
export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  duration = 0.6,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  duration?: number;
  once?: boolean;
}) {
  const offsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  const animateTo = { opacity: 1, x: 0, y: 0 };
  const trans = { duration, delay, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={animateTo}
      whileInView={animateTo}
      viewport={{ once, amount: 0 }}
      transition={trans}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerContainer ──────────────────────────────────
// Parent wrapper that staggers children animations.
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerItem ───────────────────────────────────────
// Child item that animates when its StaggerContainer is in view.
export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── ScaleIn ───────────────────────────────────────────
// Scales an element from small to full size on scroll.
export function ScaleIn({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{
        duration: 0.6,
        delay,
        type: 'spring',
        damping: 25,
        stiffness: 120,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── CountUp ───────────────────────────────────────────
// Animated number counter that counts up when in view.
export function CountUp({
  target,
  suffix = '',
  prefix = '',
  className = '',
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const rounded = useTransform(springValue, (v) => Math.round(v));
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${v.toLocaleString()}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, prefix, suffix]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
