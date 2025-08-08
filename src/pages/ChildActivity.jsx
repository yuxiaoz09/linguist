import React, { useState, useEffect } from "react";
import { Child, Progress } from "@/api/entities";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LetterLearning from "../components/learning/LetterLearning";

export default function ChildActivity() {
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Get params from URL
  const urlParams = new URLSearchParams(window.location.search);
  const childId = urlParams.get('childId');
  const activityId = urlParams.get('activityId');

  useEffect(() => {
    if (childId) {
      loadChild();
    }
  }, [childId]);

  const loadChild = async () => {
    try {
      const childData = await Child.filter({ id: childId });
      if (childData.length > 0) {
        setChild(childData[0]);
      }
    } catch (error) {
      console.error('Error loading child:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivityComplete = async (pointsEarned) => {
    if (!child) return;

    try {
      // Update child's points and level
      const newPoints = (child.total_points || 0) + pointsEarned;
      const newLevel = Math.floor(newPoints / 100) + 1; // Level up every 100 points
      
      await Child.update(child.id, {
        total_points: newPoints,
        current_level: Math.max(child.current_level || 1, newLevel),
        last_activity_date: new Date().toISOString().split('T')[0]
      });

      // Create progress record
      await Progress.create({
        child_id: child.id,
        activity_id: `activity_${activityId}`,
        completion_date: new Date().toISOString(),
        score: 85, // Default good score
        time_spent: 300, // 5 minutes default
        attempts: 1,
        mastery_level: 'proficient'
      });

      // Navigate back to child home
      window.location.href = createPageUrl(`ChildHome?childId=${childId}`);
      
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Child not found</h2>
          <Link to={createPageUrl("Dashboard")}>
            <Button className="btn-primary text-white px-6 py-3 rounded-2xl">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Render different activities based on activityId
  const renderActivity = () => {
    switch (activityId) {
      case 'letter_a':
        return (
          <LetterLearning
            letter="A"
            childName={child.name}
            onComplete={handleActivityComplete}
          />
        );
      case 'letter_b':
        return (
          <LetterLearning
            letter="B"
            childName={child.name}
            onComplete={handleActivityComplete}
          />
        );
      case 'letter_c':
        return (
          <LetterLearning
            letter="C"
            childName={child.name}
            onComplete={handleActivityComplete}
          />
        );
      default:
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Activity Coming Soon! 🚧
            </h2>
            <p className="text-gray-600 mb-8">
              We're working hard to bring you more fun learning activities.
            </p>
            <Link to={createPageUrl(`ChildHome?childId=${childId}`)}>
              <Button className="btn-primary text-white px-6 py-3 rounded-2xl">
                Back to Activities
              </Button>
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="p-4">
        <Link to={createPageUrl(`ChildHome?childId=${childId}`)}>
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Activity Content */}
      {renderActivity()}
    </div>
  );
}