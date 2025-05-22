import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface WellnessMetrics {
  date: string;
  stressLevel: number;
  moodScore: number;
  interactionCount: number;
}

interface UserReport {
  metrics: WellnessMetrics[];
  summary: {
    averageStress: number;
    averageMood: number;
    totalInteractions: number;
    recommendations: string[];
  };
}

export const UserReport: React.FC = () => {
  const [report, setReport] = useState<UserReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserReport();
  }, []);

  const fetchUserReport = async () => {
    try {
      const response = await fetch('http://localhost:8000/user-report', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch report');
      }

      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error('Error fetching report:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Progress value={30} className="w-1/2" />
      </div>
    );
  }

  if (!report) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Report Unavailable</CardTitle>
          <CardDescription>
            Unable to load your wellness report. Please try again later.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Wellness Report</CardTitle>
          <CardDescription>
            Your mental and physical well-being overview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={report.metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="stressLevel"
                  stroke="#ff4757"
                  name="Stress Level"
                />
                <Line
                  type="monotone"
                  dataKey="moodScore"
                  stroke="#2ed573"
                  name="Mood Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium">Average Stress</p>
                <h3 className="text-2xl font-bold">{report.summary.averageStress}</h3>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium">Average Mood</p>
                <h3 className="text-2xl font-bold">{report.summary.averageMood}</h3>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium">Total Interactions</p>
                <h3 className="text-2xl font-bold">{report.summary.totalInteractions}</h3>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Recommendations</h4>
              <ul className="list-disc pl-5 space-y-2">
                {report.summary.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={fetchUserReport}>Refresh Report</Button>
      </div>
    </div>
  );
}; 