import React, { useState, useEffect } from "react";
import { Child } from "@/api/entities";
import { useParams, Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play, Trophy, BookOpen, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const avatarEmojis = {
  bear: '🐻', cat: '🐱', dog: '🐶', elephant: '🐘',
  fox: '🦊', lion: '🦁', owl: '🦉', rabbit: '🐰'
};

const trackActivities = {
  pre_alphabetic: [
    { id: 'sounds', title: 'Animal Sounds', emoji: '🐄', difficulty: 'Easy' },
    { id: 'shapes', title: 'Shape Matching', emoji: '🔵', difficulty: 'Easy' },
    { id: 'colors', title: 'Color Fun', emoji: '🌈', difficulty: 'Easy' }
  ],
  early_alphabetic: [
    { id: 'letter_a', title: 'Learn Letter A', emoji: '🍎', difficulty: 'Easy' },
    { id: 'letter_b', title: 'Learn Letter B', emoji: '⚽', difficulty: 'Easy' },
    { id: 'letter_c', title: 'Learn Letter C', emoji: '🐱', difficulty: 'Medium' }
  ],
  full_alphabetic: [
    { id: 'phonics', title: 'Phonics Fun', emoji: '🔤', difficulty: 'Medium' },
    { id: 'blending', title: 'Sound Blending', emoji: '🎵', difficulty: 'Medium' },
    { id: 'word_families', title: 'Word Families', emoji: '👨‍👩‍👧‍👦', difficulty: 'Hard' }
  ]
};

export default function ChildHome() {
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Get childId from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const childId = urlParams.get('childId');

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

  const activities = trackActivities[child.current_track] || trackActivities.early_alphabetic;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Learning Time!</h1>
          </div>
          
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Child Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-r from-orange-100 to-pink-100 border-0 shadow-2xl rounded-3xl mb-8 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className="w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-400 rounded-3xl flex items-center justify-center text-4xl shadow-xl"
                >
                  {avatarEmojis[child.avatar_id] || '🐻'}
                </motion.div>
                
                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Hi {child.name}! 👋
                  </h2>
                  <p className="text-gray-700 text-lg mb-4">
                    Ready for some fun learning activities?
                  </p>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-bold text-gray-900">{child.total_points || 0} Points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-orange-500" />
                      <span className="font-bold text-gray-900">{child.daily_streak || 0} Day Streak</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Your Progress</h3>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  Level {child.current_level || 1}
                </Badge>
              </div>
              <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((child.current_level || 1) * 20, 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {child.current_track?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Track
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Choose Your Adventure! 🚀
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={createPageUrl(`ChildActivity?childId=${childId}&activityId=${activity.id}`)}>
                  <Card className="card-hover bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden h-full">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl shadow-lg"
                      >
                        {activity.emoji}
                      </motion.div>
                      
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {activity.title}
                      </h4>
                      
                      <Badge 
                        variant="outline" 
                        className={`mb-4 ${
                          activity.difficulty === 'Easy' ? 'border-green-200 text-green-700 bg-green-50' :
                          activity.difficulty === 'Medium' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                          'border-red-200 text-red-700 bg-red-50'
                        }`}
                      >
                        {activity.difficulty}
                      </Badge>
                      
                      <Button className="w-full btn-primary text-white rounded-2xl font-semibold shadow-lg">
                        <Play className="w-5 h-5 mr-2" />
                        Start Activity
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-xl rounded-3xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{child.total_points || 0}</div>
                  <div className="text-sm text-gray-600">Total Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{child.daily_streak || 0}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{child.current_level || 1}</div>
                  <div className="text-sm text-gray-600">Current Level</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{child.badges_earned?.length || 0}</div>
                  <div className="text-sm text-gray-600">Badges</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}