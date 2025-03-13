
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, Menu, Bell, Video, User, 
  Mic, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real app, we would handle search here
  };

  const activateSearch = () => {
    setSearchActive(true);
  };

  const deactivateSearch = () => {
    if (!searchQuery) {
      setSearchActive(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b py-2 px-4">
      <div className="flex items-center justify-between h-14">
        {/* Left section */}
        <div className={cn("flex items-center gap-4", searchActive && "hidden md:flex")}>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="rounded-full"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Link to="/" className="flex items-center gap-1">
            <div className="bg-primary p-1 rounded-md">
              <Video className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-lg hidden sm:inline-block">
              YouTune
            </span>
          </Link>
        </div>

        {/* Mobile search back button */}
        {searchActive && (
          <Button
            variant="ghost"
            size="icon"
            onClick={deactivateSearch}
            className="md:hidden rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}

        {/* Search Section */}
        <div 
          className={cn(
            "flex items-center gap-2 w-full max-w-xl transition-all",
            !searchActive && "hidden md:flex"
          )}
        >
          <form onSubmit={handleSearch} className="flex-1 flex">
            <div className="relative flex flex-1 items-center">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="h-10 pl-4 pr-10 rounded-l-full border-r-0 focus-visible:ring-0"
                onFocus={activateSearch}
                onBlur={deactivateSearch}
              />
              <Button 
                type="submit" 
                variant="outline" 
                size="icon" 
                className="h-10 rounded-r-full rounded-l-none border-l-0"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Mic className="h-5 w-5" />
          </Button>
        </div>

        {/* Right Section */}
        <div className={cn("flex items-center gap-1", searchActive && "hidden md:flex")}>
          <Button
            variant="ghost"
            size="icon"
            onClick={activateSearch}
            className="md:hidden rounded-full"
          >
            <Search className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
