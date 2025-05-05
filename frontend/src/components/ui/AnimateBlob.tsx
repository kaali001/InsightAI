// components/ui/AnimatedBlob.tsx
import { motion } from "framer-motion";
import React from "react";

interface AnimatedBlobProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const AnimatedBlob: React.FC<AnimatedBlobProps> = ({
  size = 300,
  color = "rgba(255, 182, 193, 0.5)", // Light pink default
  style = {},
  className = "",
}) => {
  return (
    <motion.div
      className={`absolute rounded-full mix-blend-multiply filter blur-2xl opacity-70 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        ...style,
      }}
      animate={{
        y: [0, 20, 0],
        x: [0, -20, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    />
  );
};
