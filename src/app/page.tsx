'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
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
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-32">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Specialty Built
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-300">
              Performance & Fab - Expert Diesel Repair & Custom Fabrication
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-xl"
            >
              Get A Quote Today
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Services</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Expert diesel repair specializing in Duramax, Cummins, and Powerstroke engines with custom fabrication services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Diesel Engine Repair",
                description: "Specialized repair services for Duramax, Cummins, and Powerstroke engines with 4+ years experience.",
                icon: "🔧"
              },
              {
                title: "Custom Fabrication",
                description: "Professional custom fabrication services with FABMD partnership for precision metalwork.",
                icon: "⚙️"
              },
              {
                title: "Performance Upgrades",
                description: "Diesel performance modifications and bulletproofing to maximize your truck's potential.",
                icon: "🚛"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Featured Products</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
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
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
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
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{product.title}</h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">{product.body_html?.replace(/<[^>]*>/g, '') || product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      ${product.variants?.[0]?.price || '29.99'}
                    </span>
                    <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Need Diesel Repair or Custom Fab?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get expert diesel repair and custom fabrication services from Specialty Built Performance & Fab.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 hover:bg-slate-100 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-xl"
            >
              Contact Us Today
            </motion.button>
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