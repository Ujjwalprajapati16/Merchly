"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfileHeader({ profile, onEdit, onChangePassword }: any) {
  const initials = profile.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-20 w-20 text-xl">
        <AvatarFallback className="bg-primary text-white dark:bg-primary dark:text-primary-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div>
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-muted-foreground">{profile.email}</p>

        <div className="flex gap-3 mt-3">
          <Button size="sm" onClick={onEdit}>Edit Profile</Button>
          <Button size="sm" variant="outline" onClick={onChangePassword}>
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
}
