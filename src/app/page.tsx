"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Mail, Truck, Shield, FileText, User, Award, Clock, MapPin, Star, Zap, ArrowRight } from "lucide-react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    setIsClient(true);
    
    // Ensure page always starts at top on refresh
    window.scrollTo(0, 0);
    
    // Add scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Handle page visibility change to reset scroll position
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        window.scrollTo(0, 0);
      }
    };
    
    // Mobile keyboard handling
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      const isLandscape = window.innerHeight < window.innerWidth;
      
      if (isMobile) {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          // Adjust padding based on orientation and keyboard state
          if (isLandscape) {
            contactSection.style.paddingBottom = '80px';
          } else {
            contactSection.style.paddingBottom = '120px';
          }
        }
      }
    };
    
    // Handle visual viewport changes (keyboard appearance)
    if ('visualViewport' in window && window.visualViewport) {
      const visualViewport = window.visualViewport;
      const handleViewportChange = () => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile && visualViewport) {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            const keyboardHeight = window.innerHeight - visualViewport.height;
            if (keyboardHeight > 150) {
              // Keyboard is visible, adjust layout
              contactSection.style.paddingBottom = `${Math.max(120, keyboardHeight + 20)}px`;
            } else {
              // Keyboard is hidden, restore normal padding
              contactSection.style.paddingBottom = '120px';
            }
          }
        }
      };
      
      visualViewport.addEventListener('resize', handleViewportChange);
      window.addEventListener('resize', handleResize);
      
      return () => {
        visualViewport.removeEventListener('resize', handleViewportChange);
        window.removeEventListener('resize', handleResize);
      };
    } else {
      // Fallback for browsers without visualViewport support
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const credentials = [
    { name: "Insurance", icon: Shield, description: "Bobtail and physical damage insurance coverage" },
    { name: "Equipment Registration", icon: Truck, description: "Valid truck and trailer registration" },
    { name: "Driver License", icon: User, description: "Valid commercial driver&apos;s license (CDL)" },
    { name: "Medical Certificate", icon: FileText, description: "Current DOT medical certificate" },
    { name: "Other Certifications", icon: CheckCircle, description: "Additional safety and compliance certifications as required" }
  ];

  // Simple div wrapper - no animations
  const MotionDiv = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={className}>{children}</div>;
  };

  // Simple div wrapper for cards - no animations
  const MotionCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={className}>{children}</div>;
  };

  // Simple div wrapper for slides - no animations
  const MotionSlide = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={className}>{children}</div>;
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
        <Image
            src="/Hero_img.png"
            alt="Tiger Hill Transport truck on mountain road"
            fill
            className="object-cover object-bottom"
          priority
        />
        </div>
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-6xl mx-auto">
          <MotionDiv className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
            TIGER HILL TRANSPORT LLC
          </MotionDiv>
          
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 text-orange-300">
            Carrier & Owner-Operator Partner
          </div>
          
          <div className="mb-6 sm:mb-8">
            <Badge variant="outline" className="bg-white/10 border-white/30 text-white px-3 sm:px-4 py-2 text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
              MC: 1091445 | DOT: 3394301
            </Badge>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto px-2">
              Partner with us for reliable freight opportunities
            </p>
          </div>
          
          <div>
            <Button 
              size="lg" 
              className="bg-orange-400 hover:bg-orange-500 text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 group"
              onClick={() => {
                const contactElement = document.getElementById('contact');
                if (contactElement) {
                  contactElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
            >
              Get In Touch
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <MotionDiv className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl mb-6 sm:mb-8 shadow-lg">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">About Tiger Hill Transport LLC</h2>
            <Separator className="w-16 sm:w-24 mx-auto bg-orange-400 mb-6 sm:mb-8" />
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              Connecting owner-operators with quality freight opportunities across the United States
            </p>
          </MotionDiv>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
            {/* Experience Card */}
            <MotionCard>
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl overflow-hidden group h-full">
                <CardHeader className="text-center pb-4 sm:pb-6 pt-6 sm:pt-8">
                  <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:shadow-blue-500/25 transition-shadow">
                    <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Established Carrier</CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 sm:px-8 pb-6 sm:pb-8">
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    Licensed carrier with MC and DOT authority, providing owner-operators with quality freight opportunities
                  </p>
                </CardContent>
              </Card>
            </MotionCard>

            {/* Coverage Card */}
            <MotionCard>
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl overflow-hidden group h-full">
                <CardHeader className="text-center pb-4 sm:pb-6 pt-6 sm:pt-8">
                  <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:shadow-green-500/25 transition-shadow">
                    <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Nationwide Freight</CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 sm:px-8 pb-6 sm:pb-8">
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    Access to freight lanes across all 48 continental states with established broker relationships
                  </p>
                </CardContent>
              </Card>
            </MotionCard>

            {/* Quality Card */}
            <MotionCard>
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl overflow-hidden group h-full">
                <CardHeader className="text-center pb-4 sm:pb-6 pt-6 sm:pt-8">
                  <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:shadow-purple-500/25 transition-shadow">
                    <Star className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Owner-Operator Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 sm:px-8 pb-6 sm:pb-8">
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    Dedicated support for owner-operators with competitive rates and reliable settlements
                  </p>
                </CardContent>
              </Card>
            </MotionCard>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4 sm:mr-6 shadow-lg mb-4 sm:mb-0">
                  <Truck className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  Licensed Carrier & Owner-Operator Partner
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Tiger Hill Transport LLC is a licensed carrier (MC: 1091445, DOT: 3394301) that partners with 
                qualified owner-operators to provide reliable freight transportation services. We connect 
                independent contractors with quality freight opportunities while maintaining the highest 
                standards of safety and compliance.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Our owner-operators benefit from established broker relationships, competitive rates, and 
                reliable weekly settlements. We handle the administrative burden while you focus on what 
                you do best - driving and delivering freight safely and on time.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                <div className="flex items-center bg-white px-3 sm:px-4 py-2 rounded-full shadow-md">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">24/7 Availability</span>
                </div>
                <div className="flex items-center bg-white px-3 sm:px-4 py-2 rounded-full shadow-md">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Fully Insured</span>
                </div>
                <div className="flex items-center bg-white px-3 sm:px-4 py-2 rounded-full shadow-md">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Licensed & Certified</span>
                </div>
              </div>
            </div>
            
            <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="pb-4 sm:pb-6 pt-6 sm:pt-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-gray-900">Partnership Benefits</h4>
                </div>
              </CardHeader>
              <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="grid gap-4 sm:gap-6">
                  <MotionSlide className="flex items-center p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 sm:mr-6 shadow-lg flex-shrink-0">
                      <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                      <h5 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Quality Freight Opportunities</h5>
                      <p className="text-sm sm:text-base text-gray-600">Access to established broker relationships and premium loads</p>
                    </div>
                  </MotionSlide>
                  
                  <MotionSlide className="flex items-center p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 sm:mr-6 shadow-lg flex-shrink-0">
                      <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                      <h5 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Competitive Rates</h5>
                      <p className="text-sm sm:text-base text-gray-600">Fair compensation with only 8% carrier fee</p>
                    </div>
                  </MotionSlide>
                  
                  <MotionSlide className="flex items-center p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 sm:mr-6 shadow-lg flex-shrink-0">
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                      <h5 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Weekly Settlements</h5>
                      <p className="text-sm sm:text-base text-gray-600">Reliable weekly payments with detailed settlement sheets</p>
                    </div>
                  </MotionSlide>
                  
                  <MotionSlide className="flex items-center p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 sm:mr-6 shadow-lg flex-shrink-0">
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                      <h5 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Administrative Support</h5>
                      <p className="text-sm sm:text-base text-gray-600">We handle paperwork, compliance, and broker relationships</p>
                    </div>
                  </MotionSlide>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <MotionDiv className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl mb-6 sm:mb-8 shadow-lg">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight">Required Documents</h2>
            <Separator className="w-16 sm:w-24 mx-auto bg-orange-400 mb-6 sm:mb-8" />
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              Owner-operators must provide current documentation to partner with Tiger Hill Transport LLC
            </p>
          </MotionDiv>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {credentials.map((credential, index) => (
              <MotionCard
                key={index}
                className="group"
              >
                <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="text-center relative z-10 pb-4 sm:pb-6 pt-6 sm:pt-8">
                    <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:shadow-orange-500/25 transition-shadow">
                      <credential.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
                      {credential.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center relative z-10 px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {credential.description}
                    </p>
                  </CardContent>
                  
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
                </Card>
              </MotionCard>
            ))}
          </div>
          
          <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8 bg-white/10 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-4 sm:py-6 shadow-xl border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-white">All Certifications Current</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/30"></div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-white">Fully Compliant</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/30"></div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-white">Regularly Updated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lease Agreement Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl mb-6 sm:mb-8 shadow-lg">
              <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">Partnership Terms</h2>
            <Separator className="w-16 sm:w-24 mx-auto bg-orange-400 mb-6 sm:mb-8" />
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              Clear, transparent terms for our owner-operator partnerships
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Compensation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-900/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-gray-900 font-bold text-sm sm:text-base">8%</span>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">Carrier fee - only 8% of gross revenue</p>
                </div>
                <div className="flex items-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">Weekly settlements with detailed sheets</p>
                </div>
                <div className="flex items-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-600/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">Direct payment collection from brokers</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-900/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Truck className="w-3 h-3 sm:w-4 sm:h-4 text-gray-900" />
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">Provide your own truck and equipment</p>
                </div>
                <div className="flex items-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">Fuel, maintenance, and operating costs</p>
                </div>
                <div className="flex items-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-600/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">Maintain DOT compliance and safety standards</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Independent Contractor Status</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  You operate as an independent contractor under our authority. You&apos;re responsible for your own 
                  taxes, workers&apos; compensation, and benefits. We provide the freight opportunities and handle 
                  the administrative burden of broker relationships and compliance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto">
          {/* Partner With Us Header - Mobile Optimized */}
          <div className="partner-section text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl mb-6 sm:mb-8 shadow-lg">
              <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight">Partner With Us</h2>
            <Separator className="w-16 sm:w-24 mx-auto bg-orange-400 mb-6 sm:mb-8" />
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              Ready to partner with Tiger Hill Transport LLC? Contact us to learn more about our owner-operator opportunities.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Company Information - Mobile Optimized */}
            <div className="mobile-form-section">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Company Information</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm sm:text-base">Email</p>
                    <p className="text-gray-300 text-sm sm:text-base">tigerhilltransport@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm sm:text-base">Address</p>
                    <p className="text-gray-300 text-sm sm:text-base">220 Ash Dr, Elizabeth, PA 15037</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Application Form - Mobile Optimized */}
            <Card className="mobile-form-card border border-gray-200 shadow-lg bg-white">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Apply to Partner</CardTitle>
                <CardDescription className="form-description text-gray-600 text-sm sm:text-base">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="mobile-form-container">
                <form key="contact-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-gray-900 font-semibold mb-2 sm:mb-3 block text-sm sm:text-base">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      autoComplete="name"
                      enterKeyHint="next"
                      className="rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900/10 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base transition-all duration-200 hover:border-gray-400 bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-900 font-semibold mb-2 sm:mb-3 block text-sm sm:text-base">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      autoComplete="email"
                      enterKeyHint="next"
                      inputMode="email"
                      className="rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900/10 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base transition-all duration-200 hover:border-gray-400 bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-900 font-semibold mb-2 sm:mb-3 block text-sm sm:text-base">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your trucking experience and equipment..."
                      rows={4}
                      required
                      autoComplete="off"
                      enterKeyHint="done"
                      className="rounded-lg border-gray-300 focus:border-gray-900 focus:ring-gray-900/10 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base transition-all duration-200 hover:border-gray-400 bg-gray-50/50 resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-lg py-3 sm:py-4 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 mt-4 sm:mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Apply Now"}
                  </Button>
                  {submitMessage && (
                    <p className={`text-xs sm:text-sm mt-3 text-center ${submitMessage.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}>
                      {submitMessage}
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">TIGER HILL TRANSPORT LLC</h3>
              <p className="text-gray-400 text-sm sm:text-base">Professional Driver & Owner Operator</p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center justify-center md:justify-start text-sm sm:text-base">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  tigerhilltransport@gmail.com
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Authority</h4>
              <p className="text-gray-400 text-sm sm:text-base">MC: 1091445 | DOT: 3394301</p>
            </div>
          </div>
          <Separator className="my-6 sm:my-8 bg-gray-700" />
          <div className="text-center text-gray-400">
            <p className="text-xs sm:text-sm">&copy; 2024 Tiger Hill Transport LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
