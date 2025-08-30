"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import { CheckCircle, Mail, Truck, Shield, FileText, User, Award, Clock, MapPin, Star, Zap } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    } catch {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            TIGER HILL TRANSPORT LLC
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-orange-200">
            Carrier & Owner-Operator Partner
          </h2>
          <p className="text-xl md:text-2xl mb-4 text-gray-100 max-w-2xl mx-auto">
            MC: 1091445 | DOT: 3394301
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Partner with us for reliable freight opportunities
          </p>
          <Button 
            size="lg" 
            className="bg-orange-400 hover:bg-orange-300 text-white px-12 py-4 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </Button>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-ghost-white to-white" data-aos="fade-up">
        <div className="max-w-6xl mx-auto">
                      <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-charcoal/10 rounded-full mb-6">
                <Award className="w-8 h-8 text-charcoal" />
              </div>
              <h2 className="text-4xl font-bold text-charcoal mb-4">About Tiger Hill Transport LLC</h2>
              <Separator className="w-24 mx-auto bg-charcoal" />
              <p className="text-lg text-paynes-gray mt-6 max-w-2xl mx-auto">
                Connecting owner-operators with quality freight opportunities across the United States
              </p>
            </div>
          
                      <div className="grid lg:grid-cols-3 gap-8 mb-16" data-aos="fade-up" data-aos-delay="200">
              {/* Experience Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-charcoal/10 rounded-full flex items-center justify-center mb-6">
                    <Clock className="w-10 h-10 text-charcoal" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-charcoal">Established Carrier</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-paynes-gray text-lg">
                    Licensed carrier with MC and DOT authority, providing owner-operators with quality freight opportunities
                  </p>
                </CardContent>
              </Card>

              {/* Coverage Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-paynes-gray/10 rounded-full flex items-center justify-center mb-6">
                    <MapPin className="w-10 h-10 text-paynes-gray" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-charcoal">Nationwide Freight</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-paynes-gray text-lg">
                    Access to freight lanes across all 48 continental states with established broker relationships
                  </p>
                </CardContent>
              </Card>

              {/* Quality Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-light-blue/20 rounded-full flex items-center justify-center mb-6">
                    <Star className="w-10 h-10 text-paynes-gray" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-charcoal">Owner-Operator Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-paynes-gray text-lg">
                    Dedicated support for owner-operators with competitive rates and reliable settlements
                  </p>
                </CardContent>
              </Card>
            </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center" data-aos="fade-up" data-aos-delay="400">
                          <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-charcoal/10 rounded-full flex items-center justify-center mr-4">
                    <Truck className="w-6 h-6 text-charcoal" />
                  </div>
                  <h3 className="text-3xl font-bold text-charcoal">
                    Licensed Carrier & Owner-Operator Partner
                  </h3>
                </div>
                <p className="text-lg text-paynes-gray mb-6 leading-relaxed">
                  Tiger Hill Transport LLC is a licensed carrier (MC: 1091445, DOT: 3394301) that partners with 
                  qualified owner-operators to provide reliable freight transportation services. We connect 
                  independent contractors with quality freight opportunities while maintaining the highest 
                  standards of safety and compliance.
                </p>
                <p className="text-lg text-paynes-gray mb-8 leading-relaxed">
                  Our owner-operators benefit from established broker relationships, competitive rates, and 
                  reliable weekly settlements. We handle the administrative burden while you focus on what 
                  you do best - driving and delivering freight safely and on time.
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 text-charcoal mr-2" />
                    <span className="text-sm font-medium text-paynes-gray">24/7 Availability</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-paynes-gray mr-2" />
                    <span className="text-sm font-medium text-paynes-gray">Fully Insured</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-light-blue mr-2" />
                    <span className="text-sm font-medium text-paynes-gray">Licensed & Certified</span>
                  </div>
                </div>
              </div>
            
            <div className="bg-gradient-to-br from-charcoal/5 to-light-blue/10 p-8 rounded-2xl border border-charcoal/10">
              <h4 className="text-3xl font-bold text-charcoal mb-8 flex items-center">
                <Zap className="w-8 h-8 text-charcoal mr-4" />
                Partnership Benefits
              </h4>
              <div className="grid gap-6">
                <div className="flex items-center p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                  <div className="w-16 h-16 bg-charcoal/10 rounded-full flex items-center justify-center mr-6">
                    <Truck className="w-8 h-8 text-charcoal" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-charcoal mb-1">Quality Freight Opportunities</h5>
                    <p className="text-base text-paynes-gray">Access to established broker relationships and premium loads</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                  <div className="w-16 h-16 bg-paynes-gray/10 rounded-full flex items-center justify-center mr-6">
                    <Zap className="w-8 h-8 text-paynes-gray" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-charcoal mb-1">Competitive Rates</h5>
                    <p className="text-base text-paynes-gray">Fair compensation with only 8% carrier fee</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                  <div className="w-16 h-16 bg-light-blue/20 rounded-full flex items-center justify-center mr-6">
                    <Shield className="w-8 h-8 text-paynes-gray" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-charcoal mb-1">Weekly Settlements</h5>
                    <p className="text-base text-paynes-gray">Reliable weekly payments with detailed settlement sheets</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                  <div className="w-16 h-16 bg-charcoal/10 rounded-full flex items-center justify-center mr-6">
                    <MapPin className="w-8 h-8 text-charcoal" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-charcoal mb-1">Administrative Support</h5>
                    <p className="text-base text-paynes-gray">We handle paperwork, compliance, and broker relationships</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-ghost-white via-white to-ghost-white" data-aos="fade-up">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-charcoal/10 rounded-full mb-6">
              <Shield className="w-8 h-8 text-charcoal" />
            </div>
            <h2 className="text-4xl font-bold text-charcoal mb-4">Required Documents</h2>
            <Separator className="w-24 mx-auto bg-charcoal" />
            <p className="text-lg text-paynes-gray mt-6 max-w-2xl mx-auto">
              Owner-operators must provide current documentation to partner with Tiger Hill Transport LLC
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="200">
            {credentials.map((credential, index) => (
                             <Card 
                 key={index} 
                 className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover:bg-gradient-to-br hover:from-charcoal/5 hover:to-light-blue/10"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-charcoal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <CardHeader className="text-center relative z-10">
                   <div className="mx-auto w-16 h-16 bg-gradient-to-br from-charcoal/10 to-light-blue/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                     <credential.icon className="w-8 h-8 text-charcoal group-hover:text-paynes-gray transition-colors" />
                   </div>
                   <CardTitle className="text-xl font-bold text-charcoal group-hover:text-paynes-gray transition-colors">
                     {credential.name}
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="text-center relative z-10">
                   <p className="text-paynes-gray leading-relaxed">
                     {credential.description}
                   </p>
                 </CardContent>
                 
                 {/* Decorative corner element */}
                 <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-charcoal/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               </Card>
            ))}
          </div>
          
                     {/* Additional trust indicators */}
           <div className="mt-16 text-center">
             <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-charcoal/10">
               <div className="flex items-center space-x-2">
                 <div className="w-3 h-3 bg-charcoal rounded-full animate-pulse"></div>
                 <span className="text-sm font-medium text-paynes-gray">All Certifications Current</span>
               </div>
               <div className="w-px h-6 bg-light-blue"></div>
               <div className="flex items-center space-x-2">
                 <div className="w-3 h-3 bg-paynes-gray rounded-full animate-pulse"></div>
                 <span className="text-sm font-medium text-paynes-gray">Fully Compliant</span>
               </div>
               <div className="w-px h-6 bg-light-blue"></div>
               <div className="flex items-center space-x-2">
                 <div className="w-3 h-3 bg-light-blue rounded-full animate-pulse"></div>
                 <span className="text-sm font-medium text-paynes-gray">Regularly Updated</span>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Lease Agreement Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-charcoal/5 to-light-blue/10" data-aos="fade-up">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-charcoal/10 rounded-full mb-6">
              <FileText className="w-8 h-8 text-charcoal" />
            </div>
            <h2 className="text-4xl font-bold text-charcoal mb-4">Partnership Terms</h2>
            <Separator className="w-24 mx-auto bg-charcoal" />
            <p className="text-lg text-paynes-gray mt-6 max-w-2xl mx-auto">
              Clear, transparent terms for our owner-operator partnerships
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8" data-aos="fade-up" data-aos-delay="200">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-charcoal">Compensation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-charcoal/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-charcoal font-bold">8%</span>
                  </div>
                  <p className="text-paynes-gray">Carrier fee - only 8% of gross revenue</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-light-blue/20 rounded-full flex items-center justify-center mr-3">
                    <Clock className="w-4 h-4 text-light-blue" />
                  </div>
                  <p className="text-paynes-gray">Weekly settlements with detailed sheets</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-paynes-gray/10 rounded-full flex items-center justify-center mr-3">
                    <Shield className="w-4 h-4 text-paynes-gray" />
                  </div>
                  <p className="text-paynes-gray">Direct payment collection from brokers</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-charcoal">Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-charcoal/10 rounded-full flex items-center justify-center mr-3">
                    <Truck className="w-4 h-4 text-charcoal" />
                  </div>
                  <p className="text-paynes-gray">Provide your own truck and equipment</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-light-blue/20 rounded-full flex items-center justify-center mr-3">
                    <Zap className="w-4 h-4 text-light-blue" />
                  </div>
                  <p className="text-paynes-gray">Fuel, maintenance, and operating costs</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-paynes-gray/10 rounded-full flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-paynes-gray" />
                  </div>
                  <p className="text-paynes-gray">Maintain DOT compliance and safety standards</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="400">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-charcoal mb-4">Independent Contractor Status</h3>
                <p className="text-paynes-gray leading-relaxed">
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
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-ghost-white to-white" data-aos="fade-up">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">Partner With Us</h2>
            <Separator className="w-24 mx-auto bg-charcoal" />
            <p className="text-lg text-paynes-gray mt-4 max-w-2xl mx-auto">
              Ready to partner with Tiger Hill Transport LLC? Contact us to learn more about our owner-operator opportunities.
            </p>
          </div>
                      <div className="grid md:grid-cols-2 gap-12" data-aos="fade-up" data-aos-delay="200">
              <div>
                <h3 className="text-2xl font-bold text-charcoal mb-6">Company Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-charcoal/10 rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-charcoal" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">Email</p>
                      <p className="text-paynes-gray">tigerhilltransport@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-charcoal/10 rounded-full flex items-center justify-center mr-4">
                      <Truck className="w-6 h-6 text-charcoal" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">Address</p>
                      <p className="text-paynes-gray">220 Ash Dr, Elizabeth, PA 15037</p>
                    </div>
                  </div>
                </div>
              </div>
                          <Card className="border border-charcoal/10 shadow-lg bg-white">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold text-charcoal">Apply to Partner</CardTitle>
                  <CardDescription className="text-paynes-gray">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-charcoal font-semibold mb-3 block text-lg">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        className="rounded-lg border-charcoal/20 focus:border-charcoal focus:ring-charcoal/10 px-6 py-4 text-lg transition-all duration-200 hover:border-charcoal/40 bg-ghost-white/50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-charcoal font-semibold mb-3 block text-lg">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="rounded-lg border-charcoal/20 focus:border-charcoal focus:ring-charcoal/10 px-6 py-4 text-lg transition-all duration-200 hover:border-charcoal/40 bg-ghost-white/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-charcoal font-semibold mb-3 block text-lg">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your trucking experience and equipment..."
                        rows={5}
                        required
                        className="rounded-lg border-charcoal/20 focus:border-charcoal focus:ring-charcoal/10 px-6 py-4 text-lg transition-all duration-200 hover:border-charcoal/40 bg-ghost-white/50 resize-none"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-charcoal hover:bg-paynes-gray text-ghost-white rounded-lg py-4 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 mt-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Apply Now"}
                    </Button>
                    {submitMessage && (
                      <p className={`text-sm mt-3 text-center ${submitMessage.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}>
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
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-semibold mb-4">TIGER HILL TRANSPORT LTD</h3>
              <p className="text-gray-400">Professional Driver & Owner Operator</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center justify-center md:justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  tigerhilltransport@gmail.com
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Authority</h4>
              <p className="text-gray-400">MC: 1091445 | DOT: 3394301</p>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Tiger Hill Transport LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
