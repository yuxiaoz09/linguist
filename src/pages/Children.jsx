
import React, { useState, useEffect } from "react";
import { Child } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Star, Calendar, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import AddChildModal from "../components/children/AddChildModal";
import ChildCard from "../components/children/ChildCard";

export default function Children() {
  const [children, setChildren] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    const data = await Child.list('-updated_date');
    setChildren(data);
    setLoading(false);
  };

  const handleChildAdded = (newChild) => {
    setChildren(prev => [newChild, ...prev]);
    setShowAddModal(false);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-gray-200 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Your Children 👨‍👩‍👧‍👦
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your children's learning profiles and track their progress
            </p>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary text-white px-6 py-3 rounded-2xl font-semibold shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Child
          </Button>
        </motion.div>

        {/* Children Grid */}
        <AnimatePresence>
          {children.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Plus className="w-16 h-16 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Your First Child</h2>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Create a profile for your child to start their personalized learning journey with SpeakRead.
              </p>
              <Button 
                onClick={() => setShowAddModal(true)}
                className="btn-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg"
              >
                <Plus className="w-6 h-6 mr-2" />
                Add Child Profile
              </Button>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child, index) => (
                <ChildCard 
                  key={child.id} 
                  child={child} 
                  index={index}
                  onUpdate={loadChildren}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Add Child Modal */}
        <AddChildModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onChildAdded={handleChildAdded}
        />
      </div>
    </div>
  );
}
