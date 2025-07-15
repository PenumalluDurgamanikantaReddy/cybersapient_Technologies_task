'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ panels }) => {
  return (
    <div className="relative w-80 h-96 rounded-2xl border-2 shadow-2xl overflow-hidden transition-all duration-300">
      {/* Card background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm" />
      
      {/* Card content */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Product image placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-6 overflow-hidden">
          <motion.div
            className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-primary/50 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Card title */}
        <motion.h3
          className="text-2xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Premium Product
        </motion.h3>

        {/* Card description */}
        <motion.p
          className="text-gray-600 text-sm leading-relaxed flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Experience the perfect blend of innovation and design with our premium solution.
        </motion.p>

        {/* Card footer */}
        <motion.div
          className="mt-4 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-2xl font-bold text-primary">$99</span>
          <motion.button
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-primary/30 rounded-full" />
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-primary/20 rounded-full" />
    </div>
  );
};

export default ProductCard;
