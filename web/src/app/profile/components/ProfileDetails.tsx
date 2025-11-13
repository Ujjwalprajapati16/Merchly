"use client";

export default function ProfileDetails({ profile }: any) {
  return (
    <div className="p-4 border rounded-2xl space-y-2">
      <h2 className="text-xl font-semibold">Account Details</h2>

      <div className="grid grid-cols-2 gap-4 mt-3">
        <div>
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="font-medium">{profile.name}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{profile.email}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Role</p>
          <p className="font-medium capitalize">{profile.role}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Member Since</p>
          <p className="font-medium">
            {new Date(profile.createdAt).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
