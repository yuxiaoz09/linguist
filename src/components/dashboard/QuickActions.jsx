
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Zap, Play } from "lucide-react"; // Updated imports for new icons
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function QuickActions() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock avatar emojis mapping (as implied by child.avatar_id in the JSX)
  const avatarEmojis = {
    1: '🦊',
    2: '🐻',
    3: '🐰',
    4: '🐼',
    5: '🦁',
    6: '🐵'
  };

  useEffect(() => {
    const loadChildren = async () => {
      setLoading(true);
      try {
        // Simulate an asynchronous data fetch
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        // Mock child data
        const mockChildren = [
          { id: 'child1', name: 'Mia', avatar_id: 1, current_level: 5 },
          { id: 'child2', name: 'Leo', avatar_id: 2, current_level: 3 },
          { id: 'child3', name: 'Zoe', avatar_id: 3, current_level: 7 },
          { id: 'child4', name: 'Noah', avatar_id: 4, current_level: 2 },
          { id: 'child5', name: 'Ava', avatar_id: 5, current_level: 6 },
        ];
        setChildren(mockChildren);
      } catch (error) {
        console.error("Failed to load children:", error);
        // In a real application, you might set an error state here
      } finally {
        setLoading(false);
      }
    };

    loadChildren();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="card-hover bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6">
          <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
            <Zap className="w-6 h-6 text-purple-600" /> {/* Changed icon to Zap */}
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : children.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Children Added Yet</h3>
              <p className="text-gray-600 text-sm mb-4">
                Add your first child to get started with personalized learning!
              </p>
              <Link to={createPageUrl("Children")}>
                <Button className="btn-primary text-white px-4 py-2 rounded-xl font-medium">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Child
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {children.slice(0, 3).map((child) => (
                <motion.div
                  key={child.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link to={createPageUrl(`ChildHome?childId=${child.id}`)}>
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl hover:from-purple-100 hover:to-pink-100 transition-all duration-200 cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-xl">
                        {avatarEmojis[child.avatar_id] || '🐻'}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{child.name}</h4>
                        <p className="text-sm text-gray-600">Level {child.current_level || 1}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Play className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">Start Learning</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            
              {children.length > 3 && (
                <Link to={createPageUrl("Children")}>
                  <div className="text-center py-3">
                    <Button variant="outline" className="text-sm">
                      View All Children ({children.length})
                    </Button>
                  </div>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
