import React, { useState, useEffect } from "react";
import { Child, Progress } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Clock, Star, Award, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

// Sample skills data for visual progress chart
const skillsData = [
  { name: "Letter Recognition (A-F)", status: "mastered", progress: 100 },
  { name: "Letter Recognition (G-L)", status: "proficient", progress: 85 },
  { name: "Letter Recognition (M-R)", status: "developing", progress: 60 },
  { name: "Letter Recognition (S-Z)", status: "not_started", progress: 0 },
  { name: "Basic Phonics", status: "developing", progress: 45 },
  { name: "Sound Matching", status: "mastered", progress: 100 },
  { name: "Word Building", status: "proficient", progress: 75 },
  { name: "Simple Reading", status: "not_started", progress: 0 },
];

export default function ProgressPage() {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState('');
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Check URL parameters for child selection
    const urlParams = new URLSearchParams(window.location.search);
    const childParam = urlParams.get('child');
    if (childParam && children.length > 0) {
      setSelectedChild(childParam);
    }
  }, [children]);

  useEffect(() => {
    if (selectedChild && selectedChild !== 'all') {
      loadProgressForChild(selectedChild);
    } else {
      loadAllProgress();
    }
  }, [selectedChild]);

  const loadData = async () => {
    const childrenData = await Child.list('-updated_date');
    setChildren(childrenData);
    if (childrenData.length > 0) {
      setSelectedChild(childrenData[0].id);
    }
    setLoading(false);
  };

  const loadProgressForChild = async (childId) => {
    const progress = await Progress.filter({ child_id: childId }, '-completion_date', 50);
    setProgressData(progress);
  };

  const loadAllProgress = async () => {
    const progress = await Progress.list('-completion_date', 50);
    setProgressData(progress);
  };

  const getChildName = (childId) => {
    const child = children.find(c => c.id === childId);
    return child?.name || 'Unknown';
  };

  const getSelectedChild = () => {
    return children.find(c => c.id === selectedChild);
  };

  const getMasteryColor = (level) => {
    switch (level) {
      case 'mastered': return 'bg-green-100 text-green-800 border-green-200';
      case 'proficient': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'developing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSkillStatusIcon = (status) => {
    switch (status) {
      case 'mastered': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'proficient': return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
      case 'developing': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getSkillStatusColor = (status) => {
    switch (status) {
      case 'mastered': return 'bg-green-500';
      case 'proficient': return 'bg-blue-500';
      case 'developing': return 'bg-yellow-500';
      default: return 'bg-gray-300';
    }
  };

  const calculateStats = () => {
    if (progressData.length === 0) return { avgScore: 0, totalTime: 0, totalActivities: 0 };
    
    const avgScore = Math.round(
      progressData.reduce((sum, p) => sum + p.score, 0) / progressData.length
    );
    const totalTime = Math.round(
      progressData.reduce((sum, p) => sum + (p.time_spent || 0), 0) / 60
    );
    const totalActivities = progressData.length;

    return { avgScore, totalTime, totalActivities };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-3xl"></div>
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
              Progress Report 📊
            </h1>
            <p className="text-gray-600 text-lg">
              Track learning achievements and growth over time
            </p>
          </div>
          
          {children.length > 0 && (
            <Select value={selectedChild} onValueChange={setSelectedChild}>
              <SelectTrigger className="w-64 rounded-2xl border-gray-200 bg-white shadow-sm">
                <SelectValue placeholder="Select child" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Children</SelectItem>
                {children.map(child => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </motion.div>

        {children.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Progress Data</h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Add children to start tracking their learning progress and achievements.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Stats Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid md:grid-cols-3 gap-6 mb-8"
            >
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-xl rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stats.avgScore}%</div>
                      <div className="text-blue-700 font-medium">Average Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-xl rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stats.totalTime}</div>
                      <div className="text-green-700 font-medium">Minutes Learned</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-xl rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stats.totalActivities}</div>
                      <div className="text-purple-700 font-medium">Activities Done</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Visual Progress Chart */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                    <CardHeader className="p-6 border-b border-gray-100">
                      <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                        Skills Progress {selectedChild !== 'all' && `- ${getChildName(selectedChild)}`}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {skillsData.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white to-gray-50 border border-gray-100"
                          >
                            {getSkillStatusIcon(skill.status)}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                                <Badge className={`text-xs ${getMasteryColor(skill.status)} border`}>
                                  {skill.status.replace('_', ' ')}
                                </Badge>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-500 ${getSkillStatusColor(skill.status)}`}
                                  style={{ width: `${skill.progress}%` }}
                                />
                              </div>
                              <div className="flex justify-between text-sm text-gray-600 mt-1">
                                <span>{skill.progress}% complete</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Activity Log */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                    <CardHeader className="p-6 border-b border-gray-100">
                      <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      {progressData.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BarChart3 className="w-8 h-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No activity yet</h3>
                          <p className="text-gray-600">Completed activities will appear here</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {progressData.slice(0, 10).map((progress, index) => (
                            <motion.div
                              key={progress.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.05 }}
                              className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-white to-gray-50 border border-gray-100"
                            >
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                                {getChildName(progress.child_id)[0]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-gray-900 text-sm truncate">
                                    {getChildName(progress.child_id)}
                                  </h4>
                                  <Badge className={`text-xs ${getMasteryColor(progress.mastery_level)} border`}>
                                    {progress.mastery_level?.replace('_', ' ')}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-600">
                                  <span>{progress.score}%</span>
                                  <span>{Math.round((progress.time_spent || 0) / 60)}m</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}