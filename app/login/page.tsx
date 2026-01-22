'use client';

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";

const carouselImages = [
  {
    url: "https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Organized Supermarket Shelves",
  },
  {
    url: "https://images.pexels.com/photos/12935041/pexels-photo-12935041.jpeg",
    title: "Fresh Grocery Aisle",
  },
  {
    url: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Well-Stocked Retail Display",
  },
  {
    url: "https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Modern Supermarket Interior",
  },
  {
    url: "https://images.pexels.com/photos/12935094/pexels-photo-12935094.jpeg",
    title: "Bright Grocery Store Shelves",
  },
];

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // ← NEW: hover pause state

  const { status } = useSession();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // Auto-slide carousel – only when not paused
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Invalid username or password"
            : "An error occurred. Please try again."
        );
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 to-green-600 flex flex-col lg:flex-row overflow-hidden">
      
      
      {/* Left: Carousel with pause on hover – 60% width */}
      <div
        className="hidden lg:block w-full lg:w-[55%] relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {carouselImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.url}
              alt={slide.title}
              fill
              className="object-cover brightness-90"
              priority={index === 0}
              sizes="60vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
            
          </div>
        ))}

        {/* Dots indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentSlide(i);
                setIsPaused(true); // pause when user clicks a dot
                setTimeout(() => setIsPaused(false), 8000); // resume after 8s
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right: Compact Login Form – 45% */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-4">
        <Card className="w-full max-w-xs bg-white/95 backdrop-blur-md shadow-xl border-0 rounded-xl p-4">
          <CardHeader className="space-y-2 text-center pb-2">
            <div className="flex items-center justify-center gap-2">
              <Image
                src={logo}
                alt="BiziCount Logo"
                width={48}
                height={48}
                className="transition hover:scale-105"
                priority
              />
              <div className="flex flex-col leading-tight">
                <CardTitle className="text-2xl font-extrabold text-[#1b5eea]">
                  BiziCount
                </CardTitle>
                <span className="text-sm text-[#1392bf]">Supermarket Manager</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">Sign in to your account</p>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            <form onSubmit={handleSubmit} className="grid gap-3 text-sm">
              <div className="space-y-1">
                <Label htmlFor="username" className="text-xs">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  required
                  autoFocus
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-xs">Password</Label>
                  <a
                    href="/forgot-password"
                    className="text-xs text-[#1392bf] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="h-9 text-sm"
                />
              </div>

              {error && (
                <Alert variant="destructive" className="py-2 text-xs">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-9 bg-[#1392bf] hover:bg-[#0f7aa3] text-white font-medium text-sm"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="text-center text-xs text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="text-[#1392bf] hover:underline font-medium"
              >
                Create one
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}