
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";
import { PricingTier } from "@/contexts/dashboard/types";
import { getStorageProgress, ProfileStats } from "./types";

interface AccountInfoProps {
  pricingTier: PricingTier;
  stats: ProfileStats;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ pricingTier, stats }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Account Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subscription Plan</span>
          <span className="font-medium capitalize">{pricingTier}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Account Created</span>
          <span className="font-medium">{new Date(stats.accountCreated).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Last Login</span>
          <span className="font-medium">{new Date(stats.lastLogin).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">2FA Enabled</span>
          <span className="font-medium flex items-center gap-1">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            Yes
          </span>
        </div>
        <Separator />
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Storage Usage</h4>
          <div className="w-full h-2 bg-secondary rounded-full">
            <div 
              className="h-2 bg-primary rounded-full" 
              style={{ width: `${getStorageProgress(stats.storageUsed, stats.totalStorage)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 flex justify-between">
            <span>{stats.storageUsed} used</span>
            <span>{stats.totalStorage} total</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfo;
