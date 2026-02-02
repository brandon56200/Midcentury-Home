"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Database, Layers, BarChart, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Solutions", href: "#solutions" },
  { name: "Platform", href: "#platform" },
  { name: "Company", href: "#company" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-8 z-50 w-full px-4 flex justify-center">
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="max-w-4xl w-full liquid-glass rounded-full px-6 py-2"
      >
        <div className="flex h-12 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-lg font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                Midcentury <span className="text-indigo-400">Labs</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all border border-white/10">
                Get Access
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/80 backdrop-blur-2xl rounded-3xl mt-4 p-4 space-y-1 border border-white/10"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button className="w-full text-left bg-white/10 text-white block px-3 py-2 rounded-md text-base font-medium border border-white/10">
              Get Access
            </button>
          </motion.div>
        )}
      </motion.nav>
    </div>
  );
}

