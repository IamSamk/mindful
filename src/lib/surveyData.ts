
export type SurveyQuestion = {
  id: string;
  question: string;
  options: string[];
}

export type SurveyCategory = {
  id: string;
  title: string;
  questions: SurveyQuestion[];
}

export const surveyData: SurveyCategory[] = [
  {
    id: 'stress',
    title: 'Stress',
    questions: [
      {
        id: 'stress_1',
        question: 'What is the main cause of your stress right now?',
        options: [
          'Work-related', 
          'Personal/family issues', 
          'Financial concerns', 
          'Health problems', 
          'Other (please specify)'
        ]
      },
      {
        id: 'stress_2',
        question: 'On a scale of 1-10, how would you rate your current stress level?',
        options: [
          '1-3 (low)', 
          '4-6 (moderate)', 
          '7-10 (high)'
        ]
      },
      {
        id: 'stress_3',
        question: 'What strategies have you tried to manage your stress?',
        options: [
          'Exercise', 
          'Relaxation techniques (e.g., deep breathing, meditation)', 
          'Talking to friends/family', 
          'Seeking professional help', 
          'None of the above'
        ]
      },
      {
        id: 'stress_4',
        question: 'Do you feel like your stress is impacting your daily life?',
        options: [
          'Yes, significantly', 
          'Yes, moderately', 
          'No, not really'
        ]
      },
      {
        id: 'stress_5',
        question: 'What are you hoping to achieve by addressing your stress?',
        options: [
          'Improved mental and physical health', 
          'Better work-life balance', 
          'Stronger relationships', 
          'Increased productivity and focus',
          'All of the above'
        ]
      }
    ]
  },
  {
    id: 'burnout',
    title: 'Burnout',
    questions: [
      {
        id: 'burnout_1',
        question: 'Which of the following best describes your current work situation?',
        options: [
          'Feeling overwhelmed and exhausted', 
          'Lacking motivation and engagement', 
          'Experiencing a decline in work performance', 
          'All of the above'
        ]
      },
      {
        id: 'burnout_2',
        question: 'On a scale of 1-10, how severe would you say your burnout is?',
        options: [
          '1-3 (mild)', 
          '4-6 (moderate)', 
          '7-10 (severe)'
        ]
      },
      {
        id: 'burnout_3',
        question: 'What factors do you believe are contributing to your burnout?',
        options: [
          'Excessive workload', 
          'Lack of work-life balance', 
          'Lack of support from colleagues or management', 
          'Feeling undervalued or unappreciated', 
          'All of the above'
        ]
      },
      {
        id: 'burnout_4',
        question: 'What strategies have you tried to manage your burnout?',
        options: [
          'Taking breaks and vacations', 
          'Practicing self-care (e.g., exercise, hobbies)', 
          'Seeking support from a therapist or coach', 
          'Communicating with your employer about your concerns', 
          'None of the above'
        ]
      },
      {
        id: 'burnout_5',
        question: 'What is your primary goal in addressing your burnout?',
        options: [
          'Regaining a sense of purpose and motivation', 
          'Improving work-life balance and reducing stress', 
          'Enhancing job performance and productivity', 
          'Preserving your mental and physical health', 
          'All of the above'
        ]
      }
    ]
  },
  {
    id: 'anxiety',
    title: 'Anxiety',
    questions: [
      {
        id: 'anxiety_1',
        question: 'Which of the following best describes the type of anxiety you\'re experiencing?',
        options: [
          'Persistent worrying',
          'Fear of social situations',
          'Panic attacks (sudden, intense feelings of fear)',
          'Irrational fear of certain objects or situations',
          'I\'m not sure'
        ]
      },
      {
        id: 'anxiety_2',
        question: 'On a scale of 1-10, how would you rate the intensity of your anxiety symptoms?',
        options: [
          '1-3 (mild)',
          '4-6 (moderate)',
          '7-10 (severe)'
        ]
      },
      {
        id: 'anxiety_3',
        question: 'How often do you experience anxiety-related symptoms?',
        options: [
          'Daily',
          'Several times a week',
          'Occasionally',
          'Rarely'
        ]
      },
      {
        id: 'anxiety_4',
        question: 'What strategies have you tried to manage your anxiety?',
        options: [
          'Counselling or psychotherapy',
          'Relaxation techniques (e.g., deep breathing, meditation)',
          'Medication prescribed by a healthcare provider',
          'Lifestyle changes (e.g., exercise, sleep hygiene)',
          'None of the above'
        ]
      },
      {
        id: 'anxiety_5',
        question: 'What is your primary goal in addressing your anxiety?',
        options: [
          'Reducing the frequency and intensity of anxiety episodes',
          'Improving your ability to cope with anxious thoughts and feelings',
          'Enhancing your overall quality of life and well-being',
          'All of the above'
        ]
      }
    ]
  },
  {
    id: 'depression',
    title: 'Depression',
    questions: [
      {
        id: 'depression_1',
        question: 'Which of the following best describes the symptoms of depression you\'re experiencing?',
        options: [
          'Persistent feelings of sadness, hopelessness, or emptiness',
          'Loss of interest or pleasure in activities you once enjoyed',
          'Changes in sleep, appetite, or energy levels',
          'Difficulty concentrating or making decisions',
          'All of the above'
        ]
      },
      {
        id: 'depression_2',
        question: 'On a scale of 1-10, how would you rate the severity of your depressive symptoms?',
        options: [
          '1-3 (mild)',
          '4-6 (moderate)',
          '7-10 (severe)'
        ]
      },
      {
        id: 'depression_3',
        question: 'How long have you been experiencing these depressive symptoms?',
        options: [
          'Less than 2 weeks',
          '2-4 weeks',
          '1-6 months',
          '6 months or longer'
        ]
      },
      {
        id: 'depression_4',
        question: 'What strategies have you tried to manage your depression?',
        options: [
          'Therapy or counselling',
          'Antidepressant medication',
          'Exercise, healthy lifestyle changes',
          'Talking to friends and family',
          'None of the above'
        ]
      },
      {
        id: 'depression_5',
        question: 'What is your primary goal in addressing your depression?',
        options: [
          'Improving your mood and overall emotional well-being',
          'Regaining interest and enjoyment in daily activities',
          'Enhancing your ability to function in work, relationships, and daily life',
          'All of the above'
        ]
      }
    ]
  },
  {
    id: 'relationship',
    title: 'Relationship Issues',
    questions: [
      {
        id: 'relationship_1',
        question: 'Which of the following best describes the relationship challenge you\'re facing?',
        options: [
          'Conflict or communication issues with a partner',
          'Difficulties in a family or friend relationship',
          'Feeling isolated or lacking strong social connections',
          'All of the above'
        ]
      },
      {
        id: 'relationship_2',
        question: 'On a scale of 1-10, how would you rate the level of distress you\'re experiencing in this relationship?',
        options: [
          '1-3 (low)',
          '4-6 (moderate)',
          '7-10 (high)'
        ]
      },
      {
        id: 'relationship_3',
        question: 'What factors do you believe are contributing to the relationship challenge?',
        options: [
          'Unresolved past hurts or resentment',
          'Differences in communication styles or expectations',
          'Lack of quality time or emotional intimacy',
          'External stressors impacting the relationship',
          'All of the above'
        ]
      },
      {
        id: 'relationship_4',
        question: 'What strategies have you tried to address the relationship challenge?',
        options: [
          'Communicating openly and actively listening',
          'Seeking couples or family therapy',
          'Setting boundaries or making compromises',
          'Spending more quality time together',
          'None of the above'
        ]
      },
      {
        id: 'relationship_5',
        question: 'What is your primary goal in addressing the relationship challenge?',
        options: [
          'Improving mutual understanding and conflict resolution',
          'Strengthening emotional intimacy and connection',
          'Restoring trust, respect, and overall relationship satisfaction',
          'All of the above'
        ]
      }
    ]
  },
  {
    id: 'emotion',
    title: 'Emotion Regulation',
    questions: [
      {
        id: 'emotion_1',
        question: 'Which of the following best describes the emotional regulation challenges you\'re experiencing?',
        options: [
          'Difficulty controlling feelings of anger, sadness, or anxiety',
          'Experiencing intense emotional reactions that feel overwhelming',
          'Struggling to express emotions in a healthy, constructive way',
          'All of the above'
        ]
      },
      {
        id: 'emotion_2',
        question: 'On a scale of 1-10, how would you rate the impact of these emotional regulation issues on your daily life?',
        options: [
          '1-3 (low impact)',
          '4-6 (moderate impact)',
          '7-10 (high impact)'
        ]
      },
      {
        id: 'emotion_3',
        question: 'When do you typically have the most difficulty regulating your emotions?',
        options: [
          'In interpersonal conflicts or stressful situations',
          'When feeling fatigued or overwhelmed',
          'During major life transitions or changes',
          'All of the above'
        ]
      },
      {
        id: 'emotion_4',
        question: 'What strategies have you tried to improve your emotional regulation skills?',
        options: [
          'Practicing mindfulness or other emotion-focused techniques',
          'Seeking counselling or therapy',
          'Implementing lifestyle changes like exercise or sleep hygiene',
          'None of the above'
        ]
      },
      {
        id: 'emotion_5',
        question: 'What is your primary goal in addressing your emotional regulation challenges?',
        options: [
          'Developing more control over intense emotional reactions',
          'Improving your ability to communicate emotions effectively',
          'Enhancing your overall emotional well-being and resilience',
          'All of the above'
        ]
      }
    ]
  },
  {
    id: 'sleep',
    title: 'Sleep Issues',
    questions: [
      {
        id: 'sleep_1',
        question: 'Which of the following sleep-related issues are you experiencing?',
        options: [
          'Difficulty falling asleep',
          'Frequent waking during the night',
          'Feeling unrested despite adequate time in bed',
          'All of the above'
        ]
      },
      {
        id: 'sleep_2',
        question: 'On a scale of 1-10, how would you rate the severity of your sleep difficulties?',
        options: [
          '1-3 (mild)',
          '4-6 (moderate)',
          '7-10 (severe)'
        ]
      },
      {
        id: 'sleep_3',
        question: 'How long have you been struggling with these sleep problems?',
        options: [
          'Less than 2 weeks',
          '2-4 weeks',
          '1-6 months',
          '6 months or longer'
        ]
      },
      {
        id: 'sleep_4',
        question: 'What strategies have you tried to improve your sleep?',
        options: [
          'Establishing a consistent sleep routine',
          'Limiting screen time and caffeine before bed',
          'Using relaxation techniques or sleep aids',
          'Consulting a healthcare provider',
          'None of the above'
        ]
      },
      {
        id: 'sleep_5',
        question: 'What is your primary goal in addressing your sleep issues?',
        options: [
          'Falling asleep faster and staying asleep through the night',
          'Waking up feeling more rested and energized',
          'Improving your overall physical and mental health',
          'All of the above'
        ]
      }
    ]
  },
  {
    id: 'fatigue',
    title: 'Fatigue',
    questions: [
      {
        id: 'fatigue_1',
        question: 'Which of the following best describes the fatigue you\'re experiencing?',
        options: [
          'Persistent lack of energy or motivation',
          'Feeling physically drained or exhausted',
          'Difficulty concentrating or completing tasks',
          'All of the above'
        ]
      },
      {
        id: 'fatigue_2',
        question: 'On a scale of 1-10, how would you rate the impact of your fatigue on your daily life?',
        options: [
          '1-3 (low impact)',
          '4-6 (moderate impact)',
          '7-10 (high impact)'
        ]
      },
      {
        id: 'fatigue_3',
        question: 'When do you typically feel the most fatigued?',
        options: [
          'In the morning',
          'After work or during the afternoon',
          'During or after stressful or demanding activities',
          'All of the above'
        ]
      },
      {
        id: 'fatigue_4',
        question: 'What potential factors do you believe are contributing to your fatigue?',
        options: [
          'Lack of sleep or poor sleep quality',
          'Underlying medical condition',
          'High levels of stress or burnout',
          'All of the above'
        ]
      },
      {
        id: 'fatigue_5',
        question: 'What is your primary goal in addressing your fatigue?',
        options: [
          'Increasing your energy levels and productivity',
          'Improving your physical and mental well-being',
          'Enhancing your ability to engage in daily activities',
          'All of the above'
        ]
      }
    ]
  },
  {
    id: 'workplace',
    title: 'Workplace Concerns',
    questions: [
      {
        id: 'workplace_1',
        question: 'Which of the following best describes the workplace challenge you\'re facing?',
        options: [
          'Difficulty managing work-related stress or burnout',
          'Conflicts or communication issues with colleagues',
          'Feeling unfulfilled or lacking a sense of purpose in your work',
          'All of the above'
        ]
      },
      {
        id: 'workplace_2',
        question: 'On a scale of 1-10, how would you rate the level of distress this workplace challenge is causing you?',
        options: [
          '1-3 (low)',
          '4-6 (moderate)',
          '7-10 (high)'
        ]
      },
      {
        id: 'workplace_3',
        question: 'How long have you been dealing with this particular workplace challenge?',
        options: [
          'Less than 6 months',
          '6 months to 1 year',
          '1-2 years',
          'More than 2 years'
        ]
      },
      {
        id: 'workplace_4',
        question: 'What strategies have you tried to address the workplace challenge you\'re facing?',
        options: [
          'Communicating with your manager or HR',
          'Seeking support from colleagues or a professional coach',
          'Exploring options for job changes or career transitions',
          'All of the above',
          'None of the above'
        ]
      },
      {
        id: 'workplace_5',
        question: 'What is your primary goal in resolving the workplace challenge?',
        options: [
          'Reducing work-related stress and improving job satisfaction',
          'Enhancing your professional relationships and collaboration',
          'Finding greater meaning, purpose, or fulfilment in your work',
          'All of the above'
        ]
      }
    ]
  }
];
