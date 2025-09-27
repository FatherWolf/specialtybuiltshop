'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import CartIcon from './CartIcon'
import CartModal from './CartModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-purple-900/95 to-teal-900/95 backdrop-blur-sm border-b border-purple-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Specialty Built Performance and Fab"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-teal-300 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-white hover:text-teal-300 transition-colors font-semibold">
              Shop
            </Link>
            <Link href="/services" className="text-white hover:text-teal-300 transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-white hover:text-teal-300 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-teal-300 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <CartIcon onClick={() => setIsCartOpen(!isCartOpen)} />
            <Link href="/shop" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
              Shop Now
            </Link>
            <a href="tel:+19802414823" className="flex items-center space-x-2 text-teal-300 hover:text-white transition-colors">
              <Phone size={16} />
              <span className="text-sm font-medium">(980) 241-4823</span>
            </a>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <CartIcon onClick={() => setIsCartOpen(!isCartOpen)} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-teal-300 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-purple-500/30 bg-gradient-to-r from-purple-900/95 to-teal-900/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                className="text-white hover:text-teal-300 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-white hover:text-teal-300 transition-colors py-3 px-4 rounded-lg hover:bg-white/10 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/services"
                className="text-white hover:text-teal-300 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-teal-300 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-teal-300 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 mt-4 border-t border-purple-500/30">
                <Link
                  href="/shop"
                  className="block bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg font-medium text-center transition-colors mb-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop Now
                </Link>
                <a href="tel:+19802414823" className="flex items-center justify-center space-x-2 text-teal-300 hover:text-white transition-colors py-2">
                  <Phone size={18} />
                  <span className="font-medium">(980) 241-4823</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </header>
  )
}