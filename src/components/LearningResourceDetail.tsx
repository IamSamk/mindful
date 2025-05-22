
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Clock, Tag } from "lucide-react";
import { LearningResource } from "../lib/supabase";
import { Button } from "./ui/button";
import TranslateText from "./TranslateText";

interface LearningResourceDetailProps {
  resource: LearningResource;
  onBack: () => void;
}

const LearningResourceDetail: React.FC<LearningResourceDetailProps> = ({
  resource,
  onBack,
}) => {
  // Convert content paragraphs for better formatting
  const contentParagraphs = resource.content ? resource.content.split('\n\n') : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full"
    >
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack}
          className="mr-2"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          <TranslateText text="Back" />
        </Button>
      </div>

      <h1 className="text-xl font-bold mb-3">{resource.title}</h1>
      
      <div className="flex space-x-3 mb-4">
        <div className="flex items-center text-xs text-muted-foreground">
          <Tag className="h-3 w-3 mr-1" />
          <span className="capitalize">{resource.category}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>{resource.timeToRead}</span>
        </div>
      </div>

      {resource.videoUrl && (
        <div className="mb-6 rounded-xl overflow-hidden aspect-video bg-muted">
          <iframe 
            className="w-full h-full"
            src={resource.videoUrl}
            title={resource.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="prose prose-sm max-w-none">
        {contentParagraphs.map((paragraph, index) => (
          <p key={index} className="mb-4 text-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

export default LearningResourceDetail;
