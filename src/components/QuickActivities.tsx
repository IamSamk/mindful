
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Brain, Heart, Leaf, Timer, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import ActivityGuide from "./ActivityGuide";
import TranslateText from "./TranslateText";

type Activity = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  steps: {
    instruction: string;
    duration: number;
  }[];
};

const activities: Activity[] = [
  {
    id: "breathing",
    title: "Box Breathing",
    description: "A simple breathing technique to reduce stress and improve focus",
    icon: <Leaf className="h-5 w-5" />,
    duration: "2 min",
    steps: [
      { instruction: "Inhale slowly through your nose for 4 seconds", duration: 4 },
      { instruction: "Hold your breath for 4 seconds", duration: 4 },
      { instruction: "Exhale slowly through your mouth for 4 seconds", duration: 4 },
      { instruction: "Hold your breath for 4 seconds", duration: 4 },
      { instruction: "Inhale slowly through your nose for 4 seconds", duration: 4 },
      { instruction: "Hold your breath for 4 seconds", duration: 4 },
      { instruction: "Exhale slowly through your mouth for 4 seconds", duration: 4 },
      { instruction: "Hold your breath for 4 seconds", duration: 4 },
      { instruction: "Inhale slowly through your nose for 4 seconds", duration: 4 },
      { instruction: "Hold your breath for 4 seconds", duration: 4 },
      { instruction: "Exhale slowly through your mouth for 4 seconds", duration: 4 },
      { instruction: "Hold your breath for 4 seconds", duration: 4 },
      { instruction: "Take a normal breath and notice how you feel", duration: 10 },
    ]
  },
  {
    id: "gratitude",
    title: "Gratitude Practice",
    description: "Take a moment to reflect on things you're grateful for",
    icon: <Heart className="h-5 w-5" />,
    duration: "3 min",
    steps: [
      { instruction: "Find a comfortable position and close your eyes", duration: 10 },
      { instruction: "Take three deep breaths", duration: 15 },
      { instruction: "Think of something in your personal life you're grateful for", duration: 30 },
      { instruction: "Think of something at work you're grateful for", duration: 30 },
      { instruction: "Think of something about yourself you're grateful for", duration: 30 },
      { instruction: "Notice how you feel after reflecting on gratitude", duration: 15 },
    ]
  },
  {
    id: "mindfulness",
    title: "Mindful Moment",
    description: "A quick mindfulness exercise to center yourself",
    icon: <Brain className="h-5 w-5" />,
    duration: "2 min",
    steps: [
      { instruction: "Sit comfortably and close your eyes", duration: 5 },
      { instruction: "Focus on your breathing, noticing each inhale and exhale", duration: 20 },
      { instruction: "Notice three things you can hear around you", duration: 20 },
      { instruction: "Notice three physical sensations in your body", duration: 20 },
      { instruction: "Notice three thoughts passing through your mind without judgment", duration: 20 },
      { instruction: "Take a deep breath and slowly open your eyes", duration: 10 },
    ]
  },
  {
    id: "bodyrelax",
    title: "Progressive Relaxation",
    description: "Quick tension release for your body",
    icon: <Timer className="h-5 w-5" />,
    duration: "2 min",
    steps: [
      { instruction: "Sit or stand comfortably", duration: 5 },
      { instruction: "Tense your shoulders, hold, then release", duration: 10 },
      { instruction: "Tense your arms, hold, then release", duration: 10 },
      { instruction: "Tense your hands, hold, then release", duration: 10 },
      { instruction: "Tense your abdomen, hold, then release", duration: 10 },
      { instruction: "Tense your legs, hold, then release", duration: 10 },
      { instruction: "Tense your feet, hold, then release", duration: 10 },
      { instruction: "Notice how your relaxed body feels now", duration: 10 },
    ]
  },
];

const QuickActivities: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const handleActivityComplete = (activityId: string) => {
    setCompletedActivities((prev) => [...prev, activityId]);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">
        <TranslateText text="Quick activities" />
      </h2>

      <AnimatePresence mode="wait">
        {selectedActivity ? (
          <ActivityGuide
            key={selectedActivity.id}
            title={selectedActivity.title}
            description={selectedActivity.description}
            steps={selectedActivity.steps}
            onComplete={() => handleActivityComplete(selectedActivity.id)}
            onClose={() => setSelectedActivity(null)}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 gap-3"
          >
            {activities.map((activity) => (
              <Button
                key={activity.id}
                variant="outline"
                className={`h-auto py-3 px-4 flex flex-col items-start text-left ${
                  completedActivities.includes(activity.id)
                    ? "border-green-500 bg-green-500/5"
                    : ""
                }`}
                onClick={() => setSelectedActivity(activity)}
              >
                <div className="flex items-center w-full mb-2">
                  <div className="bg-primary/10 p-1.5 rounded-md mr-3">
                    {activity.icon}
                  </div>
                  <span className="font-medium flex-1">
                    {activity.title}
                  </span>
                  {completedActivities.includes(activity.id) ? (
                    <Award className="h-4 w-4 text-green-500 ml-1" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-muted-foreground/70 ml-1" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.duration}
                </span>
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickActivities;
