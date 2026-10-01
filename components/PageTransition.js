'use client';
import { motion, useReducedMotion } from 'framer-motion';

export default function PageTransition({ children }) {
  const reduce = useReducedMotion();
  return (
    <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : .28 }}>
      {children}
    </motion.div>
  );
}
