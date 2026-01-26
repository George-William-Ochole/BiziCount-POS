'use client';

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: "",
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          phone: formData.phone.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || 'Registration failed. Please try again.');
        setLoading(false);
        return;
      }

      setSuccess('Account created successfully! Redirecting to login...');
      
      setTimeout(() => {
        window.location.href = '/login?registered=true';
      }, 1500);

    } catch (err) {
      console.error('Registration error:', err);
      setError('Network error. Please check your connection and try again.');
      setLoading(false);
    }
  };

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
      url: "https://images.pexels.com/photos/12935094/pexels-photo-12935094.jpeg",
      title: "E-sales dashboard",
    },
  ];

  return (
    <div className="h-screen bg-linear-to-br from-blue-700 to-green-700 flex flex-col lg:flex-row overflow-hidden">
      {/* Left: Auto-sliding Carousel – 55% width */}
      <div className="hidden lg:block w-full lg:w-[55%] relative overflow-hidden">
        {carouselImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={slide.url} alt={slide.title} className="w-full h-full object-cover brightness-75" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-12 left-6 right-6 text-white">
              <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">Streamline Your Supermarket</h2>
              <p className="text-base text-gray-100 drop-shadow-md">Manage inventory, track sales, and grow your business</p>
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentSlide ? "bg-white w-6" : "bg-white/60 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right: Ultra-Compact Form – 45% width */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-2 lg:p-3 overflow-y-auto">
        <Card className="w-full max-w-xs bg-white shadow-2xl border-0 rounded-xl my-2">
          <CardHeader className="text-center pb-2 pt-3 px-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">BC</div>
              <CardTitle className="text-xl font-extrabold text-[#0f7aa3]">BiziCount</CardTitle>
            </div>
            <p className="text-[10px] font-medium text-gray-700">Create your staff account</p>
          </CardHeader>

          <CardContent className="pb-3 px-4">
            <div className="grid gap-2">
              <div>
                <Label htmlFor="name" className="text-[10px] font-semibold text-gray-800">Full Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  type="text" 
                  placeholder="John Doe" 
                  value={formData.name} 
                  onChange={handleChange}
                  disabled={loading} 
                  required 
                  className="h-8 text-xs border border-gray-300 focus:border-[#1392bf] focus:ring-1 focus:ring-[#1392bf]/30 mt-0.5 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-[10px] font-semibold text-gray-800">Email</Label>
                <Input 
                  id="email"
                  name="email" 
                  type="email" 
                  placeholder="name@store.com" 
                  value={formData.email} 
                  onChange={handleChange}
                  disabled={loading} 
                  required 
                  className="h-8 text-xs border border-gray-300 focus:border-[#1392bf] focus:ring-1 focus:ring-[#1392bf]/30 mt-0.5 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-[10px] font-semibold text-gray-800">Password</Label>
                <div className="relative">
                  <Input 
                    id="password"
                    name="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 8 characters" 
                    value={formData.password} 
                    onChange={handleChange}
                    disabled={loading} 
                    required 
                    className="h-8 text-xs border border-gray-300 focus:border-[#1392bf] focus:ring-1 focus:ring-[#1392bf]/30 mt-0.5 text-gray-900 placeholder:text-gray-500 pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-[10px] font-semibold text-gray-800">Confirm Password</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword"
                    name="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password" 
                    value={formData.confirmPassword} 
                    onChange={handleChange}
                    disabled={loading} 
                    required 
                    className="h-8 text-xs border border-gray-300 focus:border-[#1392bf] focus:ring-1 focus:ring-[#1392bf]/30 mt-0.5 text-gray-900 placeholder:text-gray-500 pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-[10px] font-semibold text-gray-800">
                  Phone <span className="text-gray-500 font-normal">(Optional)</span>
                </Label>
                <Input 
                  id="phone"
                  name="phone" 
                  type="tel" 
                  placeholder="+256 700 123 456" 
                  value={formData.phone} 
                  onChange={handleChange}
                  disabled={loading} 
                  className="h-8 text-xs border border-gray-300 focus:border-[#1392bf] focus:ring-1 focus:ring-[#1392bf]/30 mt-0.5 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {error && (
                <Alert variant="destructive" className="py-1.5 px-2 border border-red-300 bg-red-50">
                  <AlertDescription className="text-[10px] font-medium text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="py-1.5 px-2 border border-green-300 bg-green-50 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-green-700 flex-shrink-0" />
                  <AlertDescription className="text-[10px] font-medium text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={handleSubmit}
                type="button"
                className="w-full h-8 bg-[#1392bf] hover:bg-[#0f7aa3] text-white font-semibold text-xs shadow-lg hover:shadow-xl transition-all mt-1" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>

            <div className="text-center text-[10px] text-gray-700 mt-2">
              Already have an account?{" "}
              <a href="/login" className="text-[#1392bf] hover:text-[#0f7aa3] hover:underline font-semibold">
                Sign in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}