
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RefreshCw, CheckCircle, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import TranslateText from "./TranslateText";
import { generateSpeech, playAudio } from "../services/audioService";
import VoiceWaveAnimation from "./VoiceWaveAnimation";
import { useToast } from "./ui/use-toast";

interface Step {
  instruction: string;
  duration: number; // seconds
}

interface ActivityGuideProps {
  title: string;
  description: string;
  steps: Step[];
  onComplete?: () => void;
  onClose: () => void;
}

const ActivityGuide: React.FC<ActivityGuideProps> = ({
  title,
  description,
  steps,
  onComplete,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(steps[0].duration);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
  const elapsedStepsDuration = steps
    .slice(0, currentStepIndex)
    .reduce((acc, step) => acc + step.duration, 0);
  const overallProgress = 
    ((elapsedStepsDuration + (steps[currentStepIndex].duration - timeRemaining)) / totalDuration) * 100;

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      // Stop audio when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            // Time for this step is up
            if (currentStepIndex < steps.length - 1) {
              // Move to next step
              setCurrentStepIndex((prevIndex) => prevIndex + 1);
              return steps[currentStepIndex + 1].duration;
            } else {
              // Activity completed
              setIsActive(false);
              setIsCompleted(true);
              if (onComplete) onComplete();
              if (intervalRef.current) window.clearInterval(intervalRef.current);
              return 0;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isActive, currentStepIndex, steps, onComplete]);

  // Play audio when step changes
  useEffect(() => {
    if (audioEnabled) {
      playInstructionAudio();
    }
  }, [currentStepIndex, audioEnabled]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetActivity = () => {
    setIsActive(false);
    setCurrentStepIndex(0);
    setTimeRemaining(steps[0].duration);
    setIsCompleted(false);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (!audioEnabled) {
      // If enabling audio, play the current instruction
      playInstructionAudio();
    } else {
      // If disabling, stop any playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      }
    }
  };

  const playInstructionAudio = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      setIsPlayingAudio(true);
      const base64Audio = await generateSpeech(steps[currentStepIndex].instruction);
      const audio = playAudio(base64Audio);
      
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlayingAudio(false);
      };
    } catch (error) {
      setIsPlayingAudio(false);
      toast({
        title: "Audio Error",
        description: "Could not play audio instruction",
        variant: "destructive",
      });
      console.error("Error playing audio:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="glass-card rounded-xl p-5 mb-6"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ✕
        </Button>
      </div>
      
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            <TranslateText text="Progress" />
          </span>
          <span className="text-sm">
            {Math.round(overallProgress)}%
          </span>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </div>

      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">
              <TranslateText text="Step" /> {currentStepIndex + 1}/{steps.length}
            </h4>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={toggleAudio}
            >
              {audioEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>
            {isPlayingAudio && <VoiceWaveAnimation isPlaying={isPlayingAudio} />}
          </div>
          <div className="text-xl font-mono font-bold">{formatTime(timeRemaining)}</div>
        </div>
        <p className="text-sm">{steps[currentStepIndex].instruction}</p>
      </div>

      <div className="flex justify-center space-x-4">
        {isCompleted ? (
          <div className="flex flex-col items-center">
            <CheckCircle className="text-green-500 h-8 w-8 mb-2" />
            <span className="text-sm font-medium text-green-500">
              <TranslateText text="Completed!" />
            </span>
          </div>
        ) : (
          <>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={resetActivity} 
              disabled={isCompleted}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button 
              variant={isActive ? "destructive" : "default"}
              onClick={toggleTimer}
              disabled={isCompleted}
            >
              {isActive ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  <TranslateText text="Pause" />
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  <TranslateText text="Start" />
                </>
              )}
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ActivityGuide;
