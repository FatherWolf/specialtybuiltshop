'use client';

import Link from 'next/link';

export default function Footer() {
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
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/shop" className="text-slate-400 hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Email: info@specialtybuilt.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Business St</li>
              <li>City, State 12345</li>
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