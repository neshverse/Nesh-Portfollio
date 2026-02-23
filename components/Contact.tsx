import React from 'react';
import { Mail, MapPin, Phone, Globe, Send, Github, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { NavigationSection } from '../types';

export const Contact: React.FC = () => {
  return (
    <footer id={NavigationSection.CONTACT} className="relative py-20 border-t border-white/5 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Let's Connect</h2>
              <p className="text-gray-300 text-lg">
                I'm available for opportunities in Data Science, Machine Learning, and Data Engineering. Let's discuss how we can build the future together.
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <a href="https://www.linkedin.com/in/dinesh-krishnamoorthy-032b83342/" target="_blank" rel="noreferrer" className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-[#0077b5]/20 hover:border-[#0077b5]/50 transition-all duration-300">
                <div className="p-3 rounded-full bg-[#0077b5]/20 text-[#0077b5] mr-4 group-hover:scale-110 transition-transform">
                  <Linkedin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white group-hover:text-[#0077b5] transition-colors">LinkedIn</p>
                  <p className="text-sm text-gray-400">Professional Profile</p>
                </div>
                <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-[#0077b5]" />
              </a>

              <a href="https://github.com/neshverse" target="_blank" rel="noreferrer" className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-gray-700/50 hover:border-white/30 transition-all duration-300">
                <div className="p-3 rounded-full bg-white/10 text-white mr-4 group-hover:scale-110 transition-transform">
                  <Github className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">GitHub</p>
                  <p className="text-sm text-gray-400">Code & Projects</p>
                </div>
                <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-white" />
              </a>

              <a href="https://x.com/neshverse" target="_blank" rel="noreferrer" className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-black/40 hover:border-white/30 transition-all duration-300">
                <div className="p-3 rounded-full bg-black/20 text-white mr-4 group-hover:scale-110 transition-transform">
                  <Twitter className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">X (Twitter)</p>
                  <p className="text-sm text-gray-400">Updates & Thoughts</p>
                </div>
                <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-white" />
              </a>
            </div>
          </div>

          {/* Formspree Form */}
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form
              action="https://formspree.io/f/xyzprgep"
              method="POST"
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="I'm interested in your ML expertise..."
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.02] flex items-center justify-center">
                Send Message <Send size={18} className="ml-2" />
              </button>
            </form>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Dinesh Krishnamoorthy. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* Socials moved to top, can keep minimal links here or remove. Removing to reuse existing space cleaner if that's what 'better' means, or just keeping copyright. I'll keep them as simple icons just in case user wants footer links, but the main ones are now 'better' above. */}
            <a href="https://www.linkedin.com/in/dinesh-krishnamoorthy-032b83342/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors"><Linkedin size={18} /></a>
            <a href="https://github.com/neshverse" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Github size={18} /></a>
            <a href="https://x.com/neshverse" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Twitter size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};