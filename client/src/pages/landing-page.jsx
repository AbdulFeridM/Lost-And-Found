import React from 'react';
import { Link } from 'react-router-dom';
import Features from './_components/Features';
import {
  Megaphone,
  Sparkles,
  Bell,
  ShieldCheck
} from 'lucide-react';
import Footer from '../components/footer';

const features = [
  {
    title: 'Report Lost & Found',
    description: 'Post lost or found items with images, dates, and campus locations.',
    icon: <Megaphone className="w-8 h-8 text-blue-500" />
  },
  {
    title: 'Smart Matching System',
    description: 'Automatically matches found items with lost item posts using metadata.',
    icon: <Sparkles className="w-8 h-8 text-blue-500" />
  },
  {
    title: 'Real-Time Notifications',
    description: 'Get instantly notified when your item is matched or claimed.',
    icon: <Bell className="w-8 h-8 text-blue-500" />
  },
  {
    title: 'Admin Moderation',
    description: 'Admins handle disputes, approvals, and remove inappropriate content.',
    icon: <ShieldCheck className="w-8 h-8 text-blue-500" />
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen font-sans text-gray-800 bg-white">
      {/* Hero Section */}
      <section className=" mt-5 max-w-7xl mx-auto px-4 py-32 flex flex-col-reverse md:flex-row items-center gap-16 lg:bg-[url('/hero_image.png')] bg-cover bg-center">
        <div className="flex-1 text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            Simplifying Campus Lost and Found<br className="hidden md:inline" /> One Click at a Time.
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            A trusted platform helping students and staff reclaim what's lost—faster than ever.
          </p>
          <div className="flex justify-center md:justify-start gap-4 flex-wrap">
            <Link
              to="/register"
              className="px-6 py-3 text-white bg-blue-600 rounded-full font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="px-6 py-3 text-blue-600 border border-blue-600 rounded-full font-medium hover:bg-blue-50 transition"
            >
              Explore Features
            </a>
          </div>
        </div>
        <div className="flex-1" />
      </section>

      {/* Features Section */}
      <Features features={features} />

      {/* CTA */}
      <section className="py-20 max-w-4xl mx-auto text-center border-t border-gray-200 mt-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Join hundreds reclaiming their items faster than ever!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Sign up now to report, track, and manage lost & found with ease.
        </p>
        <Link
          to="/register"
          className="inline-block px-8 py-4 border border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition"
        >
          Register Now
        </Link>
      </section>
      <Footer/>
    </main>
  );
}
