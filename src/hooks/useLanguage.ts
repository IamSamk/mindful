import { useState, useCallback } from 'react';

type Language = 'en' | 'kn' | 'hi'; // English, Kannada, Hindi

interface Translations {
  chatbot: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    send: string;
    processing: string;
  };
  emergency: {
    callHelp: string;
    contactSupervisor: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    chatbot: {
      title: 'Police Support Assistant',
      subtitle: 'How can I help you today?',
      inputPlaceholder: 'Type your message...',
      send: 'Send',
      processing: 'Processing...',
    },
    emergency: {
      callHelp: 'Call Emergency Help',
      contactSupervisor: 'Contact Supervisor',
    },
  },
  kn: {
    chatbot: {
      title: 'ಪೊಲೀಸ್ ಬೆಂಬಲ ಸಹಾಯಕ',
      subtitle: 'ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
      inputPlaceholder: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...',
      send: 'ಕಳುಹಿಸಿ',
      processing: 'ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ...',
    },
    emergency: {
      callHelp: 'ತುರ್ತು ಸಹಾಯ ಕರೆ ಮಾಡಿ',
      contactSupervisor: 'ಮೇಲ್ವಿಚಾರಕರನ್ನು ಸಂಪರ್ಕಿಸಿ',
    },
  },
  hi: {
    chatbot: {
      title: 'पुलिस सहायक',
      subtitle: 'मैं आपकी कैसे मदद कर सकता हूं?',
      inputPlaceholder: 'अपना संदेश टाइप करें...',
      send: 'भेजें',
      processing: 'प्रक्रिया में है...',
    },
    emergency: {
      callHelp: 'आपातकालीन सहायता कॉल करें',
      contactSupervisor: 'सुपरवाइजर से संपर्क करें',
    },
  },
};

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const changeLanguage = useCallback((language: Language) => {
    setCurrentLanguage(language);
  }, []);

  return {
    currentLanguage,
    changeLanguage,
    translations: translations[currentLanguage],
    availableLanguages: Object.keys(translations) as Language[],
  };
}; 