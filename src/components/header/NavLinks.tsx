
import React from "react";
import { Link } from "react-router-dom";
import { Shield, TicketPlus, Home, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/language";

interface NavLinksProps {
  isAdmin: boolean;
}

interface NavLinkItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ isAdmin }) => {
  const { t } = useLanguage();
  
  const navLinks: NavLinkItem[] = [
    {
      path: "/",
      label: t("nav.dashboard"),
      icon: <Home className="h-3.5 w-3.5" />,
      className: "text-sm font-medium transition-colors hover:text-primary"
    },
    {
      path: "/support",
      label: t("nav.support"),
      icon: <TicketPlus className="h-3.5 w-3.5" />,
      className: "text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1"
    },
    {
      path: "/docs",
      label: t("header.documentation"),
      icon: <FileText className="h-3.5 w-3.5" />,
      className: "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    }
  ];
  
  // Add admin link if user is admin
  if (isAdmin) {
    navLinks.push({
      path: "/admin",
      label: t("nav.admin"),
      icon: <Shield className="h-3.5 w-3.5" />,
      className: "text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1"
    });
  }
  
  return (
    <nav className="flex items-center gap-4 ml-6">
      {navLinks.map((link) => (
        <Link 
          key={link.path} 
          to={link.path} 
          className={link.className}
        >
          {link.icon && <span className="mr-1">{link.icon}</span>}
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
