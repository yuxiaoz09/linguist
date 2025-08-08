import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, RotateCcw } from "lucide-react";
import { generateSpeech } from "@/api/functions";
import { motion } from "framer-motion";

export default function AudioPlayer({ 
  text, 
  autoPlay = false, 
  showText = true,
  voice_id = "21m00Tcm4TlvDq8ikWAM", // Child-friendly voice
  className = "",
  size = "default" 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  const generateAudio = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await generateSpeech({ 
        text, 
        voice_id 
      });
      
      if (response.data?.audio_url) {
        setAudioUrl(response.data.audio_url);
        
        // Auto-play if requested
        if (autoPlay) {
          setTimeout(() => {
            playAudio(response.data.audio_url);
          }, 100);
        }
      } else {
        throw new Error('No audio URL received');
      }
    } catch (err) {
      console.error('Error generating audio:', err);
      setError('Failed to generate audio');
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = async (url = audioUrl) => {
    if (!url) {
      await generateAudio();
      return;
    }

    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setError('Failed to play audio');
        setIsPlaying(false);
      };

      await audio.play();
    } catch (err) {
      console.error('Error playing audio:', err);
      setError('Failed to play audio');
      setIsPlaying(false);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const replayAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      playAudio();
    }
  };

  React.useEffect(() => {
    if (autoPlay && text && !audioUrl) {
      generateAudio();
    }
  }, [text, autoPlay]);

  const buttonSizes = {
    small: "w-10 h-10",
    default: "w-12 h-12",
    large: "w-16 h-16"
  };

  const iconSizes = {
    small: "w-4 h-4",
    default: "w-5 h-5", 
    large: "w-6 h-6"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Play/Pause Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={isPlaying ? pauseAudio : playAudio}
          disabled={isLoading}
          className={`${buttonSizes[size]} rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg text-white p-0`}
        >
          {isLoading ? (
            <div className={`animate-spin rounded-full border-2 border-white border-t-transparent ${iconSizes[size]}`} />
          ) : isPlaying ? (
            <Pause className={iconSizes[size]} />
          ) : (
            <Play className={`${iconSizes[size]} ml-0.5`} />
          )}
        </Button>
      </motion.div>

      {/* Replay Button */}
      {audioUrl && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={replayAudio}
            variant="outline"
            size="sm"
            className="rounded-full border-gray-200 hover:bg-gray-50"
            disabled={isLoading}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </motion.div>
      )}

      {/* Text Display */}
      {showText && text && (
        <div className="flex items-center gap-2 flex-1">
          <Volume2 className="w-4 h-4 text-gray-500" />
          <span className={`text-gray-700 font-medium ${size === 'large' ? 'text-lg' : size === 'small' ? 'text-sm' : 'text-base'}`}>
            "{text}"
          </span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
}