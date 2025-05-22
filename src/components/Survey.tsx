
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { saveSurveyResponse } from "../services/surveyService";
import { surveyData } from "../lib/surveyData";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { Loader2, CheckCircle2 } from "lucide-react";
import TranslateText from "./TranslateText";

const Survey = () => {
  const [selectedCategory, setSelectedCategory] = useState(surveyData[0].id);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedCategories, setCompletedCategories] = useState<string[]>([]);
  
  const { user } = useAuth();
  
  const currentCategory = surveyData.find(cat => cat.id === selectedCategory);
  const currentQuestion = currentCategory?.questions[currentQuestionIndex];
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
  };
  
  const handleNext = async () => {
    if (!currentCategory || !currentQuestion) return;
    
    const answerId = `${currentCategory.id}_${currentQuestion.id}`;
    const selectedAnswer = answers[answerId];
    
    if (!selectedAnswer) {
      toast({
        title: "Please select an answer",
        description: "You need to select an option before continuing",
        variant: "destructive",
      });
      return;
    }
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to save your responses",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save the current question's response
      await saveSurveyResponse(
        currentCategory.id,
        currentQuestion.question,
        selectedAnswer
      );
      
      // If there are more questions, go to the next question
      if (currentQuestionIndex < currentCategory.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Completed all questions in this category
        setCompletedCategories([...completedCategories, currentCategory.id]);
        toast({
          title: "Survey completed",
          description: `Thank you for completing the ${currentCategory.title} survey!`,
        });
        
        // Find the next uncompleted category
        const nextCategory = surveyData.find(
          cat => !completedCategories.includes(cat.id) && cat.id !== currentCategory.id
        );
        
        if (nextCategory) {
          setSelectedCategory(nextCategory.id);
          setCurrentQuestionIndex(0);
        }
      }
    } catch (error) {
      console.error("Error saving survey response:", error);
      toast({
        title: "Error",
        description: "Failed to save your response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const isCategoryCompleted = (categoryId: string) => {
    return completedCategories.includes(categoryId);
  };
  
  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">
        <TranslateText text="Mental Health Assessment" />
      </h2>
      
      <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full">
        <TabsList className="mb-6 flex flex-wrap">
          {surveyData.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="relative flex items-center"
            >
              <span><TranslateText text={category.title} /></span>
              {isCategoryCompleted(category.id) && (
                <CheckCircle2 className="w-4 h-4 ml-1 text-green-500" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {surveyData.map((category) => (
          <TabsContent key={category.id} value={category.id} className="p-4">
            {category.questions[currentQuestionIndex] && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Question {currentQuestionIndex + 1} of {category.questions.length}
                  </h3>
                  <p className="mb-4">{category.questions[currentQuestionIndex].question}</p>
                  
                  <RadioGroup
                    value={answers[`${category.id}_${category.questions[currentQuestionIndex].id}`]}
                    onValueChange={(value) => 
                      setAnswers({
                        ...answers,
                        [`${category.id}_${category.questions[currentQuestionIndex].id}`]: value
                      })
                    }
                  >
                    <div className="space-y-3">
                      {category.questions[currentQuestionIndex].options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={option}
                            id={`option-${index}`}
                          />
                          <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0 || isSubmitting}
                  >
                    <TranslateText text="Previous" />
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : null}
                    {currentQuestionIndex < category.questions.length - 1 ? (
                      <TranslateText text="Next" />
                    ) : (
                      <TranslateText text="Complete" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Survey;
