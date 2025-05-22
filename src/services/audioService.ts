
import { supabase } from '../integrations/supabase/client';

export const generateSpeech = async (text: string, voice = 'alloy'): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('text-to-speech', {
      body: { text, voice },
    });

    if (error) {
      console.error('Error generating speech:', error);
      throw new Error(error.message);
    }

    return data.audioContent; // Base64 encoded audio
  } catch (error) {
    console.error('Error in generateSpeech:', error);
    throw error;
  }
};

export const playAudio = (base64Audio: string): HTMLAudioElement => {
  const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
  audio.play();
  return audio;
};
