
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import TranslateText from "./TranslateText";

type WellbeingOfficer = {
  id: string;
  name: string;
  specialization: string;
  availability: string[];
};

// Sample data for wellbeing officers
const wellbeingOfficers: Record<string, WellbeingOfficer[]> = {
  general: [
    { id: 'g1', name: 'Dr. Sarah Johnson', specialization: 'General Wellness', availability: ['10:00', '11:00', '14:00'] },
    { id: 'g2', name: 'Dr. Michael Patel', specialization: 'Primary Care', availability: ['09:00', '13:00', '16:00'] },
  ],
  physical: [
    { id: 'p1', name: 'Dr. Emily Chen', specialization: 'Physical Therapy', availability: ['09:00', '10:00', '15:00'] },
    { id: 'p2', name: 'Dr. James Wilson', specialization: 'Sports Medicine', availability: ['11:00', '13:00', '17:00'] },
  ],
  mental: [
    { id: 'm1', name: 'Dr. Lisa Rodriguez', specialization: 'Clinical Psychology', availability: ['09:00', '14:00', '16:00'] },
    { id: 'm2', name: 'Dr. Robert Kim', specialization: 'Psychiatry', availability: ['10:00', '13:00', '15:00'] },
  ],
  nutrition: [
    { id: 'n1', name: 'Dr. Jennifer Taylor', specialization: 'Dietetics', availability: ['10:00', '12:00', '14:00'] },
    { id: 'n2', name: 'Dr. David Nguyen', specialization: 'Nutritional Science', availability: ['09:00', '11:00', '15:00'] },
  ],
};

const AppointmentBooking = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [selectedOfficer, setSelectedOfficer] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    setSelectedOfficer(null);
    setTime(null);
  };

  const handleOfficerSelect = (officerId: string) => {
    setSelectedOfficer(officerId);
    setTime(null);
  };

  const handleBookAppointment = () => {
    if (!category || !selectedOfficer || !date || !time) {
      toast({
        title: "Missing information",
        description: "Please select all required fields to book an appointment",
        variant: "destructive",
      });
      return;
    }

    const officer = wellbeingOfficers[category].find(o => o.id === selectedOfficer);
    
    toast({
      title: "Appointment booked!",
      description: `Your appointment with ${officer?.name} is scheduled for ${format(date, 'PPP')} at ${time}.`,
      variant: "default",
    });
  };

  const selectedOfficerData = category && selectedOfficer
    ? wellbeingOfficers[category].find(o => o.id === selectedOfficer)
    : null;

  return (
    <div className="space-y-6">
      {!category ? (
        <>
          <h3 className="text-lg font-medium"><TranslateText text="Select a Category" /></h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="p-4 h-auto flex flex-col items-center gap-2" 
              onClick={() => handleCategorySelect('general')}
            >
              <span className="text-lg font-medium"><TranslateText text="General" /></span>
              <span className="text-sm text-muted-foreground"><TranslateText text="Overall wellbeing" /></span>
            </Button>
            <Button 
              variant="outline" 
              className="p-4 h-auto flex flex-col items-center gap-2" 
              onClick={() => handleCategorySelect('physical')}
            >
              <span className="text-lg font-medium"><TranslateText text="Physical" /></span>
              <span className="text-sm text-muted-foreground"><TranslateText text="Physical health" /></span>
            </Button>
            <Button 
              variant="outline" 
              className="p-4 h-auto flex flex-col items-center gap-2" 
              onClick={() => handleCategorySelect('mental')}
            >
              <span className="text-lg font-medium"><TranslateText text="Mental" /></span>
              <span className="text-sm text-muted-foreground"><TranslateText text="Mental health" /></span>
            </Button>
            <Button 
              variant="outline" 
              className="p-4 h-auto flex flex-col items-center gap-2" 
              onClick={() => handleCategorySelect('nutrition')}
            >
              <span className="text-lg font-medium"><TranslateText text="Nutrition" /></span>
              <span className="text-sm text-muted-foreground"><TranslateText text="Diet & nutrition" /></span>
            </Button>
          </div>
        </>
      ) : !selectedOfficer ? (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              <TranslateText text="Select a Wellbeing Officer" />
            </h3>
            <Button variant="ghost" onClick={() => setCategory(null)}>
              <TranslateText text="Back" />
            </Button>
          </div>
          <div className="space-y-3">
            {wellbeingOfficers[category].map((officer) => (
              <div
                key={officer.id}
                className="p-4 border rounded-lg cursor-pointer hover:bg-accent"
                onClick={() => handleOfficerSelect(officer.id)}
              >
                <h4 className="font-medium">{officer.name}</h4>
                <p className="text-sm text-muted-foreground">{officer.specialization}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              <TranslateText text="Schedule Your Appointment" />
            </h3>
            <Button variant="ghost" onClick={() => setSelectedOfficer(null)}>
              <TranslateText text="Back" />
            </Button>
          </div>
          
          <div className="p-4 border rounded-lg mb-4">
            <h4 className="font-medium">{selectedOfficerData?.name}</h4>
            <p className="text-sm text-muted-foreground">{selectedOfficerData?.specialization}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">
                <TranslateText text="Select Date" />
              </h4>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <TranslateText text="Pick a date" />}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => {
                      const now = new Date();
                      return (
                        date < now ||
                        date.getDay() === 0 ||
                        date.getDay() === 6
                      );
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">
                <TranslateText text="Select Time" />
              </h4>
              <Select 
                onValueChange={setTime} 
                value={time || ""}
                disabled={!date}
              >
                <SelectTrigger>
                  <SelectValue placeholder={<TranslateText text="Select a time" />} />
                </SelectTrigger>
                <SelectContent>
                  {selectedOfficerData?.availability.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {slot}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleBookAppointment} 
              disabled={!date || !time}
            >
              <TranslateText text="Book Appointment" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentBooking;
