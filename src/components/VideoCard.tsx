
import { Clock, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  id: string;
  thumbnailUrl: string;
  title: string;
  channelName: string;
  views: string;
  postedTime: string;
  duration: string;
  horizontalLayout?: boolean;
}

const VideoCard = ({
  id,
  thumbnailUrl,
  title,
  channelName,
  views,
  postedTime,
  duration,
  horizontalLayout = false,
}: VideoCardProps) => {
  return (
    <div className={cn(
      "video-card group rounded-xl overflow-hidden",
      horizontalLayout ? "flex gap-4" : "flex flex-col"
    )}>
      <Link
        to={`/watch/${id}`}
        className={cn(
          "relative block overflow-hidden rounded-xl",
          horizontalLayout ? "w-40 h-24 shrink-0" : "aspect-video w-full"
        )}
      >
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-xs text-white">
          {duration}
        </div>
      </Link>

      <div className={cn(
        "flex mt-3",
        horizontalLayout ? "flex-1" : ""
      )}>
        {!horizontalLayout && (
          <Link to={`/channel/${channelName}`} className="shrink-0 mr-3">
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              {channelName[0]}
            </div>
          </Link>
        )}

        <div className="flex-1 min-w-0">
          <Link to={`/watch/${id}`} className="block hover:underline">
            <h3 className="font-medium leading-tight text-sm sm:text-base line-clamp-2">{title}</h3>
          </Link>
          <Link to={`/channel/${channelName}`} className="text-muted-foreground text-sm mt-1 hover:text-foreground">
            {channelName}
          </Link>
          <div className="text-muted-foreground text-sm flex items-center">
            <span>{views} views</span>
            <span className="mx-1">•</span>
            <span>{postedTime}</span>
          </div>
        </div>

        <div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
