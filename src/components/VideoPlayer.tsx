
import { useState, useRef, useEffect } from "react";
import { 
  Play, Pause, Volume2, VolumeX, Maximize, SkipForward, 
  SkipBack, Settings, MessageSquare, ThumbsUp, ThumbsDown, 
  Share
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  channelName: string;
  views: string;
  postedDate: string;
  description: string;
}

const VideoPlayer = ({ 
  videoId, 
  title, 
  channelName, 
  views, 
  postedDate, 
  description 
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 10000) + 1000);
  const [dislikes, setDislikes] = useState(Math.floor(Math.random() * 1000) + 100);
  const [showDescription, setShowDescription] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle duration change
  const handleDurationChange = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle video seeking
  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 1;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Handle full screen
  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Show/hide controls with mouse movement
  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }
    
    controlsTimerRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Handle video play/pause events
  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      
      video.addEventListener('play', onPlay);
      video.addEventListener('pause', onPause);
      
      return () => {
        video.removeEventListener('play', onPlay);
        video.removeEventListener('pause', onPause);
      };
    }
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* Video Player */}
      <div 
        className="relative w-full aspect-video bg-black rounded-lg overflow-hidden"
        onMouseMove={handleMouseMove}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          poster={`https://source.unsplash.com/random/1280x720?v=${videoId}`}
        >
          <source src="" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Controls */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300",
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        )}>
          {/* Progress bar */}
          <div className="w-full mb-2">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="h-1"
            />
            <div className="flex justify-between text-xs text-white mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                className="text-white h-8 w-8 rounded-full hover:bg-white/20"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white h-8 w-8 rounded-full hover:bg-white/20"
              >
                <SkipForward className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-1 group">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                  className="text-white h-8 w-8 rounded-full hover:bg-white/20"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                
                <div className="w-0 overflow-hidden group-hover:w-20 transition-all duration-300">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    onClick={(e) => e.stopPropagation()}
                    className="h-1 w-20"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => { e.stopPropagation(); }}
                className="text-white h-8 w-8 rounded-full hover:bg-white/20"
              >
                <Settings className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => { e.stopPropagation(); toggleFullScreen(); }}
                className="text-white h-8 w-8 rounded-full hover:bg-white/20"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Big Play Button (visible when video is paused) */}
        {!isPlaying && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center">
              <Play className="h-8 w-8 text-white" />
            </div>
          </div>
        )}
      </div>
      
      {/* Video Info */}
      <div className="mt-4">
        <h1 className="text-xl font-bold">{title}</h1>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              {channelName[0]}
            </div>
            <div>
              <h2 className="font-medium">{channelName}</h2>
              <p className="text-sm text-muted-foreground">1.2M subscribers</p>
            </div>
            <Button className="ml-2" variant="secondary">Subscribe</Button>
          </div>
          
          <div className="flex gap-2">
            <div className="flex rounded-full bg-secondary">
              <Button 
                variant="ghost" 
                className="flex items-center gap-1 rounded-l-full rounded-r-none"
                onClick={() => setLikes(prev => prev + 1)}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{likes.toLocaleString()}</span>
              </Button>
              <div className="w-px bg-border"></div>
              <Button 
                variant="ghost" 
                className="flex items-center gap-1 rounded-r-full rounded-l-none"
                onClick={() => setDislikes(prev => prev + 1)}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="secondary" className="flex items-center gap-1 rounded-full">
              <Share className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>
        
        {/* Video Details */}
        <div 
          className={cn(
            "mt-4 p-3 bg-secondary rounded-lg transition-all duration-300",
            showDescription ? "max-h-[800px]" : "max-h-[88px] overflow-hidden"
          )}
          onClick={() => setShowDescription(!showDescription)}
        >
          <div className="flex gap-2 text-sm">
            <span className="font-medium">{views} views</span>
            <span className="text-muted-foreground">{postedDate}</span>
          </div>
          <p className="mt-2 whitespace-pre-wrap">{description}</p>
          <Button 
            variant="ghost" 
            className="mt-2 text-sm" 
            onClick={(e) => {
              e.stopPropagation();
              setShowDescription(!showDescription);
            }}
          >
            {showDescription ? "Show less" : "Show more"}
          </Button>
        </div>
        
        {/* Comments Section */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <h3 className="font-medium">148 Comments</h3>
          </div>
          
          <div className="mt-4 flex gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              U
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Add a comment..." 
                className="w-full bg-transparent border-b border-border pb-1 focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          
          {/* Sample Comments */}
          <div className="mt-6 space-y-4">
            {[1, 2, 3].map((comment) => (
              <div key={comment} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  {String.fromCharCode(64 + comment)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">User {comment}</span>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="mt-1">This is an amazing video! I've learned so much from this content, thanks for sharing!</p>
                  <div className="flex items-center gap-3 mt-2">
                    <Button variant="ghost" size="sm" className="gap-1 h-8">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{Math.floor(Math.random() * 100) + 1}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">Reply</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
