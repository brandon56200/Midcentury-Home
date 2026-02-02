"use client";

import { Layers, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="h-8 w-8 text-indigo-500" />
              <span className="text-2xl font-bold text-white">Midcentury Labs</span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Defining the infrastructure for the multimodal era. 
              We empower builders to turn complex data into intelligent action.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Integrations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
          <p className="text-gray-500 text-sm">
            © 2026 Midcentury Labs Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github className="h-5 w-5" /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

