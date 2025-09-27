'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';

const fallbackProducts = [
  {
    id: 1,
    title: "Custom Specialty Built Hat",
    description: "Premium quality hat with custom Specialty Built branding. Available in multiple colors.",
    price: 29.99,
    images: ["/placeholder-hat.jpg"],
    variants: [
      { id: 1, title: "Black / One Size", price: 29.99, available: true },
      { id: 2, title: "Navy / One Size", price: 29.99, available: true },
      { id: 3, title: "Red / One Size", price: 29.99, available: true }
    ]
  }
];

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const products = await response.json();
        setFeaturedProducts(products.slice(0, 3));
      } else {
        setFeaturedProducts(fallbackProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setFeaturedProducts(fallbackProducts);
    }
  };

  const openProductModal = (product: any) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Hero Section with Background Image */}
      <section className="relative h-screen bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-teal-800/80 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/trucks/IMG_0740.JPG.jpeg"
            alt="Specialty Built Diesel Truck"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-blue-900/60 to-teal-800/60"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              Specialty Built
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-white">
              Performance Parts & Custom Fabrication
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl">
              Premium Diesel Performance Parts & Custom Solutions
              <br />
              <span className="text-lg text-teal-300">Duramax • Cummins • Powerstroke • Custom Fab Services</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-teal-600 hover:from-purple-600 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-xl w-full"
                >
                  Shop Parts Now
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/50 hover:border-white bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 w-full"
                >
                  Custom Fabrication
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-teal-900/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Premium Diesel Parts</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              High-performance diesel parts and custom fabrication solutions for Duramax, Cummins, and Powerstroke engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Performance Parts",
                description: "Premium diesel performance parts for Duramax, Cummins, and Powerstroke engines. Turbos, injectors, exhaust systems and more.",
                icon: "⚡",
                image: "/images/parts-engines/IMG_1762.jpg"
              },
              {
                title: "Custom Fabrication",
                description: "Bespoke diesel parts and components fabricated to your exact specifications with FABMD partnership quality.",
                icon: "🔨",
                image: "/images/parts-engines/IMG_2948.jpg"
              },
              {
                title: "Complete Kits",
                description: "Full performance upgrade packages and bulletproofing kits designed to maximize your diesel's potential.",
                icon: "📦",
                image: "/images/trucks/IMG_0740.JPG.jpeg"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-purple-500/20 group"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-4xl">{service.icon}</div>
                </div>
                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-purple-300 mb-3">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parts Showcase Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Parts & Builds</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Check out our latest custom parts, performance upgrades, and complete build packages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {[
              {
                image: "/images/parts-engines/IMG_3027 (1).jpg",
                title: "Performance Engine Package",
                description: "Complete Duramax performance upgrade kit with custom parts"
              },
              {
                image: "/images/trucks/IMG_0749.JPG.jpeg",
                title: "Custom Performance Build",
                description: "Full performance package installation with Specialty Built parts"
              },
              {
                image: "/images/parts-engines/IMG_0740.JPG.jpeg",
                title: "Custom Fabricated Parts",
                description: "Bespoke diesel performance components designed and fabricated in-house"
              }
            ].map((work, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-bold text-white mb-2">{work.title}</h3>
                    <p className="text-gray-300">{work.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/10 to-teal-900/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Products</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Shop our premium Specialty Built merchandise and diesel performance gear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-teal-500/20"
                onClick={() => openProductModal(product)}
              >
                <div className="aspect-square bg-slate-100 relative">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]?.src || product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-purple-300 mb-2">{product.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{product.body_html?.replace(/<[^>]*>/g, '') || product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-teal-400">
                      ${product.variants?.[0]?.price || '29.99'}
                    </span>
                    <button className="flex items-center text-purple-400 hover:text-purple-300 font-medium">
                      View Details
                      <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-teal-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Upgrade Your Diesel?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Shop premium diesel performance parts or get custom fabrication solutions from Specialty Built Performance & Fab.
            </p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-xl"
              >
                Shop Parts Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={modalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}