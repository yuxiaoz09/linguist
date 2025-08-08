import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Trophy, Play, BarChart3, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";

const avatarEmojis = {
  bear: '🐻', cat: '🐱', dog: '🐶', elephant: '🐘',
  fox: '🦊', lion: '🦁', owl: '🦉', rabbit: '🐰'
};

const trackColors = {
  pre_alphabetic: 'bg-pink-100 text-pink-800 border-pink-200',
  early_alphabetic: 'bg-blue-100 text-blue-800 border-blue-200',
  full_alphabetic: 'bg-green-100 text-green-800 border-green-200',
  consolidated_alphabetic: 'bg-purple-100 text-purple-800 border-purple-200',
  fluency_building: 'bg-orange-100 text-orange-800 border-orange-200'
};

export default function ChildCard({ child, index, onUpdate, showActions = false }) {
  const trackLabel = child.current_track?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Pre Alphabetic';
  const lastActivity = child.last_activity_date ? 
    format(new Date(child.last_activity_date), 'MMM d') : 'Never';

  // Calculate stars earned this week (simplified calculation)
  const starsThisWeek = Math.floor((child.total_points || 0) / 10);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${child.name}'s profile? This action cannot be undone.`)) {
      try {
        await Child.delete(child.id);
        onUpdate?.();
      } catch (error) {
        console.error('Error deleting child:', error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="card-hover bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardContent className="p-6">
          {/* Header with Avatar and Actions */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                {avatarEmojis[child.avatar_id] || '🐻'}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{child.name}</h3>
                <p className="text-gray-600">Age {child.age}</p>
              </div>
            </div>
            
            {showActions && (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="w-8 h-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={handleDelete}
                  className="w-8 h-8 p-0 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-2xl font-bold text-gray-900">{starsThisWeek}</span>
              </div>
              <p className="text-sm text-gray-600">Stars This Week</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Calendar className="w-4 h-4 text-green-500" />
                <span className="text-2xl font-bold text-gray-900">{child.daily_streak || 0}</span>
              </div>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
          </div>

          {/* Current Level/Module */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Current Module</span>
              <Badge className={`${trackColors[child.current_track]} border text-xs`}>
                Level {child.current_level || 1}
              </Badge>
            </div>
            <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((child.current_level || 1) * 20, 100)}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">{trackLabel}</p>
          </div>

          {/* Badges */}
          {child.badges_earned && child.badges_earned.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-600">
                  {child.badges_earned.length} Badge{child.badges_earned.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}

          {/* Last Activity */}
          <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
            <span>Last Activity:</span>
            <span className="font-medium">{lastActivity}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link to={createPageUrl(`Progress?child=${child.id}`)} className="flex-1">
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-2xl border-gray-200 hover:bg-gray-50 font-semibold"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Progress
              </Button>
            </Link>
            <Link to={createPageUrl(`child/${child.id}/home`)} className="flex-1">
              <Button className="w-full btn-primary text-white h-12 rounded-2xl font-semibold shadow-lg">
                <Play className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}