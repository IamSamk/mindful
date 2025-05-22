
import React, { useState, useEffect } from "react";
import PageTransition from "../components/animations/PageTransition";
import { motion } from "framer-motion";
import {
  UserRound,
  Moon,
  Bell,
  Shield,
  Settings,
  LogOut,
  ChevronRight,
  Globe,
  User,
  Lock,
  BellRing,
} from "lucide-react";
import TranslateText from "../components/TranslateText";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ProfileForm from "../components/profile/ProfileForm";
import PasswordChange from "../components/profile/PasswordChange";
import Notifications from "../components/profile/Notifications";
import { getUnreadNotificationsCount } from "../services/profileService";

const Profile = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [activeTab, setActiveTab] = useState("profile");
  const [unreadCount, setUnreadCount] = useState(0);
  const { language, setLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const count = await getUnreadNotificationsCount();
      setUnreadCount(count);
    };

    fetchUnreadCount();
    // Set up a interval to check for new notifications every minute
    const interval = setInterval(fetchUnreadCount, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error signing out",
        variant: "destructive",
      });
    }
  };

  const MenuLink = ({ icon, label, onClick }: { 
    icon: React.ReactNode; 
    label: string; 
    onClick?: () => void 
  }) => (
    <motion.button
      whileHover={{ x: 2 }}
      onClick={onClick}
      className="flex justify-between items-center w-full p-3 rounded-lg hover:bg-secondary"
    >
      <div className="flex items-center">
        <div className="bg-primary bg-opacity-10 p-2 rounded-lg mr-3">
          {icon}
        </div>
        <TranslateText text={label} />
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </motion.button>
  );

  return (
    <PageTransition>
      <div className="flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-6"><TranslateText text="Profile" /></h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass-card p-5 rounded-xl flex items-center mb-6"
        >
          <div className="bg-primary bg-opacity-10 p-4 rounded-full mr-4">
            <UserRound className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-lg">{user ? user.email : <TranslateText text="Guest User" />}</h2>
            <p className="text-sm text-muted-foreground">
              <TranslateText text="Manage your account and settings" />
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <TranslateText text="Profile" />
              </TabsTrigger>
              <TabsTrigger value="password" className="flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                <TranslateText text="Password" />
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center relative">
                <BellRing className="h-4 w-4 mr-2" />
                <TranslateText text="Notifications" />
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-1 absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileForm />
            </TabsContent>

            <TabsContent value="password">
              <PasswordChange />
            </TabsContent>

            <TabsContent value="notifications">
              <Notifications />
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4"><TranslateText text="Settings" /></h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="glass-card rounded-xl divide-y divide-border mb-6"
        >
          <div className="flex justify-between items-center p-3">
            <div className="flex items-center">
              <div className="bg-primary bg-opacity-10 p-2 rounded-lg mr-3">
                <Moon className="h-5 w-5 text-primary" />
              </div>
              <TranslateText text="Dark Mode" />
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isDarkMode ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex justify-between items-center p-3">
            <div className="flex items-center">
              <div className="bg-primary bg-opacity-10 p-2 rounded-lg mr-3">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <TranslateText text="Language" />
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'kn')}
              className="bg-background border border-input rounded-md px-3 py-1"
            >
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
            </select>
          </div>

          <MenuLink
            icon={<Bell className="h-5 w-5 text-primary" />}
            label="Notifications"
            onClick={() => setActiveTab("notifications")}
          />
          <MenuLink
            icon={<Shield className="h-5 w-5 text-primary" />}
            label="Privacy"
          />
          <MenuLink
            icon={<Settings className="h-5 w-5 text-primary" />}
            label="App Settings"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <button 
            className="flex items-center justify-center w-full p-3 text-destructive rounded-lg border border-destructive border-opacity-20 hover:bg-destructive hover:bg-opacity-10"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <TranslateText text="Sign Out" />
          </button>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Profile;
