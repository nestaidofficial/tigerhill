"use client";

import { useState } from "react";
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
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            TIGER HILL TRANSPORT LLC
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl font-semibold mb-4 text-orange-300"
          >
            Carrier & Owner-Operator Partner
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <Badge variant="outline" className="bg-white/10 border-white/30 text-white px-4 py-2 text-lg mb-4">
              MC: 1091445 | DOT: 3394301
            </Badge>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Partner with us for reliable freight opportunities
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              size="lg" 
              className="bg-orange-400 hover:bg-orange-500 text-white px-12 py-4 text-xl font-bold rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 group"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl mb-8 shadow-lg">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">About Tiger Hill Transport LLC</h2>
            <Separator className="w-24 mx-auto bg-orange-400 mb-8" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connecting owner-operators with quality freight opportunities across the United States
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-8 mb-20"
          >
            {/* Experience Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl overflow-hidden group">
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-blue-500/25 transition-shadow">
                    <Clock className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Established Carrier</CardTitle>
                </CardHeader>
                <CardContent className="text-center px-8 pb-8">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Licensed carrier with MC and DOT authority, providing owner-operators with quality freight opportunities
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Coverage Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl overflow-hidden group">
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-green-500/25 transition-shadow">
                    <MapPin className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Nationwide Freight</CardTitle>
                </CardHeader>
                <CardContent className="text-center px-8 pb-8">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Access to freight lanes across all 48 continental states with established broker relationships
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quality Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl overflow-hidden group">
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-purple-500/25 transition-shadow">
                    <Star className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Owner-Operator Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center px-8 pb-8">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Dedicated support for owner-operators with competitive rates and reliable settlements
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  Licensed Carrier & Owner-Operator Partner
                </h3>
              </div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Tiger Hill Transport LLC is a licensed carrier (MC: 1091445, DOT: 3394301) that partners with 
                qualified owner-operators to provide reliable freight transportation services. We connect 
                independent contractors with quality freight opportunities while maintaining the highest 
                standards of safety and compliance.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our owner-operators benefit from established broker relationships, competitive rates, and 
                reliable weekly settlements. We handle the administrative burden while you focus on what 
                you do best - driving and delivering freight safely and on time.
              </p>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                  <Zap className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">24/7 Availability</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Fully Insured</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Licensed & Certified</span>
                </div>
              </div>
            </div>
            
            <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="pb-6 pt-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900">Partnership Benefits</h4>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid gap-6">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-6 shadow-lg">
                      <Truck className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h5 className="text-xl font-bold text-gray-900 mb-2">Quality Freight Opportunities</h5>
                      <p className="text-gray-600">Access to established broker relationships and premium loads</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-6 shadow-lg">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h5 className="text-xl font-bold text-gray-900 mb-2">Competitive Rates</h5>
                      <p className="text-gray-600">Fair compensation with only 8% carrier fee</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-6 shadow-lg">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h5 className="text-xl font-bold text-gray-900 mb-2">Weekly Settlements</h5>
                      <p className="text-gray-600">Reliable weekly payments with detailed settlement sheets</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-6 shadow-lg">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h5 className="text-xl font-bold text-gray-900 mb-2">Administrative Support</h5>
                      <p className="text-gray-600">We handle paperwork, compliance, and broker relationships</p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl mb-8 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Required Documents</h2>
            <Separator className="w-24 mx-auto bg-orange-400 mb-8" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Owner-operators must provide current documentation to partner with Tiger Hill Transport LLC
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {credentials.map((credential, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="text-center relative z-10 pb-6 pt-8">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-orange-500/25 transition-shadow">
                      <credential.icon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {credential.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center relative z-10 px-8 pb-8">
                    <p className="text-gray-600 leading-relaxed">
                      {credential.description}
                    </p>
                  </CardContent>
                  
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center space-x-8 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-white">All Certifications Current</span>
              </div>
              <div className="w-px h-6 bg-white/30"></div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-white">Fully Compliant</span>
              </div>
              <div className="w-px h-6 bg-white/30"></div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-white">Regularly Updated</span>
              </div>
            </div>
          </motion.div>
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
