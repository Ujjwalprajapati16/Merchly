"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function OrdersTableSkeleton() {
  return (
    <Card className="shadow-md h-full">
      <CardHeader>
        <CardTitle className="text-lg">Orders</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex justify-between items-center border p-3 rounded-md">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
