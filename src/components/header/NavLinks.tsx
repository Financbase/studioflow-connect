
import React from "react";
import { Link } from "react-router-dom";
import { Shield, TicketPlus } from "lucide-react";
import { useLanguage } from "@/contexts/language";

interface NavLinksProps {
  isAdmin: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ isAdmin }) => {
  const { t } = useLanguage();
  
  return (
    <nav className="flex items-center gap-4 ml-6">
      <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
        {t("nav.dashboard")}
      </Link>
      <Link to="/support" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
        <TicketPlus className="h-3.5 w-3.5" />
        {t("nav.support")}
      </Link>
      <Link to="/docs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        {t("header.documentation")}
      </Link>
      {isAdmin && (
        <Link to="/admin" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
          <Shield className="h-3.5 w-3.5" />
          {t("nav.admin")}
        </Link>
      )}
    </nav>
  );
};

export default NavLinks;
