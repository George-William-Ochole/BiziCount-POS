'use client';

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
    url: "https://images.pexels.com/photos/4199397/pexels-photo-4199397.jpeg",
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
    title: "E-sales dashboard",
  },
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    fullName: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        router.push("/login?registered=true");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-600 flex flex-col lg:flex-row overflow-hidden">
      

      {/* Left: Auto-sliding Carousel – 55% width */}
      <div className="hidden lg:block w-full lg:w-[55%] relative overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
        ))}

        {/* Simple dots indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Right: Ultra-compact form – 45% width */}
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
                <CardTitle className="text-2xl font-extrabold text-[#1392bf]">
                  BiziCount
                </CardTitle>
                <span className="text-sm text-gray-600">Supermarket Manager</span>
              </div>
            </div>
            <p className="text-xs text-gray-600">Create your staff account</p>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            <form onSubmit={handleSubmit} className="grid gap-3 text-sm">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs">Email</Label>
                <Input id="email" type="email" placeholder="name@store.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={isLoading} required className="h-9 text-sm" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="username" className="text-xs">Username</Label>
                <Input id="username" type="text" placeholder="Choose username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} disabled={isLoading} required className="h-9 text-sm" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-xs">Password</Label>
                <Input id="password" type="password" placeholder="Strong password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} disabled={isLoading} required className="h-9 text-sm" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="fullName" className="text-xs">Full Name</Label>
                <Input id="fullName" type="text" placeholder="John Doe" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} disabled={isLoading} required className="h-9 text-sm" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="text-xs">Phone (optional)</Label>
                <Input id="phone" type="tel" placeholder="+256 700 123 456" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} disabled={isLoading} className="h-9 text-sm" />
              </div>

              {error && <Alert variant="destructive" className="py-2 text-xs"><AlertDescription>{error}</AlertDescription></Alert>}

              <Button type="submit" className="w-full h-9 bg-[#1392bf] hover:bg-[#0f7aa3] text-white font-medium text-sm" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center text-xs text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-[#1392bf] hover:underline font-medium">Sign in</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}