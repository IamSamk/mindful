import React from "react";
import { motion } from 'framer-motion';
import PageTransition from "../components/animations/PageTransition";
import MoodTracker from "../components/MoodTracker";
import QuickActivities from "../components/QuickActivities";
import QuoteCard from "../components/QuoteCard";
import { Progress } from "@/components/ui/progress";
import { Award, Trophy, Activity } from "lucide-react";
import TranslateText from "../components/TranslateText";
import AIChatInterface from '@/components/AIChat/AIChatInterface';

const Index: React.FC = () => {
  // Get time of day to personalize greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Quotes data
  const quote = "The way to get started is to quit talking and begin doing.";
  const author = "Walt Disney";

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center mb-8">Welcome to Mindful</h1>
          <AIChatInterface />
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Index;
