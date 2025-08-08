import React, { useState, useEffect } from "react";
import { User, Child } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, User as UserIcon, Bell, Clock, CreditCard, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [children, setChildren] = useState([]);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    weeklyReports: true,
    achievementAlerts: true,
    sessionTimeLimit: 30,
    autoLogout: true,
    parentalControls: true
  });
  const [childSettings, setChildSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, childrenData] = await Promise.all([
        User.me(),
        Child.list('-updated_date')
      ]);
      
      setUser(userData);
      setChildren(childrenData);
      
      // Initialize child-specific settings
      const childSettingsObj = {};
      childrenData.forEach(child => {
        childSettingsObj[child.id] = {
          sessionTimeLimit: 30,
          difficultyLevel: 'auto',
          voiceEnabled: true
        };
      });
      setChildSettings(childSettingsObj);
      
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // In a real app, you would save these settings to the database
      // For now, we'll just simulate the save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // You could save to user profile like this:
      // await User.updateMyUserData({ settings, childSettings });
      
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateChildSetting = (childId, key, value) => {
    setChildSettings(prev => ({
      ...prev,
      [childId]: {
        ...prev[childId],
        [key]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="grid gap-6">
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-blue-600" />
            Settings ⚙️
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your account, children's learning preferences, and app settings
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Account Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <UserIcon className="w-6 h-6 text-blue-600" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={user?.full_name || ''}
                      className="h-12 rounded-2xl border-gray-200"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      value={user?.email || ''}
                      className="h-12 rounded-2xl border-gray-200"
                      readOnly
                    />
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Account Security</h4>
                      <p className="text-sm text-blue-700">Your account is secured with Google authentication</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subscription Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-6">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <CreditCard className="w-6 h-6 text-green-600" />
                  Subscription Management
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Free Plan</h3>
                    <p className="text-gray-600">Access to basic learning activities</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>• Up to 2 children</span>
                      <span>• Basic progress tracking</span>
                      <span>• Core activities</span>
                    </div>
                  </div>
                  <Button className="btn-primary text-white px-6 py-3 rounded-2xl font-semibold">
                    Upgrade to Pro
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <Bell className="w-6 h-6 text-orange-600" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                    <div>
                      <h4 className="font-semibold text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive general updates and announcements</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                    <div>
                      <h4 className="font-semibold text-gray-900">Weekly Progress Reports</h4>
                      <p className="text-sm text-gray-600">Get weekly summaries of your children's progress</p>
                    </div>
                    <Switch
                      checked={settings.weeklyReports}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, weeklyReports: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                    <div>
                      <h4 className="font-semibold text-gray-900">Achievement Alerts</h4>
                      <p className="text-sm text-gray-600">Notifications when children reach milestones</p>
                    </div>
                    <Switch
                      checked={settings.achievementAlerts}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, achievementAlerts: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Session & Time Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6">
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                  <Clock className="w-6 h-6 text-purple-600" />
                  Session & Time Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Default Session Time Limit
                    </Label>
                    <Select
                      value={settings.sessionTimeLimit.toString()}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, sessionTimeLimit: parseInt(value) }))}
                    >
                      <SelectTrigger className="w-48 rounded-2xl border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-600 mt-2">Recommended session length for focused learning</p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                    <div>
                      <h4 className="font-semibold text-gray-900">Auto-logout</h4>
                      <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
                    </div>
                    <Switch
                      checked={settings.autoLogout}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoLogout: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Child-Specific Settings */}
          {children.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                <CardHeader className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                    <UserIcon className="w-6 h-6 text-cyan-600" />
                    Individual Child Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {children.map((child) => (
                      <div key={child.id} className="p-6 rounded-2xl bg-gradient-to-r from-white to-gray-50 border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                            {child.name[0].toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{child.name}</h3>
                            <p className="text-gray-600">Age {child.age}</p>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700">
                              Session Time Limit
                            </Label>
                            <Select
                              value={childSettings[child.id]?.sessionTimeLimit?.toString() || "30"}
                              onValueChange={(value) => updateChildSetting(child.id, 'sessionTimeLimit', parseInt(value))}
                            >
                              <SelectTrigger className="rounded-xl border-gray-200">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15">15 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="45">45 minutes</SelectItem>
                                <SelectItem value="60">60 minutes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700">
                              Difficulty Level
                            </Label>
                            <Select
                              value={childSettings[child.id]?.difficultyLevel || "auto"}
                              onValueChange={(value) => updateChildSetting(child.id, 'difficultyLevel', value)}
                            >
                              <SelectTrigger className="rounded-xl border-gray-200">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="auto">Auto-adjust</SelectItem>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="challenging">Challenging</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700">
                              Voice Guidance
                            </Label>
                            <div className="flex items-center h-10 px-3 rounded-xl border border-gray-200 bg-white">
                              <Switch
                                checked={childSettings[child.id]?.voiceEnabled ?? true}
                                onCheckedChange={(checked) => updateChildSetting(child.id, 'voiceEnabled', checked)}
                              />
                              <span className="ml-3 text-sm text-gray-700">
                                {childSettings[child.id]?.voiceEnabled ?? true ? 'Enabled' : 'Disabled'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-end"
          >
            <Button
              onClick={handleSaveSettings}
              disabled={saving}
              className="btn-primary text-white px-8 py-3 rounded-2xl font-semibold shadow-lg"
            >
              {saving ? 'Saving Settings...' : 'Save All Settings'}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}