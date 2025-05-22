
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
      whileTap={{ y: 0 }}
      onClick={onClick}
      className="glass-card p-4 rounded-xl flex items-center space-x-4 cursor-pointer mb-3"
    >
      <div className="bg-primary bg-opacity-10 p-3 rounded-lg text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </motion.div>
  );
};

export default ResourceCard;
