'use client';

import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import { giveaway, isGiveawayLive } from '../lib/giveaway';

// TikTok isn't in lucide-react, so inline the official wordmark glyph.
function TikTokIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.74a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.17z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/specialtybuilt',
    icon: Instagram,
    hover: 'hover:bg-pink-600',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@the.diesel.dan',
    icon: TikTokIcon,
    hover: 'hover:bg-white hover:text-slate-900',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/18cLZzco8p/',
    icon: Facebook,
    hover: 'hover:bg-blue-600',
  },
];

export default function Footer() {
  // Hide Sweepstakes Rules link when there's no active campaign — keeps the
  // footer clean during postponements without removing the page entirely.
  const giveawayLive = isGiveawayLive(giveaway);
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">Specialty Built</h3>
            <p className="text-slate-400 mb-4">
              Premium custom solutions for every need. We specialize in delivering high-quality,
              custom-built products tailored to your specific requirements.
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks.map(({ label, href, icon: Icon, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-slate-300 ${hover} hover:text-white transition-colors`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/shop?category=parts" className="text-slate-400 hover:text-white transition-colors">Parts</Link></li>
              <li><Link href="/shop?category=apparel" className="text-slate-400 hover:text-white transition-colors">Apparel</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
              {giveawayLive && (
                <li><Link href="/giveaway/rules" className="text-slate-400 hover:text-white transition-colors">Sweepstakes Rules</Link></li>
              )}
              <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Email: dan@specialtybuilt.com</li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact us →
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Specialty Built. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}