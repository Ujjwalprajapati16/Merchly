import { Shirt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SignupForm } from "./components/signup-form";
import Logo from "@/components/Logo";

export default function SignupPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 overflow-hidden">
      {/* Left fixed image section */}
      <div className="relative hidden lg:block">
        <div className="sticky top-0 h-screen w-full">
          <Image
            src="/signup.png"
            alt="Signup Illustration"
            fill
            className="object-cover dark:brightness-[0.2] dark:grayscale"
            priority
          />
        </div>
      </div>

      {/* Right form section */}
      <div className="flex flex-col gap-4 p-6 md:p-10 overflow-y-auto h-screen scrollbar-none">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Shirt className="size-4" />
            </div>
            <Logo width={120} height={120} />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
