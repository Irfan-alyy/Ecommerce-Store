import { motion } from "framer-motion";

const FadeInFromBottom = ({ children, duration=0.5, yOffset=50, delay=0.1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration,delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInFromBottom;
