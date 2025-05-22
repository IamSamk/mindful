
import React from "react";
import { motion } from "framer-motion";

interface QuoteCardProps {
  quote: string;
  author: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, author }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6 rounded-xl mb-6"
    >
      <div className="flex flex-col space-y-3">
        <div className="text-5xl text-primary opacity-20">"</div>
        <p className="text-lg font-light leading-relaxed">{quote}</p>
        <p className="text-right text-sm text-muted-foreground mt-2">— {author}</p>
      </div>
    </motion.div>
  );
};

export default QuoteCard;
