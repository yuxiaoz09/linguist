import React, { useState } from "react";
import { Child } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "lucide-react";

const avatars = [
  { id: 'bear', emoji: '🐻', name: 'Bear' },
  { id: 'cat', emoji: '🐱', name: 'Cat' },
  { id: 'dog', emoji: '🐶', name: 'Dog' },
  { id: 'elephant', emoji: '🐘', name: 'Elephant' },
  { id: 'fox', emoji: '🦊', name: 'Fox' },
  { id: 'lion', emoji: '🦁', name: 'Lion' },
  { id: 'owl', emoji: '🦉', name: 'Owl' },
  { id: 'rabbit', emoji: '🐰', name: 'Rabbit' }
];

export default function AddChildModal({ isOpen, onClose, onChildAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    avatar_id: 'bear'
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age) return;

    setSaving(true);
    try {
      // Determine appropriate track based on age
      let currentTrack = 'pre_alphabetic';
      const age = parseInt(formData.age);
      
      if (age >= 6) currentTrack = 'consolidated_alphabetic';
      else if (age >= 5) currentTrack = 'full_alphabetic';
      else if (age >= 4) currentTrack = 'early_alphabetic';

      const newChild = await Child.create({
        ...formData,
        age: parseInt(formData.age),
        current_track: currentTrack,
        current_level: 1,
        total_points: 0,
        daily_streak: 0,
        badges_earned: []
      });

      onChildAdded(newChild);
      setFormData({ name: '', age: '', avatar_id: 'bear' });
    } catch (error) {
      console.error('Error creating child:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-3xl border-0 shadow-2xl">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            Add Child Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
              Child's Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your child's name"
              className="h-12 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-sm font-semibold text-gray-700">
              Age
            </Label>
            <Select
              value={formData.age}
              onValueChange={(value) => setFormData(prev => ({ ...prev, age: value }))}
            >
              <SelectTrigger className="h-12 rounded-2xl border-gray-200">
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(age => (
                  <SelectItem key={age} value={age.toString()}>
                    {age} years old
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">
              Choose Avatar
            </Label>
            <div className="grid grid-cols-4 gap-3">
              {avatars.map(avatar => (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, avatar_id: avatar.id }))}
                  className={`w-full aspect-square rounded-2xl border-2 transition-all duration-300 flex items-center justify-center text-2xl hover:scale-105 ${
                    formData.avatar_id === avatar.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  {avatar.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-2xl border-gray-200 hover:bg-gray-50"
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 rounded-2xl btn-primary text-white font-semibold"
              disabled={saving || !formData.name || !formData.age}
            >
              {saving ? 'Creating...' : 'Create Profile'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}