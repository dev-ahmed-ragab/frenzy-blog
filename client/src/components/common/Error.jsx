import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

// Animation Variants for the Error Box
const errorVariants = {
  hidden: { opacity: 0, y: -50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.8, 0.25, 1],
      delay: 0.2,
    },
  },
};

// Animation for the Icon
const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1.4,
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 200,
      damping: 25,
    },
  },
};

const ErrorMessage = ({ message = 'Something went wrong. Please try again later.' }) => {
  return (
    <motion.div
      variants={errorVariants}
      initial="hidden"
      animate="visible"
      className="my-5 max-w-lg mx-auto w-full bg-gradient-to-r from-[#d681d6] via-[#ab5bb6] to-[#8f469e] text-white p-6 rounded-xl shadow-xl flex items-center gap-4 relative overflow-hidden"
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#d681d6] via-[#ab5bb6] to-[#8f469e] opacity-30"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Error Icon */}
      <motion.div
        variants={iconVariants}
        initial="hidden"
        animate="visible"
        className="z-10"
      >
        <AlertCircle className="text-white w-12 h-12 animate-bounce" />
      </motion.div>

      {/* Error Message */}
      <div className="text-xl font-semibold z-10">{message}</div>
    </motion.div>
  );
};

export default ErrorMessage;
