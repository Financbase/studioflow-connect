
import React from "react";
import { Link } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Settings, Shield, HelpCircle, Languages, LogOut, TicketPlus } from "lucide-react";
import { UserProfile } from "@/types/supabase";

interface UserMenuProps {
  user: any;
  profile: UserProfile | null;
  isAdmin: boolean;
  onSignOut: () => void;
  t: (key: string) => string;
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const UserMenuLabels = {
  profile: "Profile",
  settings: "Settings",
  admin: "Admin Panel",
  support: "Support Center",
  help: "Help & Resources",
  signout: "Sign Out"
};

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  profile,
  isAdmin,
  onSignOut,
  t,
  currentLanguage,
  onLanguageChange
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || undefined} />
            <AvatarFallback>{profile?.username?.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile?.full_name || profile?.username || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>{UserMenuLabels.profile}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>{UserMenuLabels.settings}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/support" className="cursor-pointer">
            <TicketPlus className="mr-2 h-4 w-4" />
            <span>{UserMenuLabels.support}</span>
          </Link>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem asChild>
            <Link to="/admin" className="cursor-pointer">
              <Shield className="mr-2 h-4 w-4" />
              <span>{UserMenuLabels.admin}</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/docs" className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>{UserMenuLabels.help}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Languages className="mr-2 h-4 w-4" />
          <select 
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-transparent border-none outline-none w-full cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="ja">日本語</option>
          </select>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{UserMenuLabels.signout}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
