import React, { useState } from "react";
import PageTransition from "../components/animations/PageTransition";
import { BookOpen, Search, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import TranslateText from "../components/TranslateText";
import { getLearningResources, LearningResource } from "../services/learningService";
import { useQuery } from "@tanstack/react-query";
import LearningResourceDetail from "../components/LearningResourceDetail";

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedResource, setSelectedResource] = useState<LearningResource | null>(null);
  
  const { data: resourcesData = { data: [] }, isLoading, error } = useQuery({
    queryKey: ['learningResources'],
    queryFn: getLearningResources,
  });

  const resources = resourcesData.data || [];

  const filteredResources = resources.filter(
    (resource) =>
      (activeCategory === "All" ||
      resource.category.toLowerCase() === activeCategory.toLowerCase()) &&
      (searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
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

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery("");
  };

  const handleResourceSelect = (resource: LearningResource) => {
    setSelectedResource(resource);
  };

  const handleBackToList = () => {
    setSelectedResource(null);
  };

  return (
    <PageTransition>
      <div className="flex flex-col">
        {!selectedResource ? (
          // List view
          <>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-2"><TranslateText text="Learn" /></h1>
              <p className="text-muted-foreground mb-6">
                <TranslateText text="Explore resources and techniques to improve your mental wellbeing" />
              </p>
            </motion.div>

            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search topics, keywords..."
                className="glass-card pl-10 pr-4 py-3 w-full rounded-xl focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2 mb-6 scrollbar-hidden">
              {["All", "Stress", "Anxiety", "Sleep", "Trauma", "Skills"].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    category === activeCategory
                      ? "bg-primary text-primary-foreground"
                      : "glass-card hover:bg-secondary"
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  <TranslateText text={category} />
                </button>
              ))}
            </div>

            {error && (
              <div className="text-center py-8">
                <p className="text-destructive">
                  <TranslateText text="There was an error loading resources. Please try again later." />
                </p>
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center my-12">
                <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                {filteredResources.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      <TranslateText text="No resources found. Try a different search term." />
                    </p>
                  </div>
                ) : (
                  filteredResources.map((resource, index) => (
                    <motion.div 
                      key={index} 
                      variants={item}
                      onClick={() => handleResourceSelect(resource)}
                    >
                      <div className="glass-card p-4 rounded-xl hover-card cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-left">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground text-left mt-1">
                              {resource.description}
                            </p>
                            <div className="flex space-x-3 mt-3">
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Tag className="h-3 w-3 mr-1" />
                                <span className="capitalize">{resource.category}</span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{resource.timeToRead}</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-primary bg-opacity-10 p-2 rounded-lg">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </>
        ) : (
          // Detail view
          <LearningResourceDetail 
            resource={selectedResource} 
            onBack={handleBackToList} 
          />
        )}
      </div>
    </PageTransition>
  );
};

export default Learn;
