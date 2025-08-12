// Mock data for development - replace with your actual backend API calls

export const mockChildren = [
  {
    id: '1',
    name: 'Emma',
    age: 6,
    avatar: '👧',
    createdAt: new Date('2024-01-15'),
    progress: {
      completedActivities: 12,
      totalActivities: 20,
      streak: 5
    }
  },
  {
    id: '2', 
    name: 'Alex',
    age: 5,
    avatar: '👦',
    createdAt: new Date('2024-02-01'),
    progress: {
      completedActivities: 8,
      totalActivities: 20,
      streak: 3
    }
  }
];

export const mockActivities = [
  {
    id: '1',
    title: 'Letter A Learning',
    description: 'Learn the letter A through fun games and sounds',
    type: 'letter',
    difficulty: 'beginner',
    duration: 10,
    completed: false,
    letter: 'A'
  },
  {
    id: '2',
    title: 'Word Building',
    description: 'Build simple words with the letters you know',
    type: 'word',
    difficulty: 'intermediate', 
    duration: 15,
    completed: true,
    words: ['CAT', 'BAT', 'HAT']
  }
];

export const mockProgress = [
  {
    id: '1',
    childId: '1',
    activityId: '1',
    completedAt: new Date('2024-01-20'),
    score: 85,
    timeSpent: 8
  },
  {
    id: '2',
    childId: '1', 
    activityId: '2',
    completedAt: new Date('2024-01-22'),
    score: 92,
    timeSpent: 12
  }
];

export const mockModules = [
  {
    id: '1',
    name: 'Letters',
    description: 'Learn the alphabet through interactive games',
    activities: ['1'],
    order: 1
  },
  {
    id: '2',
    name: 'Words',
    description: 'Build and recognize simple words',
    activities: ['2'],
    order: 2
  }
];