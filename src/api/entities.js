import { mockChildren, mockActivities, mockProgress, mockModules } from './mockData';

// Mock entities - replace with your actual backend API calls
export const Child = {
  find: () => Promise.resolve(mockChildren),
  findById: (id) => Promise.resolve(mockChildren.find(child => child.id === id)),
  create: (data) => Promise.resolve({ id: Date.now().toString(), ...data }),
  update: (id, data) => Promise.resolve({ id, ...data }),
  delete: (id) => Promise.resolve({ success: true })
};

export const Activity = {
  find: () => Promise.resolve(mockActivities),
  findById: (id) => Promise.resolve(mockActivities.find(activity => activity.id === id)),
  create: (data) => Promise.resolve({ id: Date.now().toString(), ...data }),
  update: (id, data) => Promise.resolve({ id, ...data }),
  delete: (id) => Promise.resolve({ success: true })
};

export const Progress = {
  find: () => Promise.resolve(mockProgress),
  findById: (id) => Promise.resolve(mockProgress.find(progress => progress.id === id)),
  findByChild: (childId) => Promise.resolve(mockProgress.filter(progress => progress.childId === childId)),
  create: (data) => Promise.resolve({ id: Date.now().toString(), ...data }),
  update: (id, data) => Promise.resolve({ id, ...data }),
  delete: (id) => Promise.resolve({ success: true })
};

export const Module = {
  find: () => Promise.resolve(mockModules),
  findById: (id) => Promise.resolve(mockModules.find(module => module.id === id)),
  create: (data) => Promise.resolve({ id: Date.now().toString(), ...data }),
  update: (id, data) => Promise.resolve({ id, ...data }),
  delete: (id) => Promise.resolve({ success: true })
};

// Mock auth - replace with your actual authentication
export const User = {
  signIn: (email, password) => Promise.resolve({ 
    user: { id: '1', email, name: 'Demo User' }, 
    token: 'mock-token' 
  }),
  signOut: () => Promise.resolve({ success: true }),
  getCurrentUser: () => Promise.resolve({ id: '1', email: 'demo@example.com', name: 'Demo User' }),
  signUp: (email, password, name) => Promise.resolve({ 
    user: { id: Date.now().toString(), email, name }, 
    token: 'mock-token' 
  })
};