import React, { useState, useEffect } from "react";
import { Child, User } from "@/api/entities";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, BookOpen, Star, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";

import StatsOverview from "../components/dashboard/StatsOverview";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";

export default function Dashboard() {
  const [children, setChildren] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [childrenData, userData] = await Promise.all([
        Child.list('-updated_date'),
        User.me()
      ]);
      setChildren(childrenData);
      setUser(userData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.full_name?.split(' ')[0] || 'Parent'}! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Let's continue the learning journey with your children
            </p>
          </div>
          <Link to={createPageUrl("Children")}>
            <Button className="btn-primary text-white px-6 py-3 rounded-2xl font-semibold shadow-lg">
              <Plus className="w-5 h-5 mr-2" />
              Add Child
            </Button>
          </Link>
        </motion.div>

        {/* Stats Overview */}
        <StatsOverview children={children} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <RecentActivity children={children} />
            
            {/* Children Quick Access */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-hover bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                    <Users className="w-6 h-6 text-blue-600" />
                    Your Children
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {children.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-blue-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No children added yet</h3>
                      <p className="text-gray-600 mb-6">Add your first child to start their learning journey</p>
                      <Link to={createPageUrl("Children")}>
                        <Button className="btn-primary text-white px-6 py-3 rounded-2xl">
                          <Plus className="w-5 h-5 mr-2" />
                          Add Your First Child
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {children.slice(0, 4).map((child) => (
                        <motion.div
                          key={child.id}
                          whileHover={{ scale: 1.02 }}
                          className="p-4 rounded-2xl bg-gradient-to-br from-white to-blue-50/50 border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                              {child.name[0].toUpperCase()}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{child.name}</h4>
                              <p className="text-sm text-gray-500">Age {child.age}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm text-yellow-600">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="font-medium">{child.total_points || 0} points</span>
                            </div>
                            <Link to={createPageUrl(`child/${child.id}/home`)}>
                              <Button size="sm" variant="outline" className="rounded-xl border-blue-200 hover:bg-blue-50">
                                Start Learning
                              </Button>
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <QuickActions />
            
            {/* Learning Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="card-hover bg-gradient-to-br from-green-50 to-blue-50 border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                    <Award className="w-6 h-6 text-green-600" />
                    Today's Tip
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="bg-white/80 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Reading Together</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Spend 15 minutes reading with your child daily. Point to words as you read to help them connect spoken and written language.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}