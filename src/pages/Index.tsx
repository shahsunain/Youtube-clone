
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VideoCard from "@/components/VideoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock data for videos
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
  {
    id: "6",
    thumbnailUrl: "https://source.unsplash.com/random/800x450?science",
    title: "Understanding Quantum Physics for Beginners",
    channelName: "ScienceExplained",
    views: "958K",
    postedTime: "7 months ago",
    duration: "32:10",
  },
  {
    id: "7",
    thumbnailUrl: "https://source.unsplash.com/random/800x450?fitness",
    title: "30-Minute Full Body Workout - No Equipment Needed",
    channelName: "FitnessPlus",
    views: "3.5M",
    postedTime: "11 months ago",
    duration: "29:59",
  },
  {
    id: "8",
    thumbnailUrl: "https://source.unsplash.com/random/800x450?business",
    title: "How I Built a 7-Figure Business From Scratch | Success Story",
    channelName: "BusinessInsights",
    views: "1.8M",
    postedTime: "8 months ago",
    duration: "15:45",
  },
  {
    id: "9",
    thumbnailUrl: "https://source.unsplash.com/random/800x450?art",
    title: "Digital Art Masterclass - From Beginner to Professional",
    channelName: "ArtCreator",
    views: "724K",
    postedTime: "6 months ago",
    duration: "1:12:38",
  },
  {
    id: "10",
    thumbnailUrl: "https://source.unsplash.com/random/800x450?fashion",
    title: "Summer Fashion Trends 2023 - What's In and What's Out",
    channelName: "StyleGuru",
    views: "1.5M",
    postedTime: "3 months ago",
    duration: "19:27",
  },
];

// Categories for tabs
const CATEGORIES = [
  "All",
  "Music",
  "Gaming",
  "Podcasts",
  "Live",
  "Cooking",
  "Recently uploaded",
  "New to you",
  "Watched",
];

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [videos, setVideos] = useState(VIDEOS);
  const [activeTab, setActiveTab] = useState("All");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Filter videos based on active tab (simulated)
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Shuffle videos array to simulate filtering
    setVideos([...VIDEOS].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <main
        className={cn(
          "pt-6 transition-all duration-300",
          sidebarOpen ? "ml-[240px]" : "ml-[70px]",
          windowWidth < 768 && "ml-0"
        )}
      >
        <div className="px-4 pb-20 animate-fade-in">
          {/* Categories */}
          <div className="mb-6 overflow-x-auto scrollbar-none">
            <Tabs 
              defaultValue="All" 
              className="w-full"
              value={activeTab}
              onValueChange={handleTabChange}
            >
              <TabsList className="w-max bg-transparent h-auto p-0 mb-4">
                {CATEGORIES.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-full bg-secondary data-[state=active]:bg-foreground data-[state=active]:text-background px-4 py-1.5 text-sm"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {videos.map((video) => (
                    <VideoCard
                      key={video.id}
                      id={video.id}
                      thumbnailUrl={video.thumbnailUrl}
                      title={video.title}
                      channelName={video.channelName}
                      views={video.views}
                      postedTime={video.postedTime}
                      duration={video.duration}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
