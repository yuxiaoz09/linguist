import React, { useState, useEffect } from "react";
import { Progress, Child } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function RecentActivity({ children }) {
  const [recentProgress, setRecentProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentActivity();
  }, [children]);

  const loadRecentActivity = async () => {
    if (children.length === 0) {
      setLoading(false);
      return;
    }

    try {
      const progressData = await Progress.list('-completion_date', 10);
      
      // Enrich progress data with child information
      const enrichedProgress = progressData.map(progress => {
        const child = children.find(c => c.id === progress.child_id);
        return {
          ...progress,
          childName: child?.name || 'Unknown Child'
        };
      });

      setRecentProgress(enrichedProgress);
    } catch (error) {
      console.error('Error loading recent activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMasteryColor = (level) => {
    switch (level) {
      case 'mastered': return 'bg-green-100 text-green-800 border-green-200';
      case 'proficient': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'developing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="card-hover bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6">
          <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
            <Clock className="w-6 h-6 text-purple-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentProgress.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent activity</h3>
              <p className="text-gray-600">Activities completed by your children will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentProgress.map((progress, index) => (
                <motion.div
                  key={progress.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white to-purple-50/30 border border-purple-100/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white font-bold">
                    {progress.childName[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{progress.childName}</h4>
                      <Badge className={`text-xs ${getMasteryColor(progress.mastery_level)} border`}>
                        {progress.mastery_level?.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{progress.score}%</span>
                      </div>
                      <span>
                        {format(new Date(progress.completion_date), 'MMM d, h:mm a')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}