
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VideoPlayer from "@/components/VideoPlayer";
import VideoCard from "@/components/VideoCard";
import { cn } from "@/lib/utils";

// Mock data for videos (same as in Index.tsx)
const VIDEOS = [
  {
    id: "1",
    thumbnailUrl: "https://source.unsplash.com/random/800x450?tech",
    title: "Building a Modern YouTube Clone with React and TailwindCSS",
    channelName: "CodeMaster",
    views: "254K",
    postedTime: "3 weeks ago",
    duration: "14:25",
  },
  {
    id: "2",
    thumbnailUrl: "https://source.unsplash.com/random/800x450?nature",
    title: "Exploring the Breathtaking Landscapes of New Zealand's South Island",
    channelName: "TravelGuide",
    views: "1.2M",
    postedTime: "5 months ago",
    duration: "21:32",
  },
  {
    id: "3",
    thumbnailUrl: "https://source.unsplash.com/random/800x450?cooking",
    title: "How to Make the Perfect Homemade Pizza | Step by Step Guide",
    channelName: "ChefCooking",
    views: "543K",
    postedTime: "1 month ago",
    duration: "18:45",
  },
  {
    id: "4",
    thumbnailUrl: "https://source.unsplash.com/random/800x450?music",
    title: "Top 10 Most Popular Songs of 2023 | Music Review",
    channelName: "MusicTrends",
    views: "789K",
    postedTime: "2 weeks ago",
    duration: "11:19",
  },
  {
    id: "5",
    thumbnailUrl: "https://source.unsplash.com/random/800x450?gaming",
    title: "Elden Ring - Complete Walkthrough & Strategy Guide",
    channelName: "GameMaster",
    views: "2.1M",
    postedTime: "4 months ago",
    duration: "3:25:15",
  },
];

// Mock descriptions
const DESCRIPTIONS = [
  `Welcome to this comprehensive tutorial on building a YouTube clone using React and TailwindCSS!

In this video, we cover:
- Setting up your React project
- Installing and configuring TailwindCSS
- Creating reusable components
- Implementing responsive design
- Building a video player from scratch

Don't forget to like and subscribe for more web development tutorials!

#WebDevelopment #React #TailwindCSS`,

  `Join me on this incredible journey through New Zealand's South Island!

This video showcases some of the most stunning landscapes including:
- Milford Sound
- Mount Cook National Park
- Lake Tekapo
- Queenstown
- Fiordland

Stay tuned for the next episode where we explore the North Island.

#Travel #NewZealand #Landscape`,

  `Learn how to make the perfect homemade pizza with this step-by-step guide!

Ingredients:
- 500g bread flour
- 7g dry yeast
- 300ml warm water
- 2 tbsp olive oil
- 1 tsp salt
- Your favorite toppings

This recipe has been in my family for generations and I'm excited to share it with you.

#Cooking #HomemadePizza #Recipe`,
];

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [video, setVideo] = useState<any>(null);
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1280) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch video and related videos
  useEffect(() => {
    // Find the current video
    const currentVideo = VIDEOS.find((v) => v.id === id) || VIDEOS[0];
    
    // Set a random description
    const randomDescIndex = Math.floor(Math.random() * DESCRIPTIONS.length);
    setVideo({
      ...currentVideo,
      description: DESCRIPTIONS[randomDescIndex],
      postedDate: currentVideo.postedTime,
    });
    
    // Set related videos (all videos except current)
    setRelatedVideos(VIDEOS.filter((v) => v.id !== id));
  }, [id]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!video) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <main
        className={cn(
          "pt-6 transition-all duration-300",
          sidebarOpen ? "ml-[240px]" : "ml-0",
          "px-4 pb-16"
        )}
      >
        <div className="max-w-[1800px] mx-auto animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main video content */}
            <div className="w-full lg:w-[65%] xl:w-[70%]">
              <VideoPlayer
                videoId={video.id}
                title={video.title}
                channelName={video.channelName}
                views={video.views}
                postedDate={video.postedDate}
                description={video.description}
              />
            </div>
            
            {/* Related videos */}
            <div className="w-full lg:w-[35%] xl:w-[30%]">
              <h3 className="font-medium mb-4">Related videos</h3>
              <div className="space-y-3">
                {relatedVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    id={video.id}
                    thumbnailUrl={video.thumbnailUrl}
                    title={video.title}
                    channelName={video.channelName}
                    views={video.views}
                    postedTime={video.postedTime}
                    duration={video.duration}
                    horizontalLayout={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoPage;
