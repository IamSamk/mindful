
import React from "react";
import PageTransition from "../components/animations/PageTransition";
import MoodTracker from "../components/MoodTracker";
import QuickActivities from "../components/QuickActivities";
import QuoteCard from "../components/QuoteCard";
import { Progress } from "@/components/ui/progress";
import { Award, Trophy, Activity } from "lucide-react";
import TranslateText from "../components/TranslateText";

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
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold">
            <TranslateText text={getTimeBasedGreeting()} />
          </h1>
        </div>

        <MoodTracker />
        
        <QuickActivities />

        <h2 className="text-lg font-semibold mb-4">
          <TranslateText text="Your progress" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="glass-card p-4 rounded-xl flex items-center">
            <Trophy className="w-8 h-8 text-yellow-500 mr-4" />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                <TranslateText text="Day streak" />
              </h3>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
          
          <div className="glass-card p-4 rounded-xl flex items-center">
            <Activity className="w-8 h-8 text-blue-500 mr-4" />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                <TranslateText text="Activities" />
              </h3>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
          
          <div className="glass-card p-4 rounded-xl flex items-center">
            <Award className="w-8 h-8 text-purple-500 mr-4" />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                <TranslateText text="Badges" />
              </h3>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </div>
        
        <QuoteCard quote={quote} author={author} />
      </div>
    </PageTransition>
  );
};

export default Index;
