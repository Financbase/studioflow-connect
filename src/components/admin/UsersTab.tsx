
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, Search, Filter, UserPlus, MoreHorizontal, ShieldCheck, ShieldAlert, User 
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

// Mock user data - in a real app, this would come from API/database
const mockUsers = [
  {
    id: '1',
    username: 'admin_user',
    email: 'admin@example.com',
    full_name: 'Admin User',
    role: 'admin',
    plan: 'enterprise',
    status: 'active',
    last_login: '2023-07-12T15:20:30Z'
  },
  {
    id: '2',
    username: 'sarah_doe',
    email: 'sarah@example.com',
    full_name: 'Sarah Doe',
    role: 'user',
    plan: 'pro',
    status: 'active',
    last_login: '2023-07-10T09:45:12Z'
  },
  {
    id: '3',
    username: 'john_smith',
    email: 'john@example.com',
    full_name: 'John Smith',
    role: 'user',
    plan: 'standard',
    status: 'active',
    last_login: '2023-07-09T11:32:45Z'
  },
  {
    id: '4',
    username: 'emily_jones',
    email: 'emily@example.com',
    full_name: 'Emily Jones',
    role: 'moderator',
    plan: 'pro',
    status: 'active',
    last_login: '2023-07-11T16:22:33Z'
  },
  {
    id: '5',
    username: 'michael_white',
    email: 'michael@example.com',
    full_name: 'Michael White',
    role: 'user',
    plan: 'free',
    status: 'inactive',
    last_login: '2023-06-30T08:15:20Z'
  }
];

const UsersTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle user status toggle
  const toggleUserStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    toast({
      title: "User Status Updated",
      description: `User status changed to ${newStatus}`,
    });
  };

  // Get role badge based on user role
  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin':
        return <Badge variant="default" className="bg-red-600">Admin</Badge>;
      case 'moderator':
        return <Badge variant="default" className="bg-blue-600">Moderator</Badge>;
      default:
        return <Badge variant="outline">User</Badge>;
    }
  };

  // Get plan badge based on user plan
  const getPlanBadge = (plan: string) => {
    switch(plan) {
      case 'enterprise':
        return <Badge variant="default" className="bg-purple-600">Enterprise</Badge>;
      case 'pro':
        return <Badge variant="default" className="bg-green-600">Pro</Badge>;
      case 'standard':
        return <Badge variant="default" className="bg-blue-500">Standard</Badge>;
      default:
        return <Badge variant="outline">Free</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>
        
        <Button size="sm" className="gap-1 w-full sm:w-auto">
          <UserPlus className="h-4 w-4" /> Add New User
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-heading">Users</CardTitle>
          <CardDescription>
            Manage user accounts, permissions and access levels
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.full_name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getPlanBadge(user.plan)}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'outline' : 'secondary'} 
                      className={user.status === 'active' ? 'border-green-500 text-green-500' : 'text-muted-foreground'}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(user.last_login).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => toast({ description: "User profile view" })}>
                          <User className="mr-2 h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleUserStatus(user.id, user.status)}>
                          {user.status === 'active' ? 
                            <><ShieldAlert className="mr-2 h-4 w-4" /> Deactivate</> : 
                            <><ShieldCheck className="mr-2 h-4 w-4" /> Activate</>
                          }
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center border-t pt-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {users.length} users
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-heading">User Permissions</CardTitle>
          <CardDescription>
            Manage permission levels and system access for different user roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="font-medium flex items-center">
                  <ShieldCheck className="mr-2 h-4 w-4" /> Admin
                </div>
                <Badge className="bg-red-600">Full Access</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete access to all system features, user management, and configuration
              </p>
              <Separator />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="font-medium flex items-center">
                  <ShieldCheck className="mr-2 h-4 w-4" /> Moderator
                </div>
                <Badge>Partial Access</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Can manage content, support tickets, and provide assistance to users
              </p>
              <Separator />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="font-medium flex items-center">
                  <User className="mr-2 h-4 w-4" /> Standard User
                </div>
                <Badge variant="outline">Limited Access</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Access to their own content and standard features based on plan
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersTab;
