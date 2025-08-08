import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Users } from "lucide-react";
import { motion } from "framer-motion";

const activityIcons = {
  letter_recognition: '🔤',
  sound_matching: '🔊',
  word_building: '🧩',
  phonics_practice: '📖',
  reading_practice: '📚'
};

const trackColors = {
  pre_alphabetic: 'from-pink-400 to-rose-400',
  early_alphabetic: 'from-blue-400 to-cyan-400',
  full_alphabetic: 'from-green-400 to-emerald-400',
  consolidated_alphabetic: 'from-purple-400 to-violet-400',
  fluency_building: 'from-orange-400 to-amber-400'
};

export default function ActivityCard({ activity, index }) {
  const trackLabel = activity.track?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';
  const typeLabel = activity.activity_type?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="card-hover bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden h-full">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${trackColors[activity.track]} rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
              {activityIcons[activity.activity_type] || '📚'}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 truncate">{activity.title}</h3>
              <p className="text-sm text-gray-600">{typeLabel}</p>
            </div>
          </div>

          {/* Track and Level */}
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-xs">
              {trackLabel}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Level {activity.level}
            </Badge>
          </div>

          {/* Target Letter */}
          {activity.target_letter && (
            <div className="mb-4">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {activity.target_letter.toUpperCase()}
                </div>
                <p className="text-xs text-gray-600">Target Letter</p>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{activity.estimated_duration || 15} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{activity.points_value || 10} pts</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Age {activity.minimum_age || 2}+</span>
            </div>
          </div>

          {/* Preview Button */}
          <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl border border-blue-100 text-blue-700 font-medium transition-all duration-300 hover:shadow-md">
            Preview Activity
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}