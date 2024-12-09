import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        React Query Complete Crash Course
      </h1>
      <Button asChild>
        <Link href={"/contacts"}>View the Demo App</Link>
      </Button>
    </div>
  );
}
