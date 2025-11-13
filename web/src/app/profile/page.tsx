"use client";

import ProfileHeader from "./components/ProfileHeader";
import ProfileDetails from "./components/ProfileDetails";
import AddressSection from "./components/AddressSection";
import EditProfileDialog from "./components/EditProfileDialog";
import ChangePasswordDialog from "./components/ChangePasswordDialog";
import { useState } from "react";
import { useUserProfile } from "@/hooks/useUser";
import ProfileLoader from "./components/ProfileLoader";

export default function ProfilePage() {
  const { data: profile, isLoading } = useUserProfile();

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  if (isLoading) return <ProfileLoader />;

  return (
    <div className="container mx-auto max-w-4xl py-10 space-y-10">
      <ProfileHeader
        profile={profile}
        onEdit={() => setEditOpen(true)}
        onChangePassword={() => setPasswordOpen(true)}
      />

      <ProfileDetails profile={profile} />

      <AddressSection />

      <EditProfileDialog open={editOpen} onOpenChange={setEditOpen} profile={profile} />
      <ChangePasswordDialog open={passwordOpen} onOpenChange={setPasswordOpen} />
    </div>
  );
}
