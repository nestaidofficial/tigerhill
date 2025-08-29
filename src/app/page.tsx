"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Phone, Mail, Truck, Shield, FileText, User, Award, Clock, MapPin, Star, Zap } from "lucide-react";

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
    { name: "Insurance", icon: Shield, description: "Full coverage insurance" },
    { name: "Equipment Registration", icon: Truck, description: "All equipment properly registered" },
    { name: "Driver License", icon: User, description: "Valid commercial driver's license" },
    { name: "Medical Certificate", icon: FileText, description: "Current medical certification" },
    { name: "Other Certifications", icon: CheckCircle, description: "Additional safety and compliance certifications" }
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
            TIGER HILL TRANSPORT LTD
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-orange-200">
            Driver / Owner Operator
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Reliable and Professional Trucking Services
          </p>
          <Button 
            size="lg" 
            className="bg-charcoal hover:bg-paynes-gray text-ghost-white px-8 py-3 text-lg transition-colors duration-300"
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
      <section className="py-20 px-4 bg-gradient-to-br from-ghost-white to-white">
        <div className="max-w-6xl mx-auto">
                      <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-charcoal/10 rounded-full mb-6">
                <Award className="w-8 h-8 text-charcoal" />
              </div>
              <h2 className="text-4xl font-bold text-charcoal mb-4">About Tiger Hill Transport</h2>
              <Separator className="w-24 mx-auto bg-charcoal" />
              <p className="text-lg text-paynes-gray mt-6 max-w-2xl mx-auto">
                Delivering excellence across North America with precision, reliability, and unmatched professionalism
              </p>
            </div>
          
                      <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {/* Experience Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-charcoal/10 rounded-full flex items-center justify-center mb-6">
                    <Clock className="w-10 h-10 text-charcoal" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-charcoal">10+ Years Experience</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-paynes-gray text-lg">
                    Over a decade of professional trucking experience with a proven track record of safety and reliability
                  </p>
                </CardContent>
              </Card>

              {/* Coverage Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-paynes-gray/10 rounded-full flex items-center justify-center mb-6">
                    <MapPin className="w-10 h-10 text-paynes-gray" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-charcoal">Nationwide Coverage</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-paynes-gray text-lg">
                    Comprehensive transportation services across all 48 continental states and Canada
                  </p>
                </CardContent>
              </Card>

              {/* Quality Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-light-blue/20 rounded-full flex items-center justify-center mb-6">
                    <Star className="w-10 h-10 text-paynes-gray" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-charcoal">Premium Service</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-paynes-gray text-lg">
                    Commitment to excellence with on-time delivery and careful handling of your valuable cargo
                  </p>
                </CardContent>
              </Card>
            </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
                          <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-charcoal/10 rounded-full flex items-center justify-center mr-4">
                    <Truck className="w-6 h-6 text-charcoal" />
                  </div>
                  <h3 className="text-3xl font-bold text-charcoal">
                    Professional Driver & Owner Operator
                  </h3>
                </div>
                <p className="text-lg text-paynes-gray mb-6 leading-relaxed">
                  As a dedicated owner-operator, I bring a personal commitment to every delivery. With over 10 years 
                  of experience in the trucking industry, I understand the importance of reliability, safety, and 
                  customer satisfaction in today's competitive market.
                </p>
                <p className="text-lg text-paynes-gray mb-8 leading-relaxed">
                  My modern, well-maintained equipment and comprehensive insurance coverage ensure your cargo 
                  arrives safely and on time. I specialize in long-haul transportation, expedited shipping, 
                  and specialized freight handling with a focus on temperature-controlled and sensitive cargo.
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
                Services Offered
              </h4>
              <div className="grid gap-6">
                <div className="flex items-center p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                  <div className="w-16 h-16 bg-charcoal/10 rounded-full flex items-center justify-center mr-6">
                    <Truck className="w-8 h-8 text-charcoal" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-charcoal mb-1">Long-Haul Transportation</h5>
                    <p className="text-base text-paynes-gray">Cross-country and interstate deliveries</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                  <div className="w-16 h-16 bg-paynes-gray/10 rounded-full flex items-center justify-center mr-6">
                    <Zap className="w-8 h-8 text-paynes-gray" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-charcoal mb-1">Expedited Shipping</h5>
                    <p className="text-base text-paynes-gray">Time-sensitive and rush deliveries</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                  <div className="w-16 h-16 bg-light-blue/20 rounded-full flex items-center justify-center mr-6">
                    <Shield className="w-8 h-8 text-paynes-gray" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-charcoal mb-1">Specialized Freight</h5>
                    <p className="text-base text-paynes-gray">Temperature-controlled and sensitive cargo</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                  <div className="w-16 h-16 bg-charcoal/10 rounded-full flex items-center justify-center mr-6">
                    <MapPin className="w-8 h-8 text-charcoal" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-charcoal mb-1">Nationwide Coverage</h5>
                    <p className="text-base text-paynes-gray">Service to all 48 states and Canada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-ghost-white via-white to-ghost-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-charcoal/10 rounded-full mb-6">
              <Shield className="w-8 h-8 text-charcoal" />
            </div>
            <h2 className="text-4xl font-bold text-charcoal mb-4">My Credentials</h2>
            <Separator className="w-24 mx-auto bg-charcoal" />
            <p className="text-lg text-paynes-gray mt-6 max-w-2xl mx-auto">
              All necessary documentation and certifications are current and in compliance with federal regulations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-ghost-white to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">Get In Touch</h2>
            <Separator className="w-24 mx-auto bg-charcoal" />
            <p className="text-lg text-paynes-gray mt-4 max-w-2xl mx-auto">
              Ready to discuss your transportation needs? Contact me for a quote or to learn more about my services.
            </p>
          </div>
                      <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-charcoal mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-charcoal/10 rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-charcoal" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">Email</p>
                      <p className="text-paynes-gray">john.smith@trucking.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-charcoal/10 rounded-full flex items-center justify-center mr-4">
                      <Truck className="w-6 h-6 text-charcoal" />
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">Service Area</p>
                      <p className="text-paynes-gray">Nationwide coverage</p>
                    </div>
                  </div>
                </div>
              </div>
                          <Card className="border border-charcoal/10 shadow-lg bg-white">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold text-charcoal">Send a Message</CardTitle>
                  <CardDescription className="text-paynes-gray">
                    Fill out the form below and I&apos;ll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-charcoal font-semibold mb-2 block">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        className="rounded-lg border-charcoal/20 focus:border-charcoal focus:ring-charcoal/10 px-4 py-3 text-base transition-all duration-200 hover:border-charcoal/40 bg-ghost-white/50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-charcoal font-semibold mb-2 block">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="rounded-lg border-charcoal/20 focus:border-charcoal focus:ring-charcoal/10 px-4 py-3 text-base transition-all duration-200 hover:border-charcoal/40 bg-ghost-white/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-charcoal font-semibold mb-2 block">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your transportation needs..."
                        rows={4}
                        required
                        className="rounded-lg border-charcoal/20 focus:border-charcoal focus:ring-charcoal/10 px-4 py-3 text-base transition-all duration-200 hover:border-charcoal/40 bg-ghost-white/50 resize-none"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-charcoal hover:bg-paynes-gray text-ghost-white rounded-lg py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 mt-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
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
                  john.smith@trucking.com
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Service Area</h4>
              <p className="text-gray-400">Nationwide coverage for all your transportation needs</p>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Tiger Hill Transport Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
