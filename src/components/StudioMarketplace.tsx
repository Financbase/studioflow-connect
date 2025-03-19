
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  ShoppingCart, 
  Tag, 
  Wallet,
  Zap,
  Download,
  Package
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const StudioMarketplace = () => {
  return (
    <section id="marketplace" className="py-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">StudioFlow Marketplace</h2>
        <Button className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          My Purchases
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Browse Marketplace</h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Buy and sell plugins, samples, and presets with 70% creator revenue split.
          </p>
          
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Creator</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Vintage Drum Collection</TableCell>
                  <TableCell>
                    <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full">
                      Sample Pack
                    </span>
                  </TableCell>
                  <TableCell>Roland Labs</TableCell>
                  <TableCell className="text-right">$49.99</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="gap-1">
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Buy
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">MidiFX Chain Pro</TableCell>
                  <TableCell>
                    <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full">
                      Plugin
                    </span>
                  </TableCell>
                  <TableCell>Ableton Certified</TableCell>
                  <TableCell className="text-right">$129.99</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="gap-1">
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Buy
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lo-Fi Textures</TableCell>
                  <TableCell>
                    <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
                      Preset Pack
                    </span>
                  </TableCell>
                  <TableCell>Native Audio</TableCell>
                  <TableCell className="text-right">$24.99</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-3.5 w-3.5" />
                      Owned
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-5 w-5 text-primary" />
                  <h4 className="font-medium text-sm">Seller Dashboard</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Create and manage your products with 70% revenue share.
                </p>
                <Button className="w-full" size="sm">Go to Dashboard</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="h-5 w-5 text-green-500" />
                  <h4 className="font-medium text-sm">Blockchain Licensing</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Track plugin ownership securely via NFTs on the blockchain.
                </p>
                <Button className="w-full" size="sm" variant="outline">View My NFTs</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="h-5 w-5 text-amber-500" />
                  <h4 className="font-medium text-sm">Bundle Creator</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Create custom bundles of plugins and samples to sell together.
                </p>
                <Button className="w-full" size="sm" variant="outline">Create Bundle</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default StudioMarketplace;
