import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function ActivityFilters({ filters, onFilterChange }) {
  const handleFilterChange = (key, value) => {
    onFilterChange(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl mb-8">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-700">Filters:</span>
          </div>
          
          <Select
            value={filters.track}
            onValueChange={(value) => handleFilterChange('track', value)}
          >
            <SelectTrigger className="w-48 rounded-xl border-gray-200">
              <SelectValue placeholder="Learning Track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tracks</SelectItem>
              <SelectItem value="pre_alphabetic">Pre-Alphabetic</SelectItem>
              <SelectItem value="early_alphabetic">Early Alphabetic</SelectItem>
              <SelectItem value="full_alphabetic">Full Alphabetic</SelectItem>
              <SelectItem value="consolidated_alphabetic">Consolidated</SelectItem>
              <SelectItem value="fluency_building">Fluency Building</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange('type', value)}
          >
            <SelectTrigger className="w-48 rounded-xl border-gray-200">
              <SelectValue placeholder="Activity Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="letter_recognition">Letter Recognition</SelectItem>
              <SelectItem value="sound_matching">Sound Matching</SelectItem>
              <SelectItem value="word_building">Word Building</SelectItem>
              <SelectItem value="phonics_practice">Phonics Practice</SelectItem>
              <SelectItem value="reading_practice">Reading Practice</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.age}
            onValueChange={(value) => handleFilterChange('age', value)}
          >
            <SelectTrigger className="w-32 rounded-xl border-gray-200">
              <SelectValue placeholder="Age" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ages</SelectItem>
              <SelectItem value="2-3">2-3 years</SelectItem>
              <SelectItem value="4-5">4-5 years</SelectItem>
              <SelectItem value="6-7">6-7 years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}