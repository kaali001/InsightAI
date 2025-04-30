// components/auth/AuthCard.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children, title, subtitle, footer }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-100 dark:bg-gray-800/90 dark:border-gray-700"
    >
     
      
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">{title}</h2>
      {subtitle && <p className="text-center text-gray-600 dark:text-gray-300 mb-6">{subtitle}</p>}
      
      <div className="space-y-4">
        {children}
      </div>
      
      {footer && <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">{footer}</div>}
    </motion.div>
  );
};