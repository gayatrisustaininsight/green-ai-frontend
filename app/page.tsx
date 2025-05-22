'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/dashboard');
  }, []);
  return (
    <div>
      <h1 className="text-primary text-2xl font-bold">Hello World</h1>
    </div>
  );
}