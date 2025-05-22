
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

type TranslateTextProps = {
  text: string;
};

// Add translations for all used strings
const translations = {
  en: {},
  kn: {
    "Profile": "ಪ್ರೊಫೈಲ್",
    "Manage your account and settings": "ನಿಮ್ಮ ಖಾತೆ ಮತ್ತು ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    "Settings": "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "Dark Mode": "ಡಾರ್ಕ್ ಮೋಡ್",
    "Language": "ಭಾಷೆ",
    "Notifications": "ಅಧಿಸೂಚನೆಗಳು",
    "Privacy": "ಗೌಪ್ಯತೆ",
    "App Settings": "ಅಪ್ಲಿಕೇಶನ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    "Sign Out": "ಸೈನ್ ಔಟ್",
    "Home": "ಮುಖಪುಟ",
    "Learn": "ಕಲಿಕೆ",
    "Help": "ಸಹಾಯ",
    "Officer Profile": "ಅಧಿಕಾರಿಯ ಪ್ರೋಫೈಲ್",
    "Good morning": "ಶುಭೋದಯ",
    "Good afternoon": "ಶುಭ ಮಧ್ಯಾಹ್ನ",
    "Good evening": "ಶುಭ ಸಂಜೆ",
    "How are you feeling today?": "ನೀವು ಇಂದು ಹೇಗೆ ಭಾವಿಸುತ್ತಿದ್ದೀರಿ?",
    "Quick activities": "ತ್ವರಿತ ಚಟುವಟಿಕೆಗಳು",
    "Your progress": "ನಿಮ್ಮ ಪ್ರಗತಿ",
    "Day streak": "ದಿನದ ಸ್ಟ್ರೀಕ್",
    "Activities": "ಚಟುವಟಿಕೆಗಳು",
    "Badges": "ಬ್ಯಾಡ್ಜುಗಳು",
    "exercises": "ಅಭ್ಯಾಸಗಳು",
    "Access resources and support when you need it": "ನಿಮಗೆ ಬೇಕಾದಾಗ ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಬೆಂಬಲವನ್ನು ಪಡೆಯಿರಿ",
    "Need to talk to someone?": "ಯಾರೊಂದಿಗಾದರೂ ಮಾತನಾಡಬೇಕೇ?",
    "Trained professionals are available 24/7 to provide support.": "ತರಬೇತಿ ಪಡೆದ ವೃತ್ತಿಪರರು 24/7 ಬೆಂಬಲ ನೀಡಲು ಲಭ್ಯವಿದ್ದಾರೆ.",
    "Chat with Support": "ಬೆಂಬಲದೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ",
    "Services": "ಸೇವೆಗಳು",
    "Talk to AI Assistant": "AI ಸಹಾಯಕನೊಂದಿಗೆ ಮಾತನಾಡಿ",
    "Get immediate support and guidance": "ತಕ್ಷಣದ ಬೆಂಬಲ ಮತ್ತು ಮಾರ್ಗದರ್ಶನವನ್ನು ಪಡೆಯಿರಿ",
    "Self-Assessment": "ಸ್ವ-ಮೌಲ್ಯಮಾಪನ",
    "Check your current mental wellbeing": "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಮಾನಸಿಕ ಯೋಗಕ್ಷೇಮವನ್ನು ಪರಿಶೀಲಿಸಿ",
    "Community Forum": "ಸಮುದಾಯ ವೇದಿಕೆ",
    "Connect with peers who understand": "ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಸಹವರ್ತಿಗಳೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ",
    "Book Appointment": "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
    "Schedule a session with a professional": "ವೃತ್ತಿಪರರೊಂದಿಗೆ ಸೆಷನ್ ಅನ್ನು ಶೆಡ್ಯೂಲ್ ಮಾಡಿ",
    "Emergency Contacts": "ತುರ್ತು ಸಂಪರ್ಕಗಳು",
    "Explore resources and techniques to improve your mental wellbeing": "ನಿಮ್ಮ ಮಾನಸಿಕ ಕ್ಷೇಮವನ್ನು ಸುಧಾರಿಸಲು ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ತಂತ್ರಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    "Search topics, keywords...": "ವಿಷಯಗಳು, ಕೀವರ್ಡ್‌ಗಳನ್ನು ಹುಡುಕಿ...",
    "All": "ಎಲ್ಲಾ",
    "Stress": "ಒತ್ತಡ",
    "Anxiety": "ಆತಂಕ",
    "Sleep": "ನಿದ್ರೆ",
    "Trauma": "ಆಘಾತ",
    "Skills": "ಕೌಶಲ್ಯಗಳು",
    "Progress": "ಪ್ರಗತಿ",
    "Step": "ಹೆಜ್ಜೆ",
    "Completed!": "ಪೂರ್ಣಗೊಂಡಿದೆ!",
    "Pause": "ವಿರಾಮ",
    "Start": "ಪ್ರಾರಂಭಿಸಿ",
    "Save Mood": "ಮೂಡ್ ಉಳಿಸಿ",
    "Saving...": "ಉಳಿಸಲಾಗುತ್ತಿದೆ...",
    "Mental Health Support Chat": "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಬೆಂಬಲ ಚಾಟ್",
    "Thinking...": "ಯೋಚಿಸುತ್ತಿದೆ...",
    "Mental Health Assessment": "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಮೌಲ್ಯಮಾಪನ",
    "Resources": "ಸಂಪನ್ಮೂಲಗಳು",
    "Chat with AI": "AI ಜೊತೆ ಚಾಟ್ ಮಾಡಿ",
    "Assessment": "ಮೌಲ್ಯಮಾಪನ",
    "Previous": "ಹಿಂದಿನ",
    "Next": "ಮುಂದಿನ",
    "Complete": "ಪೂರ್ಣಗೊಳಿಸಿ",
    "Take Self-Assessment": "ಸ್ವ-ಮೌಲ್ಯಮಾಪನ ತೆಗೆದುಕೊಳ್ಳಿ",
    "Burnout": "ಬರ್ನ್ಔಟ್",
    "Relationship Issues": "ಸಂಬಂಧದ ಸಮಸ್ಯೆಗಳು",
    "Emotion Regulation": "ಭಾವನಾತ್ಮಕ ನಿಯಂತ್ರಣ",
    "Sleep Issues": "ನಿದ್ರಾ ಸಮಸ್ಯೆಗಳು",
    "Fatigue": "ಆಯಾಸ",
    "Workplace Concerns": "ಕಾರ್ಯಸ್ಥಳದ ಕಾಳಜಿಗಳು",
    "Depression": "ಖಿನ್ನತೆ"
  }
};

const TranslateText: React.FC<TranslateTextProps> = ({ text }) => {
  const { language } = useLanguage();
  
  if (language === 'en' || !text) {
    return <>{text}</>;
  }
  
  // Return translated text if available, otherwise return original text
  return <>{translations[language][text] || text}</>;
};

export default TranslateText;
