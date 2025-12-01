"use client";

import { useState, useMemo } from "react";
import { useAdminUsers, useDeleteUser } from "@/hooks/useAdminActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminUser } from "@/types/userTypes";
import UsersSkeleton from "./skeleton/UserSkeleton";
export default function UsersList() {
  const { data, isLoading } = useAdminUsers();
  const deleteUser = useDeleteUser();

  const users: AdminUser[] = Array.isArray(data)
    ? data
    : data?.users || [];

  const PAGE_SIZE = 4;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(users.length / PAGE_SIZE);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return users.slice(start, start + PAGE_SIZE);
  }, [users, page]);

  if (isLoading) return <UsersSkeleton />;

  return (
    <Card className="shadow-md h-full">
      <CardHeader>
        <CardTitle className="text-lg">Users</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {paginatedUsers.length === 0 && (
          <p className="text-gray-500 text-sm">No users found.</p>
        )}

        {paginatedUsers.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center border p-3 rounded-md"
          >
            <div>
              <p className="font-medium capitalize">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500">
                Role: {user.role} | Addresses: {user.addressCount}
              </p>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteUser.mutate(user._id)}
            >
              Delete
            </Button>
          </div>
        ))}

        {/* PAGINATION CONTROLS */}
        {users.length > PAGE_SIZE && (
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            {/* Page indicators */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
