
import { Home, Compass, History, PlaySquare, Clock, ThumbsUp, Library, Film, Music, Gamepad2, Trophy, Flame, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const mainLinks = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: Film, label: "Shorts", path: "/shorts" },
    { icon: Library, label: "Subscriptions", path: "/subscriptions" },
  ];

  const libraryLinks = [
    { icon: PlaySquare, label: "Your videos", path: "/your-videos" },
    { icon: History, label: "History", path: "/history" },
    { icon: Clock, label: "Watch later", path: "/watch-later" },
    { icon: ThumbsUp, label: "Liked videos", path: "/liked-videos" },
  ];

  const subscriptions = [
    { name: "Music", path: "/c/music" },
    { name: "Sports", path: "/c/sports" },
    { name: "Gaming", path: "/c/gaming" },
    { name: "News", path: "/c/news" },
  ];

  const exploreSections = [
    { icon: Flame, label: "Trending", path: "/trending" },
    { icon: Music, label: "Music", path: "/music" },
    { icon: Gamepad2, label: "Gaming", path: "/gaming" },
    { icon: Trophy, label: "Sports", path: "/sports" },
    { icon: ShoppingBag, label: "Shopping", path: "/shopping" },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-[60px] z-40 h-[calc(100vh-60px)] bg-background transition-all duration-300 overflow-y-auto",
        isOpen ? "w-60" : "w-[70px]"
      )}
    >
      <nav className="flex flex-col py-2">
        <div className="px-3 pb-2">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="flex items-center gap-6 p-3 hover:bg-accent rounded-lg"
            >
              <link.icon className="h-6 w-6 shrink-0" />
              {isOpen && <span className="text-sm">{link.label}</span>}
            </Link>
          ))}
        </div>

        {isOpen && (
          <>
            <div className="border-t my-2"></div>
            
            <div className="px-3 pb-2">
              <h3 className="font-medium px-3 pt-1 pb-2">Library</h3>
              {libraryLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="flex items-center gap-6 p-3 hover:bg-accent rounded-lg"
                >
                  <link.icon className="h-6 w-6 shrink-0" />
                  <span className="text-sm">{link.label}</span>
                </Link>
              ))}
            </div>
            
            <div className="border-t my-2"></div>

            <div className="px-3 pb-2">
              <h3 className="font-medium px-3 pt-1 pb-2">Subscriptions</h3>
              {subscriptions.map((sub) => (
                <Link
                  key={sub.name}
                  to={sub.path}
                  className="flex items-center gap-6 p-3 hover:bg-accent rounded-lg"
                >
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                    {sub.name[0]}
                  </div>
                  <span className="text-sm">{sub.name}</span>
                </Link>
              ))}
            </div>

            <div className="border-t my-2"></div>

            <div className="px-3 pb-2">
              <h3 className="font-medium px-3 pt-1 pb-2">Explore</h3>
              {exploreSections.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="flex items-center gap-6 p-3 hover:bg-accent rounded-lg"
                >
                  <link.icon className="h-6 w-6 shrink-0" />
                  <span className="text-sm">{link.label}</span>
                </Link>
              ))}
            </div>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
