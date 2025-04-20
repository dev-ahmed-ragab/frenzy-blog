import { motion } from "framer-motion";

function Loading() {
    return (
        <div className="h-screen w-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] flex items-center justify-center relative overflow-hidden">
        {/* Glassmorphic blurred card */}
        <motion.div
          className="backdrop-blur-xl bg-white/30 p-10 rounded-3xl shadow-2xl flex flex-col items-center justify-center relative border border-white/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Glowing pulse circle */}
          <motion.div
            className="w-16 h-16 bg-[#d681d6] rounded-full shadow-lg"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
          
          {/* Shiny brand text */}
          <div className="relative mt-6 overflow-hidden">
            <h1 className="text-2xl md:text-3xl font-bold text-[#333] tracking-wide relative z-10">
              Frenzzy Blog
            </h1>
            <motion.div
              className="absolute top-0 left-[-50%] w-full h-full bg-gradient-to-r from-transparent via-white/70 to-transparent transform rotate-12"
              animate={{ left: ["-50%", "150%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    )

    
}

export default Loading;
