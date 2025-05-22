import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/hooks/useLanguage';
import { Phone, AlertTriangle } from 'lucide-react';

interface EmergencyContact {
  name: string;
  role: string;
  phone: string;
}

const emergencyContacts: EmergencyContact[] = [
  {
    name: "Emergency Response Team",
    role: "24/7 Support",
    phone: "100",
  },
  {
    name: "Mental Health Helpline",
    role: "Counseling Support",
    phone: "1800-599-0019",
  },
];

export const Emergency: React.FC = () => {
  const { translations } = useLanguage();

  const handleEmergencyCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-destructive text-destructive-foreground p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="h-6 w-6" />
          <h3 className="text-lg font-bold">{translations.emergency.callHelp}</h3>
        </div>
        
        <div className="space-y-2">
          {emergencyContacts.map((contact) => (
            <div key={contact.phone} className="bg-background/10 p-3 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm opacity-90">{contact.role}</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEmergencyCall(contact.phone)}
                  className="flex items-center space-x-1"
                >
                  <Phone className="h-4 w-4" />
                  <span>{contact.phone}</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 