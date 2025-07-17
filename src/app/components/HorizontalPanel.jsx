// import React from 'react';
// import { motion } from 'framer-motion';

// const HorizontalPanel = ({ panel, index }) => {
//   return (
//     <div className="flex-shrink-0 w-screen h-full flex items-center justify-center p-16">
//       <motion.div
//         className="max-w-2xl text-center text-white"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: index * 0.1 }}
//         viewport={{ once: true }}
//       >
//         <motion.h2
//           className="text-6xl font-bold mb-8"
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           {panel.title}
//         </motion.h2>
        
//         <motion.p
//           className="text-xl leading-relaxed opacity-90"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//         >
//           {panel.content}
//         </motion.p>

//         <motion.div
//           className="mt-12"
//           initial={{ opacity: 0, scale: 0.5 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//         >
//           <div className="w-20 h-1 bg-white/50 mx-auto rounded-full" />
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default HorizontalPanel;
