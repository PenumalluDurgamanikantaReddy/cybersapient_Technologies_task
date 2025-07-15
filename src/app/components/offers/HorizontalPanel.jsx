'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HorizontalPanel = ({ panel, index }) => {
  return (
    <div
      className="flex-shrink-0 h-full flex items-center justify-center p-12"
      style={{ width: '100%' }}
    >
      <div className="panel-content max-w-lg">
        {/* Panel number */}
        <motion.div
          className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 mb-6"
          style={{ borderColor: panel.accentColor, color: panel.accentColor }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6, ease: "backOut" }}
        >
          <span className="text-lg font-bold">{String(index + 1).padStart(2, '0')}</span>
        </motion.div>

        {/* Panel title */}
        <motion.h2
          className="text-5xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
        >
          {panel.title}
        </motion.h2>

        {/* Panel content */}
        <motion.p
          className="text-xl text-gray-600 leading-relaxed mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
        >
          {panel.content}
        </motion.p>

        {/* Decorative elements */}
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: panel.accentColor }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.button
          className="mt-8 px-8 py-3 rounded-full border-2 font-semibold transition-all duration-300 hover:scale-105"
          style={{
            borderColor: panel.accentColor,
            color: panel.accentColor,
          }}
          whileHover={{
            backgroundColor: panel.accentColor,
            color: 'white'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.8, duration: 0.6 }}
        >
          Explore {panel.title}
        </motion.button>
      </div>
    </div>
  );
};

export default HorizontalPanel;
