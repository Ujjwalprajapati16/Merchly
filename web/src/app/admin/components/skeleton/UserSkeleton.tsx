import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersSkeleton() {
  return (
    <Card className="shadow-md h-full">
      <CardHeader>
        <CardTitle className="text-lg">Users</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex justify-between items-center border p-3 rounded-md"
          >
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-20" />
            </div>

            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
