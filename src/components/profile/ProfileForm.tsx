
import React, { useState, useEffect } from "react";
import { UserProfile, updateUserProfile, getUserProfile } from "../../services/profileService";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import TranslateText from "../TranslateText";
import { Loader2 } from "lucide-react";

const ProfileForm = () => {
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile();
      if (data) {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric values
    if (
      ["age", "years_of_service", "height", "weight"].includes(name) && 
      value !== ""
    ) {
      setProfile({ ...profile, [name]: parseFloat(value) });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleArrayChange = (name: string, value: string) => {
    const array = value.split(',').map(item => item.trim());
    setProfile({ ...profile, [name]: array });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    await updateUserProfile(profile);
    
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold"><TranslateText text="Personal Information" /></h2>
      
      <div className="space-y-2">
        <Label htmlFor="full_name"><TranslateText text="Full Name" /></Label>
        <Input
          id="full_name"
          name="full_name"
          value={profile.full_name || ""}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="unit"><TranslateText text="Unit" /></Label>
          <Input
            id="unit"
            name="unit"
            value={profile.unit || ""}
            onChange={handleChange}
            placeholder="Your unit"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="position"><TranslateText text="Position" /></Label>
          <Input
            id="position"
            name="position"
            value={profile.position || ""}
            onChange={handleChange}
            placeholder="Your position"
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6"><TranslateText text="Socio-Demographic Information" /></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age"><TranslateText text="Age" /></Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={profile.age || ""}
            onChange={handleChange}
            placeholder="Your age"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender"><TranslateText text="Gender" /></Label>
          <select
            id="gender"
            name="gender"
            value={profile.gender || ""}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="education_level"><TranslateText text="Education Level" /></Label>
          <select
            id="education_level"
            name="education_level"
            value={profile.education_level || ""}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="">Select education level</option>
            <option value="high_school">High School</option>
            <option value="associate">Associate's Degree</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="doctorate">Doctorate</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="marital_status"><TranslateText text="Marital Status" /></Label>
          <select
            id="marital_status"
            name="marital_status"
            value={profile.marital_status || ""}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="">Select marital status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="years_of_service"><TranslateText text="Years of Service" /></Label>
        <Input
          id="years_of_service"
          name="years_of_service"
          type="number"
          value={profile.years_of_service || ""}
          onChange={handleChange}
          placeholder="Years of service"
        />
      </div>

      <h2 className="text-xl font-semibold mt-6"><TranslateText text="Physical Health Information" /></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height"><TranslateText text="Height (cm)" /></Label>
          <Input
            id="height"
            name="height"
            type="number"
            step="0.01"
            value={profile.height || ""}
            onChange={handleChange}
            placeholder="Height in cm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight"><TranslateText text="Weight (kg)" /></Label>
          <Input
            id="weight"
            name="weight"
            type="number"
            step="0.01"
            value={profile.weight || ""}
            onChange={handleChange}
            placeholder="Weight in kg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="blood_group"><TranslateText text="Blood Group" /></Label>
          <select
            id="blood_group"
            name="blood_group"
            value={profile.blood_group || ""}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          >
            <option value="">Select blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="medical_conditions"><TranslateText text="Medical Conditions" /></Label>
        <Input
          id="medical_conditions"
          name="medical_conditions"
          value={profile.medical_conditions ? profile.medical_conditions.join(', ') : ""}
          onChange={(e) => handleArrayChange('medical_conditions', e.target.value)}
          placeholder="Enter medical conditions, separated by commas"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="allergies"><TranslateText text="Allergies" /></Label>
        <Input
          id="allergies"
          name="allergies"
          value={profile.allergies ? profile.allergies.join(', ') : ""}
          onChange={(e) => handleArrayChange('allergies', e.target.value)}
          placeholder="Enter allergies, separated by commas"
        />
      </div>

      <Button type="submit" className="w-full" disabled={saving}>
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <TranslateText text="Saving..." />
          </>
        ) : (
          <TranslateText text="Save Profile" />
        )}
      </Button>
    </form>
  );
};

export default ProfileForm;
