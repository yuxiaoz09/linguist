import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Star, TrendingUp, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsOverview({ children }) {
  const totalPoints = children.reduce((sum, child) => sum + (child.total_points || 0), 0);
  const avgStreak = children.length > 0 ? 
    Math.round(children.reduce((sum, child) => sum + (child.daily_streak || 0), 0) / children.length) : 0;
  const activeLearners = children.filter(child => {
    const lastActivity = child.last_activity_date;
    if (!lastActivity) return false;
    const daysSince = Math.floor((new Date() - new Date(lastActivity)) / (1000 * 60 * 60 * 24));
    return daysSince <= 7;
  }).length;

  // Calculate total stars earned this week
  const thisWeekStars = children.reduce((sum, child) => {
    // This is a simplified calculation - in a real app you'd check actual weekly progress
    return sum + Math.floor((child.total_points || 0) / 10);
  }, 0);

  const stats = [
    {
      icon: Users,
      label: "Children",
      value: children.length,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      icon: Star,
      label: "Stars This Week",
      value: thisWeekStars.toLocaleString(),
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-100"
    },
    {
      icon: TrendingUp,
      label: "Avg. Streak",
      value: `${avgStreak} days`,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    {
      icon: Calendar,
      label: "Active This Week",
      value: activeLearners,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`card-hover bg-gradient-to-br ${stat.bgColor} border-0 shadow-xl rounded-3xl overflow-hidden`}>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm lg:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}