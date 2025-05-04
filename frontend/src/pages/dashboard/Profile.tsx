import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';

const Profile: React.FC = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/profile.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-semibold">Profile Settings</CardTitle>
              <p className="text-sm text-gray-600">Manage your account information</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input 
                  type="text" 
                  defaultValue="Jane Doe" 
                  className="bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input 
                  type="email" 
                  defaultValue="jane@example.com" 
                  className="bg-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Security</h3>
            <Separator />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <Input 
                type="password" 
                placeholder="Enter new password" 
                className="bg-white max-w-md"
              />
              <p className="text-xs text-gray-500 mt-2">Leave blank to keep current password</p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
