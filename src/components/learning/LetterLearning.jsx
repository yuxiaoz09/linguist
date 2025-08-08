import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, RotateCcw, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AudioPlayer from "./AudioPlayer";

const LETTER_EXAMPLES = {
  'A': ['Apple', 'Ant', 'Airplane'],
  'B': ['Ball', 'Bear', 'Book'],
  'C': ['Cat', 'Car', 'Cake'],
  'D': ['Dog', 'Duck', 'Door'],
  'E': ['Elephant', 'Egg', 'Eye'],
  'F': ['Fish', 'Flower', 'Fire'],
  'G': ['Goat', 'Guitar', 'Gift'],
  'H': ['Hat', 'House', 'Horse'],
  'I': ['Ice', 'Island', 'Insect'],
  'J': ['Jar', 'Jump', 'Juice'],
};

const ACTIVITY_STEPS = [
  'introduction',
  'sound_practice', 
  'word_examples',
  'recognition_quiz',
  'completion'
];

export default function LetterLearning({ 
  letter = 'A', 
  onComplete, 
  childName = 'Student' 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentStepName = ACTIVITY_STEPS[currentStep];
  const examples = LETTER_EXAMPLES[letter.toUpperCase()] || ['Apple', 'Ant', 'Airplane'];

  const nextStep = () => {
    if (currentStep < ACTIVITY_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowFeedback(false);
    }
  };

  const restartActivity = () => {
    setCurrentStep(0);
    setScore(0);
    setSelectedAnswers([]);
    setShowFeedback(false);
  };

  const handleQuizAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowFeedback(true);
    setTimeout(() => {
      nextStep();
    }, 1500);
  };

  const generateQuizOptions = () => {
    const correctAnswers = examples.slice(0, 2);
    const wrongAnswers = ['Zebra', 'Xylophone', 'Yogurt', 'Umbrella'].slice(0, 2);
    return [...correctAnswers, ...wrongAnswers].sort(() => Math.random() - 0.5);
  };

  const quizOptions = generateQuizOptions();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Learning Letter {letter.toUpperCase()}
          </h2>
          <Badge variant="outline" className="text-sm">
            Step {currentStep + 1} of {ACTIVITY_STEPS.length}
          </Badge>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / ACTIVITY_STEPS.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Introduction Step */}
        {currentStepName === 'introduction' && (
          <motion.div
            key="introduction"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-2xl rounded-3xl">
              <CardContent className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-32 h-32 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
                >
                  <span className="text-6xl font-bold text-white">
                    {letter.toUpperCase()}
                  </span>
                </motion.div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Hello {childName}! 👋
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Today we're going to learn about the letter <strong>{letter.toUpperCase()}</strong>! 
                  Let's hear how it sounds.
                </p>

                <div className="mb-8">
                  <AudioPlayer 
                    text={`The letter ${letter.toUpperCase()}`}
                    autoPlay={true}
                    size="large"
                    className="justify-center"
                  />
                </div>

                <Button
                  onClick={nextStep}
                  className="btn-primary text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg"
                >
                  Let's Start Learning! <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Sound Practice Step */}
        {currentStepName === 'sound_practice' && (
          <motion.div
            key="sound_practice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-0 shadow-2xl rounded-3xl">
              <CardContent className="p-12 text-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="w-40 h-40 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
                >
                  <span className="text-7xl font-bold text-white">
                    {letter.toUpperCase()}
                  </span>
                </motion.div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Letter Sound Practice
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  The letter {letter.toUpperCase()} makes the "{letter.toLowerCase()}" sound. 
                  Listen and repeat!
                </p>

                <div className="space-y-6 mb-8">
                  <AudioPlayer 
                    text={`${letter.toUpperCase()} says ${letter.toLowerCase()}`}
                    size="large"
                    className="justify-center"
                  />
                  
                  <div className="bg-white/80 rounded-2xl p-6 max-w-md mx-auto">
                    <p className="text-gray-700 font-medium mb-4">Try saying it yourself:</p>
                    <div className="text-4xl font-bold text-blue-600">
                      "{letter.toLowerCase()}"
                    </div>
                  </div>
                </div>

                <Button
                  onClick={nextStep}
                  className="btn-primary text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg"
                >
                  I've Got It! <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Word Examples Step */}
        {currentStepName === 'word_examples' && (
          <motion.div
            key="word_examples"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-2xl rounded-3xl">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Words That Start With {letter.toUpperCase()}
                  </h2>
                  <p className="text-xl text-gray-600">
                    Here are some words that begin with the "{letter.toLowerCase()}" sound:
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {examples.map((word, index) => (
                    <motion.div
                      key={word}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card className="card-hover bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
                        <CardContent className="p-6 text-center">
                          <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">
                              {word === 'Apple' && '🍎'}
                              {word === 'Ant' && '🐜'}
                              {word === 'Airplane' && '✈️'}
                              {word === 'Ball' && '⚽'}
                              {word === 'Bear' && '🐻'}
                              {word === 'Book' && '📚'}
                              {word === 'Cat' && '🐱'}
                              {word === 'Car' && '🚗'}
                              {word === 'Cake' && '🎂'}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{word}</h3>
                          <AudioPlayer 
                            text={word}
                            showText={false}
                            size="small"
                            className="justify-center"
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <Button
                    onClick={nextStep}
                    className="btn-primary text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg"
                  >
                    Ready for Quiz! <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Recognition Quiz Step */}
        {currentStepName === 'recognition_quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-2xl rounded-3xl">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Quick Quiz! 🧠
                  </h2>
                  <p className="text-xl text-gray-600">
                    Which words start with the letter {letter.toUpperCase()}?
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {quizOptions.map((word, index) => {
                    const isCorrect = examples.includes(word);
                    const isSelected = selectedAnswers.includes(word);
                    
                    return (
                      <motion.div
                        key={word}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={() => handleQuizAnswer(isCorrect)}
                          disabled={showFeedback}
                          className={`w-full h-16 rounded-2xl text-lg font-semibold shadow-lg transition-all ${
                            showFeedback && isCorrect 
                              ? 'bg-green-500 hover:bg-green-500 text-white' 
                              : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200'
                          }`}
                        >
                          {word}
                          {showFeedback && isCorrect && (
                            <CheckCircle className="w-5 h-5 ml-2" />
                          )}
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>

                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-8"
                  >
                    <div className="bg-green-100 rounded-2xl p-6 max-w-md mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-green-800 font-semibold text-lg">
                        Great job! Moving to the next step...
                      </p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Completion Step */}
        {currentStepName === 'completion' && (
          <motion.div
            key="completion"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-2xl rounded-3xl">
              <CardContent className="p-12 text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <Star className="w-16 h-16 text-white fill-current" />
                </motion.div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Fantastic Work, {childName}! 🎉
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  You've successfully learned the letter {letter.toUpperCase()}! 
                  You earned <strong>25 points</strong> for completing this activity.
                </p>

                <div className="flex justify-center gap-4">
                  <Button
                    onClick={restartActivity}
                    variant="outline"
                    className="px-6 py-3 rounded-2xl font-semibold border-2"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Practice Again
                  </Button>
                  <Button
                    onClick={() => onComplete?.(25)}
                    className="btn-primary text-white px-8 py-3 rounded-2xl font-semibold shadow-lg"
                  >
                    Continue Learning! <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}