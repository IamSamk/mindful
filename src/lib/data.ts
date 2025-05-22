export const dailyQuotes = [
  {
    quote: "The strength of the team is each individual member. The strength of each member is the team.",
    author: "Phil Jackson",
  },
  {
    quote: "Courage is not the absence of fear, but rather the assessment that something else is more important than fear.",
    author: "Franklin D. Roosevelt",
  },
  {
    quote: "The bravest are surely those who have the clearest vision of what is before them, glory and danger alike, and yet notwithstanding, go out to meet it.",
    author: "Thucydides",
  },
  {
    quote: "It is not the critic who counts; not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better. The credit belongs to the man who is actually in the arena.",
    author: "Theodore Roosevelt",
  },
  {
    quote: "The ultimate measure of a person is not where they stand in moments of comfort, but where they stand at times of challenge and controversy.",
    author: "Martin Luther King Jr.",
  },
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * dailyQuotes.length);
  return dailyQuotes[randomIndex];
};

export const learningResources = [
  {
    id: "1",
    title: "Understanding Stress Response",
    description: "Learn about the physiological and psychological effects of stress on first responders",
    category: "stress",
    timeToRead: "5 min",
    content: "Stress is a natural response that triggers your body's fight-or-flight mechanism. For first responders, chronic exposure to stressful situations can lead to long-term health effects.\n\nWhen you encounter a stressful situation, your body releases hormones like adrenaline and cortisol. These hormones increase your heart rate, elevate your blood pressure, and boost energy supplies. This response evolved to help humans survive threats by preparing the body for physical action.\n\nWhile this response is helpful in acute situations, chronic activation can lead to health problems including:\n\n- Anxiety and depression\n- Digestive issues\n- Heart disease\n- Sleep problems\n- Weight gain\n- Memory and concentration impairment\n\nAs a first responder, recognizing your body's stress signals is the first step toward managing them effectively. Physical symptoms might include headaches, muscle tension, chest pain, fatigue, or sleep disturbances. Emotional indicators can range from anxiety and restlessness to feeling overwhelmed or irritable.\n\nEffective stress management strategies include:\n\n1. **Mindful breathing**: Taking slow, deep breaths activates your parasympathetic nervous system, which counteracts the stress response.\n\n2. **Physical activity**: Regular exercise helps burn off stress hormones and releases endorphins that improve mood.\n\n3. **Healthy lifestyle choices**: Adequate sleep, balanced nutrition, and limiting caffeine and alcohol can support your body's resilience to stress.\n\n4. **Social connection**: Talking with colleagues who understand your experiences can provide emotional relief and perspective.\n\n5. **Professional support**: Working with a mental health professional who specializes in first responder stress can provide tailored strategies for your specific situation.",
    videoUrl: "https://www.youtube.com/embed/hnpQrMqDoqE"
  },
  {
    id: "2",
    title: "Coping with Traumatic Events",
    description: "Evidence-based techniques for processing traumatic experiences in the field",
    category: "trauma",
    timeToRead: "8 min",
    content: "Exposure to traumatic events is an inherent part of first responder work. This guide covers effective coping strategies.\n\nAs a first responder, you may witness events that most people will never experience. These exposures can accumulate over time and affect your mental wellbeing.\n\n**Normal Reactions to Abnormal Events**\n\nFirst, understand that having reactions to traumatic events is normal and human. These might include:\n\n- Intrusive memories or flashbacks\n- Sleep disturbances or nightmares\n- Heightened alertness or being easily startled\n- Emotional numbness or detachment\n- Difficulty concentrating\n- Irritability or anger\n- Guilt or questioning your actions\n\n**Evidence-Based Coping Strategies**\n\n1. **Psychological First Aid**: Just as you provide medical first aid, psychological first aid involves addressing immediate distress after an incident:\n   - Acknowledge what happened\n   - Allow yourself to feel your emotions\n   - Attend to basic needs (sleep, nutrition, hydration)\n   - Connect with supportive colleagues or loved ones\n\n2. **Critical Incident Stress Management (CISM)**: Many agencies offer CISM debriefings after significant events. These structured conversations help process experiences in a safe environment.\n\n3. **Cognitive Processing Techniques**: These help reframe distressing thoughts about traumatic events:\n   - Identify unhelpful thought patterns (\"I should have done more\")\n   - Challenge these thoughts with reality-based evidence\n   - Develop more balanced perspectives\n\n4. **Mindfulness Practices**: Grounding exercises help manage flashbacks by reconnecting to the present moment:\n   - The 5-4-3-2-1 technique: Name 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste\n   - Body scan meditation\n   - Focused breathing\n\n5. **Professional Support**: Evidence shows that trauma-focused therapies like EMDR (Eye Movement Desensitization and Reprocessing) and CPT (Cognitive Processing Therapy) are particularly effective for first responders.\n\nRemember that seeking help is a sign of strength, not weakness. Just as you would treat a physical injury, addressing psychological impacts of trauma is essential for your long-term wellbeing and career longevity.",
    videoUrl: "https://www.youtube.com/embed/MFzDaBzBlL0"
  },
  {
    id: "3",
    title: "Sleep Hygiene for Shift Workers",
    description: "Improve sleep quality despite irregular work schedules",
    category: "sleep",
    timeToRead: "6 min",
    content: "First responders often work irregular hours that can disrupt natural sleep patterns. This guide provides strategies to improve sleep quality.\n\nShift work presents unique challenges to your body's natural circadian rhythm. Your internal clock is designed to make you feel alert during daylight hours and sleepy at night. When your work schedule conflicts with these natural patterns, sleep disruption often follows.\n\n**The Impact of Poor Sleep**\n\nInsufficient or poor-quality sleep affects:\n- Decision-making and reaction time\n- Emotional regulation\n- Immune function\n- Long-term health (increased risk of cardiovascular disease, diabetes, etc.)\n\n**Practical Sleep Strategies for Shift Workers**\n\n1. **Create a Sleep Sanctuary**\n   - Make your bedroom dark (use blackout curtains)\n   - Keep it cool (65-68°F/18-20°C is optimal)\n   - Minimize noise (use earplugs or white noise machines)\n   - Invest in a comfortable mattress and pillows\n   - Use your bed only for sleep and intimacy\n\n2. **Develop Sleep Routines**\n   - Follow the same pre-sleep ritual regardless of the time of day\n   - Consider activities like a warm shower, light stretching, or reading\n   - Avoid screens 1-2 hours before sleep (or use blue light filters)\n   - Practice relaxation techniques like deep breathing or progressive muscle relaxation\n\n3. **Manage Light Exposure**\n   - Get bright light exposure at the start of your \"day\" (even if it's night)\n   - Wear sunglasses when traveling home after night shifts\n   - Use a bright lightbox during night shifts to stay alert\n   - Avoid bright light before trying to sleep\n\n4. **Timing Considerations**\n   - Be consistent with sleep times when possible\n   - For rotating shifts, try to rotate forward (day → evening → night) rather than backward\n   - After night shifts, decide whether to sleep immediately or stay awake until evening\n\n5. **Nutrition and Substance Considerations**\n   - Avoid caffeine 4-6 hours before sleep\n   - Don't use alcohol as a sleep aid\n   - Eat lighter meals before sleep\n   - Stay hydrated, but taper fluid intake before sleep\n\n6. **Family and Social Support**\n   - Educate family about your sleep needs\n   - Use \"Do Not Disturb\" signs\n   - Schedule family time to maintain connections\n\nRemember that effective sleep management is a critical safety issue for first responders. Prioritizing your sleep is not selfish—it's essential for your performance, safety, and long-term health.",
    videoUrl: "https://www.youtube.com/embed/nm1TxQj9IsQ"
  },
  {
    id: "4",
    title: "Mindfulness Basics for First Responders",
    description: "Practical mindfulness techniques to use before, during, and after high-stress calls",
    category: "skills",
    timeToRead: "7 min",
    content: "Mindfulness practices can help first responders stay present and focused during high-stress situations.\n\nAs a first responder, your attention is your most valuable asset. Mindfulness—the practice of purposeful, non-judgmental awareness of the present moment—can help you maintain focus, make clearer decisions, and recover more effectively after challenging calls.\n\n**Why Mindfulness Works for First Responders**\n\nResearch with law enforcement, firefighters, and EMS personnel shows that regular mindfulness practice can:\n- Reduce stress hormones like cortisol\n- Improve decision-making under pressure\n- Enhance situational awareness\n- Speed recovery after critical incidents\n- Prevent burnout and compassion fatigue\n\n**Practical Mindfulness Techniques**\n\n1. **Before Calls: Centering Practices**\n   - **Two-Minute Breathing Reset**: Breathe in for 4 counts, hold for 1, exhale for 6 counts, repeat for 2 minutes\n   - **Intention Setting**: Take 30 seconds to mentally state your intention (\"I will stay focused and calm regardless of what I encounter\")\n   - **Body Scan**: Quickly check in with your body, noticing any tension and consciously releasing it\n\n2. **During Calls: Tactical Mindfulness**\n   - **Tactical Breathing**: One breath cycle (inhale-exhale) every 4-6 seconds when you need to stay calm\n   - **Sense Grounding**: Briefly notice what you can see, hear, and feel to stay anchored in the present\n   - **Mental Labeling**: Silently name emotions or sensations as they arise (\"feeling anxious,\" \"noticing tension\")\n\n3. **After Calls: Recovery Practices**\n   - **Compartmentalization Ritual**: A specific action (removing gloves, washing hands) with full attention to symbolize \"closing\" the call\n   - **Mindful Movement**: Even 60 seconds of stretching with attention to physical sensations helps reset your nervous system\n   - **Structured Reflection**: Review the call objectively, noting what went well and what you learned\n\n**Implementation Tips**\n\n- Start small: Even 2-minute practices make a difference\n- Use transition moments (shift change, driving, equipment checks) as mindfulness opportunities\n- Practice regularly during non-emergency time to build the skill for high-stress situations\n- Consider using a mindfulness app with short exercises designed for high-stress professions\n- Partner with a colleague for accountability\n\nMindfulness isn't about relaxation (though that may be a side benefit). For first responders, it's a practical tool to maintain peak performance under stress and sustain a long, healthy career in emergency services.",
    videoUrl: "https://www.youtube.com/embed/inpok4MKVLM"
  },
  {
    id: "5",
    title: "Managing Acute Anxiety on the Job",
    description: "Quick techniques to reduce anxiety symptoms during stressful situations",
    category: "anxiety",
    timeToRead: "4 min",
    content: "Anxiety can spike during critical incidents. These techniques can help you manage acute anxiety symptoms.\n\nEven experienced first responders can experience moments of acute anxiety during challenging calls. These evidence-based techniques can help you recognize and manage anxiety symptoms in real-time.\n\n**Recognizing Anxiety in the Field**\n\nPhysical signs may include:\n- Racing heart or palpitations\n- Rapid, shallow breathing\n- Muscle tension, especially in shoulders, jaw, or hands\n- Sweating beyond physical exertion\n- Difficulty focusing or tunnel vision\n- Feeling lightheaded\n\nCognitive and emotional signs include:\n- Racing thoughts or mind going blank\n- Catastrophic thinking (imagining worst outcomes)\n- Feeling overwhelmed or helpless\n- Irritability or anger\n- Urge to escape the situation\n\n**Quick Anxiety Management Techniques**\n\n1. **Physiological Resets**\n   - **Box Breathing**: Inhale (4 counts), hold (4), exhale (4), hold (4), repeat\n   - **Progressive Muscle Tension**: Briefly tense then release major muscle groups\n   - **Cold Stimulus**: Cold water on wrists or face triggers the diving reflex, slowing heart rate\n   - **Bilateral Stimulation**: Alternately tap left and right sides of your body (thighs, shoulders) while maintaining focus on your surroundings\n\n2. **Cognitive Techniques**\n   - **Thought Stopping**: Mentally say \"STOP\" when catastrophic thoughts begin\n   - **Reality Testing**: Ask \"What's actually happening right now?\" vs. what your mind fears\n   - **Task Focus**: Direct attention to the specific next action you need to take\n   - **Perspective Shift**: Ask \"What would I tell a teammate feeling this way?\"\n\n3. **Communication Strategies**\n   - Alert a trusted teammate with a simple code word\n   - Request a specific task that helps maintain focus\n   - Take a brief role shift if possible (e.g., switch from patient care to equipment management)\n\n**Implementation in High-Stress Environments**\n\n- Practice these techniques regularly in lower-stress situations\n- Identify your personal early warning signs of anxiety\n- Develop a personal \"anxiety action plan\" with your go-to techniques\n- Remember that managing anxiety effectively improves performance—it's not a sign of weakness\n\nAfter the incident, take time to process what happened and what helped. Consider whether the anxiety response provides useful information about your training needs, team dynamics, or personal triggers that could be addressed proactively.",
    videoUrl: "https://www.youtube.com/embed/wYJaNxK_oGE"
  },
  {
    id: "6",
    title: "Resilience Training for First Responders",
    description: "Build psychological resilience to bounce back from difficult calls",
    category: "skills",
    timeToRead: "10 min",
    content: "Resilience is the ability to recover quickly from difficulties. This guide provides strategies to strengthen your psychological resilience.\n\nAs a first responder, your psychological resilience—the ability to adapt and bounce back from stress and adversity—is just as important as your physical stamina. The good news is that resilience isn't a fixed trait; it's a set of skills that can be developed with practice.\n\n**Core Components of First Responder Resilience**\n\n1. **Adaptive Thinking Patterns**\n   - Balanced perspective on challenges vs. catastrophizing\n   - Accurate assessment of your role and responsibility\n   - Growth mindset (viewing challenges as opportunities to develop)\n   - Meaning-making (connecting your work to your values)\n\n2. **Effective Self-Regulation**\n   - Recognizing and naming emotions\n   - Maintaining physical homeostasis under stress\n   - Developing recovery routines after high-stress events\n   - Balancing engagement and detachment\n\n3. **Strong Support Network**\n   - Professional connections who understand your experiences\n   - Personal relationships that provide different types of support\n   - Leadership that acknowledges mental health needs\n   - Resources for professional help when needed\n\n**Resilience-Building Practices**\n\n1. **Develop Your Resilience Narrative**\n   - Reflect on past challenges you've overcome\n   - Identify specific skills and strengths that helped you through\n   - Create a personal mantra based on these strengths\n   - Regularly review and update your resilience story\n\n2. **Implement Active Coping Strategies**\n   - Problem-focused approaches for controllable stressors\n   - Emotion-focused approaches for uncontrollable situations\n   - Proactive preparation for anticipated challenges\n   - Regular assessment of strategy effectiveness\n\n3. **Establish Resilience Routines**\n   - Daily practices that build psychological resources\n   - Post-incident recovery protocols\n   - Regular resilience skills training\n   - Ongoing professional development\n\n4. **Create Team Resilience**\n   - Peer support training\n   - Psychological safety in your unit\n   - Shared language around stress and coping\n   - Collective sense-making after difficult calls\n\n**Putting It Into Practice**\n\nStart by assessing your current resilience level. Where do you already show strength? Where could you improve? Then, choose one practice from each component to implement. Remember that resilience is built over time through consistent practice, not overnight.\n\nJust as you maintain your physical readiness through regular training, your psychological resilience requires ongoing attention and development. The investment in these practices pays dividends not only in your professional effectiveness but also in your overall quality of life.",
    videoUrl: "https://www.youtube.com/embed/KZBTYViDPlQ"
  },
  {
    id: "7",
    title: "Post-Traumatic Growth",
    description: "Understanding how trauma can lead to positive psychological changes",
    category: "trauma",
    timeToRead: "9 min",
    content: "Post-traumatic growth refers to positive psychological changes that can occur after experiencing traumatic events.\n\nWhile most discussions about trauma focus on preventing negative outcomes like PTSD, research shows that many people—including first responders—experience significant positive psychological changes following traumatic exposure. This phenomenon, called post-traumatic growth (PTG), doesn't minimize the suffering involved but recognizes that challenge can be a catalyst for profound development.\n\n**Areas of Post-Traumatic Growth**\n\n1. **Greater Appreciation for Life**\n   - Heightened awareness of what truly matters\n   - Deeper gratitude for everyday experiences\n   - Reprioritization of values and time\n\n2. **Stronger Relationships**\n   - Increased emotional openness with others\n   - Better ability to distinguish meaningful connections\n   - Greater compassion and empathy\n\n3. **Recognition of Personal Strength**\n   - Discovering capacities you didn't know you had\n   - Greater confidence in handling future challenges\n   - Self-identification as a survivor rather than a victim\n\n4. **New Possibilities**\n   - Opening of new paths or interests\n   - Career or educational shifts aligned with new priorities\n   - Advocacy or mentorship activities\n\n5. **Spiritual or Existential Development**\n   - Deeper engagement with meaning-of-life questions\n   - Development or refinement of belief systems\n   - Greater sense of purpose\n\n**The PTG Process for First Responders**\n\nPost-traumatic growth isn't automatic or universal. These factors can help foster growth after trauma:\n\n1. **Making Meaning of Experiences**\n   - Reflective practices like journaling or structured reflection\n   - Conversations with trusted colleagues who understand the context\n   - Professional guidance in processing events\n\n2. **Deliberate Rumination vs. Intrusive Thoughts**\n   - Learning to shift from distressing flashbacks to purposeful reflection\n   - Asking \"What can I learn from this?\" rather than \"Why did this happen?\"\n   - Finding constructive lessons without toxic positivity\n\n3. **Community and Cultural Context**\n   - Unit cultures that acknowledge both the hardships and learning opportunities\n   - Rituals that honor difficult experiences\n   - Shared language around growth after adversity\n\n4. **Integration Into Identity**\n   - Incorporating experiences into your life story\n   - Acknowledging both the difficult emotions and the growth\n   - Developing a coherent narrative that includes trauma and growth\n\n**Supporting Growth in Yourself and Others**\n\n- Allow time for processing—growth often emerges months or years after events\n- Avoid pressure to find the \"silver lining\" immediately\n- Create space for both struggle and strength to be acknowledged\n- Recognize that growth coexists with distress; it doesn't replace it\n\nBy understanding post-traumatic growth, first responders can develop a more nuanced view of trauma's potential impacts and foster conditions that support positive psychological change alongside necessary healing.",
    videoUrl: "https://www.youtube.com/embed/qOsBhgEFdnw"
  },
  {
    id: "8",
    title: "Compassion Fatigue Prevention",
    description: "Strategies to maintain empathy while avoiding burnout",
    category: "stress",
    timeToRead: "7 min",
    content: "Compassion fatigue can affect first responders who regularly witness suffering. This guide provides strategies to prevent compassion fatigue.\n\nAs a first responder, empathy is both your greatest strength and a potential vulnerability. Compassion fatigue—the emotional and physical exhaustion that can occur when repeatedly exposed to others' suffering—is a common occupational hazard. Understanding and proactively addressing this condition is essential for career longevity and effectiveness.\n\n**Recognizing Compassion Fatigue**\n\nCompassion fatigue often develops gradually, with signs including:\n\nProfessional impacts:\n- Decreased satisfaction from helping others\n- Reduced empathy toward patients or their families\n- Increased frustration or irritability with those you serve\n- Cynicism about your work's value\n- Decline in work performance or attention to detail\n\nPersonal impacts:\n- Intrusive thoughts about difficult calls\n- Emotional numbness or detachment\n- Physical exhaustion not explained by activity level\n- Sleep disturbances\n- Withdrawal from relationships\n\n**The Compassion Satisfaction-Fatigue Balance**\n\nCompassion fatigue occurs when the emotional costs of caring outweigh the rewards. Prevention focuses on both reducing the costs and enhancing the satisfaction derived from your work.\n\n**Prevention Strategies**\n\n1. **Boundaries and Self-Awareness**\n   - Recognize the difference between empathy (feeling with) and compassion (caring about without absorbing)\n   - Develop mental habits that acknowledge suffering without internalizing it\n   - Create clear start/end-of-shift rituals that help you transition\n   - Practice noticing early warning signs of compassion fatigue\n\n2. **Self-Care Fundamentals**\n   - Prioritize sleep hygiene and recovery time\n   - Maintain physical activity that you genuinely enjoy\n   - Ensure adequate nutrition and hydration during shifts\n   - Engage in meaningful activities completely unrelated to your work\n\n3. **Psychological Strategies**\n   - Practice self-compassion with the same quality of care you show others\n   - Develop a realistic perspective on your role and limitations\n   - Reconnect with the meaning and purpose behind your work\n   - Create \"closure\" for difficult calls through reflection or rituals\n\n4. **Connection and Communication**\n   - Participate in peer support programs\n   - Share experiences with colleagues who understand\n   - Maintain relationships outside your profession\n   - Consider professional support before reaching crisis point\n\n**Implementation for Busy First Responders**\n\n- Start with one small, sustainable change rather than a complete overhaul\n- Schedule self-care activities with the same priority as work shifts\n- Create accountability partnerships with colleagues\n- Remember that preventing compassion fatigue improves your effectiveness\n\nBy maintaining awareness of your emotional responses and implementing these preventive strategies, you can sustain your capacity for compassion throughout your career while protecting your well-being.",
    videoUrl: "https://www.youtube.com/embed/ZsaorjIo1Yc"
  },
  {
    id: "9",
    title: "Effective Communication During Crisis",
    description: "Communication techniques that work under pressure",
    category: "skills",
    timeToRead: "6 min",
    content: "Effective communication is crucial during emergency situations. This guide covers techniques to improve communication under pressure.\n\nIn high-stress situations, communication often breaks down exactly when it's most crucial. As a first responder, mastering crisis communication can significantly improve outcomes for those you serve, enhance team performance, and reduce your own stress.\n\n**The Stress-Communication Challenge**\n\nUnder acute stress, several communication barriers emerge:\n- Cognitive narrowing limits information processing\n- Physiological arousal affects speech patterns\n- Emotional reactions color interpretations\n- Time pressure forces shortcuts\n\nEffective crisis communication requires techniques that work with these realities rather than against them.\n\n**Communicating with Civilians**\n\n1. **Establishing Initial Connection**\n   - Position yourself at eye level when possible\n   - Use simple introduction: name, role, purpose\n   - Speak at 70% of your normal pace\n   - Use a calm, authoritative (not authoritarian) tone\n\n2. **Clarity Techniques**\n   - Use plain language, not codes or jargon\n   - Limit instructions to 3 points or fewer at once\n   - Frame positively: \"Stay here\" vs. \"Don't leave\"\n   - Incorporate visual cues when possible\n\n3. **De-escalation Communication**\n   - Use the person's name if known\n   - Validate emotions without agreeing with misconceptions\n   - Offer choices where possible to restore sense of control\n   - Set clear boundaries with reasons\n\n**Team Communication During Incidents**\n\n1. **Structured Information Exchange**\n   - Use standardized formats (SBAR: Situation, Background, Assessment, Recommendation)\n   - Implement closed-loop communication (order → readback → confirmation)\n   - Designate clear communication roles\n   - Establish regular communication checkpoints\n\n2. **Overcoming Communication Barriers**\n   - Use agreed-upon signals for urgent intervention\n   - Create psychological safety for speaking up\n   - Practice recovery from communication breakdowns\n   - Adjust communication style based on incident phase\n\n**Post-Incident Communication**\n\n1. **Operational Debriefing**\n   - Focus on process and learning, not blame\n   - Use structured format to ensure all perspectives are heard\n   - Document communication lessons for future incidents\n   - Address communication near-misses\n\n2. **Public and Family Communication**\n   - Prepare templated statements for common scenarios\n   - Designate and train spokespersons\n   - Practice difficult notifications\n   - Develop handoff protocols for ongoing communication\n\n**Implementation and Practice**\n\nCrisis communication skills require regular practice to become automatic under stress:\n- Incorporate communication scenarios into existing training\n- Review and analyze real communication examples (successful and problematic)\n- Practice with increasing levels of simulated stress\n- Seek feedback on communication effectiveness\n\nBy implementing these specialized communication techniques, you can significantly improve both operational effectiveness and psychological outcomes for everyone involved in crisis situations.",
    videoUrl: "https://www.youtube.com/embed/1mLQFm3wEfw"
  },
  {
    id: "10",
    title: "Healthy Sleep Cycles for Night Shifts",
    description: "Adjusting your circadian rhythm for overnight work",
    category: "sleep",
    timeToRead: "5 min",
    content: "Night shifts can disrupt your natural sleep cycle. This guide provides strategies to adjust your circadian rhythm for overnight work.\n\nWorking night shifts requires more than just sleeping during the day—it means actively managing your body's circadian rhythm, the internal clock that regulates your sleep-wake cycle and numerous physiological processes. With strategic approaches, you can minimize the negative impacts of shift work on your health and performance.\n\n**Understanding Circadian Disruption**\n\nWhen working nights, you're fighting against your body's natural tendencies to:\n- Be alert during daylight hours\n- Release melatonin (sleep hormone) when it's dark\n- Digest food on a daytime schedule\n- Repair and recover during nighttime sleep\n\n**Strategic Approaches to Night Shift Work**\n\n1. **Fixed vs. Rotating Shifts**\n   - If possible, request fixed night shifts rather than rotating shifts\n   - For fixed nights, maintain your sleep schedule even on days off\n   - For rotating shifts, try to rotate forward (day → evening → night) rather than backward\n\n2. **Light Management**\n   - During night shifts: Expose yourself to bright light\n     - Use high-intensity light (>1000 lux) during first half of shift\n     - Work in well-lit areas\n     - Consider light therapy devices if needed\n   - Before sleep: Minimize light exposure\n     - Wear blue-light blocking glasses 2-3 hours before sleep\n     - Use blackout curtains in your bedroom\n     - Eliminate all light sources during sleep\n\n3. **Sleep Scheduling Options**\n\nChoose the approach that works best for your life circumstances:\n\n   - **Split Sleep**:\n     * Sleep 3-4 hours immediately after shift\n     * Take a 1-2 hour nap before next shift\n     * Works well for family obligations during afternoon\n\n   - **Anchor Sleep**:\n     * Maintain one fixed 4-hour sleep period every day (e.g., always 2pm-6pm)\n     * Add second sleep period when possible\n     * Helps maintain some circadian stability\n\n   - **Complete Inversion**:\n     * Sleep one 7-8 hour period during day\n     * Maintain exact same schedule on days off\n     * Best for long-term night shift workers\n\n4. **Physiological Support**\n   - Time meals to support alertness during shift\n   - Consider circadian timing for medications\n   - Exercise at consistent times relative to your sleep period\n   - Use strategic caffeine timing (early in shift, never within 6 hours of sleep)\n\n**Implementation Timeline**\n\nCircadian adaptation takes time. When beginning night shifts:\n- Expect 4-7 days for partial adaptation\n- Allow 2-3 weeks for more complete adaptation\n- Recognize that complete adaptation may not be possible with rotating shifts\n\n**Long-term Considerations**\n\nLongitudinal research shows night shift work can increase health risks. Mitigate these by:\n- Getting regular health screenings\n- Implementing all available circadian adaptation strategies\n- Limiting years of night shift work when possible\n- Considering internal chronotype when choosing shifts (natural \"night owls\" generally adapt better)\n\nBy approaching night shift work as a specific physiological challenge requiring targeted strategies, you can significantly improve your adaptation, performance, and long-term health outcomes.",
    videoUrl: "https://www.youtube.com/embed/lRp5aC9SMKM"
  }
];

export const emergencyContacts = [
  {
    name: "Crisis Text Line",
    description: "Text HOME to 741741",
    phone: "741741",
  },
  {
    name: "National Suicide Prevention Lifeline",
    description: "Available 24/7",
    phone: "988",
  },
  {
    name: "COPLINE",
    description: "For law enforcement officers in crisis",
    phone: "1-800-267-5463",
  },
  {
    name: "Safe Call Now",
    description: "24/7 crisis line for public safety employees",
    phone: "1-206-459-3020",
  },
];

export const exerciseCategories = [
  {
    title: "Breathing Exercises",
    count: 5,
    description: "Quick techniques to reduce stress and anxiety",
  },
  {
    title: "Guided Meditation",
    count: 8,
    description: "Focus your mind and find inner calm",
  },
  {
    title: "Progressive Relaxation",
    count: 3,
    description: "Release physical tension in your body",
  },
  {
    title: "Mindful Movement",
    count: 4,
    description: "Simple exercises to reconnect body and mind",
  },
];
