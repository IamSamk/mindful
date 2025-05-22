
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { saveMood, getLatestMood } from "../services/moodService";
import { useToast } from "../hooks/use-toast";
import TranslateText from "./TranslateText";

interface MoodOption {
  value: string;
  emoji: string;
  label: string;
}

const moodOptions: MoodOption[] = [
  { value: "great", emoji: "😄", label: "Great" },
  { value: "good", emoji: "🙂", label: "Good" },
  { value: "okay", emoji: "😐", label: "Okay" },
  { value: "bad", emoji: "😔", label: "Bad" },
  { value: "awful", emoji: "😞", label: "Awful" },
];

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchLatestMood = async () => {
      if (user) {
        const { data, error } = await getLatestMood(user.id);
        if (data && !error) {
          setSelectedMood(data.mood);
        }
      }
    };

    fetchLatestMood();
  }, [user]);

  const handleSaveMood = async () => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to save your mood",
        variant: "destructive",
      });
      return;
    }

    if (!selectedMood) return;

    setIsLoading(true);
    try {
      const { error } = await saveMood(user.id, selectedMood);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Mood saved",
        description: "Your mood has been recorded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error saving mood",
        description: error.message || "An error occurred while saving your mood",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-5 rounded-xl mb-6">
      <h3 className="text-lg font-medium mb-4">
        <TranslateText text="How are you feeling today?" />
      </h3>
      <div className="flex justify-between items-center">
        {moodOptions.map((mood) => (
          <motion.button
            key={mood.value}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
              selectedMood === mood.value
                ? "bg-primary bg-opacity-10 ring-2 ring-primary"
                : "hover:bg-secondary"
            }`}
            onClick={() => setSelectedMood(mood.value)}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span className="text-xs font-medium">
              <TranslateText text={mood.label} />
            </span>
          </motion.button>
        ))}
      </div>
      
      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <button 
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium disabled:opacity-70"
            onClick={handleSaveMood}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <TranslateText text="Saving..." />
              </span>
            ) : (
              <TranslateText text="Save Mood" />
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MoodTracker;
