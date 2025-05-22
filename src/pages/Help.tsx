
import React, { useState } from "react";
import PageTransition from "../components/animations/PageTransition";
import ResourceCard from "../components/ResourceCard";
import { emergencyContacts } from "../lib/data";
import { PhoneCall, MessageCircle, BarChart3, Users, CalendarClock, FileText } from "lucide-react";
import { motion } from "framer-motion";
import TranslateText from "../components/TranslateText";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chatbot from "../components/Chatbot";
import Survey from "../components/Survey";
import AppointmentBooking from "../components/AppointmentBooking";

const Help = () => {
  const [activeTab, setActiveTab] = useState<string>("resources");
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <PageTransition>
      <div className="flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-2"><TranslateText text="Help" /></h1>
          <p className="text-muted-foreground mb-6">
            <TranslateText text="Access resources and support when you need it" />
          </p>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-6"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="resources">
              <TranslateText text="Resources" />
            </TabsTrigger>
            <TabsTrigger value="chat">
              <TranslateText text="Chat with AI" />
            </TabsTrigger>
            <TabsTrigger value="survey">
              <TranslateText text="Assessment" />
            </TabsTrigger>
            <TabsTrigger value="appointment">
              <TranslateText text="Book Appointment" />
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass-card p-4 rounded-xl border-l-4 border-primary mb-6"
            >
              <h3 className="font-medium mb-1"><TranslateText text="Need to talk to someone?" /></h3>
              <p className="text-sm text-muted-foreground mb-3">
                <TranslateText text="Trained professionals are available 24/7 to provide support." />
              </p>
              <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium">
                <TranslateText text="Chat with Support" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4"><TranslateText text="Services" /></h2>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-3 mb-6"
            >
              <motion.div variants={item}>
                <ResourceCard
                  title="Talk to AI Assistant"
                  description="Get immediate support and guidance"
                  icon={<MessageCircle className="h-5 w-5" />}
                  onClick={() => setActiveTab("chat")}
                />
              </motion.div>
              <motion.div variants={item}>
                <ResourceCard
                  title="Take Self-Assessment"
                  description="Check your current mental wellbeing"
                  icon={<FileText className="h-5 w-5" />}
                  onClick={() => setActiveTab("survey")}
                />
              </motion.div>
              <motion.div variants={item}>
                <ResourceCard
                  title="Community Forum"
                  description="Connect with peers who understand"
                  icon={<Users className="h-5 w-5" />}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4"><TranslateText text="Book Appointment" /></h2>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-3 mb-6"
            >
              <motion.div variants={item}>
                <ResourceCard
                  title="General Wellbeing"
                  description="Overall health check and guidance"
                  icon={<CalendarClock className="h-5 w-5" />}
                  onClick={() => setActiveTab("appointment")}
                />
              </motion.div>
              <motion.div variants={item}>
                <ResourceCard
                  title="Physical Health"
                  description="Physical fitness and body health"
                  icon={<CalendarClock className="h-5 w-5" />}
                  onClick={() => setActiveTab("appointment")}
                />
              </motion.div>
              <motion.div variants={item}>
                <ResourceCard
                  title="Mental Health"
                  description="Psychological and emotional wellbeing"
                  icon={<CalendarClock className="h-5 w-5" />}
                  onClick={() => setActiveTab("appointment")}
                />
              </motion.div>
              <motion.div variants={item}>
                <ResourceCard
                  title="Nutrition"
                  description="Diet and nutritional guidance"
                  icon={<CalendarClock className="h-5 w-5" />}
                  onClick={() => setActiveTab("appointment")}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4"><TranslateText text="Emergency Contacts" /></h2>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {emergencyContacts.map((contact, index) => (
                <motion.div key={index} variants={item}>
                  <div className="glass-card p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {contact.description}
                        </p>
                      </div>
                      <a
                        href={`tel:${contact.phone}`}
                        className="bg-primary bg-opacity-10 p-2 rounded-full text-primary"
                      >
                        <PhoneCall className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="chat">
            <Chatbot />
          </TabsContent>
          
          <TabsContent value="survey">
            <Survey />
          </TabsContent>
          
          <TabsContent value="appointment">
            <AppointmentBooking />
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Help;
