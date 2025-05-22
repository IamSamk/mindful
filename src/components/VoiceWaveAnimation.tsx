
import React, { useEffect, useRef } from 'react';

interface VoiceWaveAnimationProps {
  isPlaying: boolean;
  className?: string;
}

const VoiceWaveAnimation: React.FC<VoiceWaveAnimationProps> = ({ isPlaying, className = "" }) => {
  const numBars = 5;
  
  return (
    <div className={`flex items-center justify-center space-x-1 h-8 ${className}`}>
      {Array.from({ length: numBars }).map((_, i) => (
        <div
          key={i}
          className={`w-1 bg-primary rounded-full transform transition-all duration-75 ${
            isPlaying 
              ? `animate-[voice-wave_${0.5 + (i * 0.1)}s_ease-in-out_infinite]` 
              : 'h-2'
          }`}
          style={{
            animationDelay: `${i * 0.1}s`,
            height: isPlaying ? `${Math.random() * 24 + 8}px` : '8px'
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWaveAnimation;
