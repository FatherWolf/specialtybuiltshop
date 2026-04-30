'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';
import GiveawayBanner from '../components/GiveawayBanner';
import { formatPrice } from '../lib/format';

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
      <GiveawayBanner />

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-teal-800/80 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Heroimagenew.jpg"
            alt="Specialty Built Diesel Truck"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-blue-900/60 to-teal-800/60"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 min-h-screen flex items-center pt-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl w-full"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent leading-tight">
              Specialty Built
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold mb-3 sm:mb-4 text-white leading-snug">
              Premium Diesel Performance Parts & Gear
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200 max-w-2xl leading-relaxed">
              Shop Performance Parts, Upgrade Kits & Specialty Built Apparel
              <br className="hidden sm:block" />
              <span className="text-sm sm:text-base md:text-lg text-teal-300 block sm:inline mt-2 sm:mt-0">Duramax • Powerstroke • Cummins • Merch & Apparel</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/shop?category=parts" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-teal-600 hover:from-purple-600 hover:to-teal-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 shadow-xl w-full"
                >
                  Shop Parts
                </motion.button>
              </Link>
              <Link href="/shop?category=apparel" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/50 hover:border-white bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 w-full"
                >
                  Shop Apparel
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shop By Category Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-900/20 to-teal-900/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">Shop By Category</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Performance parts, upgrade kits, and Specialty Built gear — everything you need to build your rig.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Performance Parts",
                description: "Turbos, injectors, cold-air intakes, and upgrade kits for Duramax, Cummins, and Powerstroke platforms.",
                icon: "⚡",
                image: "/images/parts-engines/IMG_2948.jpg",
                cta: "Shop Parts",
                href: "/shop?category=parts"
              },
              {
                title: "Engine Components",
                description: "Head studs, gaskets, oil coolers, fuel system components, and everything you need for a bulletproof build.",
                icon: "🔧",
                image: "/images/parts-engines/IMG_1762.jpg",
                cta: "Browse Components",
                href: "/shop?category=parts"
              },
              {
                title: "Apparel & Merch",
                description: "Premium Specialty Built hats, tees, hoodies, and caps. Rep the brand that builds the horsepower.",
                icon: "🧢",
                image: "/images/newmerchphoto.png",
                cta: "Shop Apparel",
                href: "/shop?category=apparel"
              }
            ].map((category, index) => (
              <Link key={index} href={category.href} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-purple-500/20 group h-full cursor-pointer"
                >
                  {/* Category Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-4xl">{category.icon}</div>
                  </div>
                  {/* Category Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-purple-300 mb-3">{category.title}</h3>
                    <p className="text-gray-300 mb-4">{category.description}</p>
                    <span className="inline-flex items-center text-teal-400 font-semibold group-hover:text-teal-300">
                      {category.cta}
                      <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers / Built With Our Parts */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">Built With Our Parts</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              See what customers are building with Specialty Built performance parts and upgrade kits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {[
              {
                image: "/images/parts-engines/IMG_3027 (1).jpg",
                title: "Duramax Performance Kit",
                description: "Shop the complete upgrade package"
              },
              {
                image: "/images/trucks/IMG_0749.JPG.jpeg",
                title: "Powerstroke Bulletproof Bundle",
                description: "Head studs, gaskets, oil cooler & more"
              },
              {
                image: "/images/parts-engines/IMG_0740.JPG.jpeg",
                title: "Specialty-Built Components",
                description: "Intercooler piping, brackets & performance hardware"
              }
            ].map((work, index) => (
              <Link key={index} href="/shop?category=parts" className="block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl font-bold text-white mb-1">{work.title}</h3>
                      <p className="text-gray-300 text-sm mb-2">{work.description}</p>
                      <span className="inline-flex items-center text-teal-400 font-semibold text-sm">
                        Shop Now
                        <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link href="/shop?category=parts">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-teal-600 hover:from-purple-600 hover:to-teal-700 text-white font-semibold py-3 sm:py-4 px-8 sm:px-10 rounded-full text-base sm:text-lg transition-all duration-300 shadow-xl"
              >
                Shop Parts
              </motion.button>
            </Link>
            <Link href="/shop?category=apparel">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-purple-400 hover:border-teal-300 text-white font-semibold py-3 sm:py-4 px-8 sm:px-10 rounded-full text-base sm:text-lg transition-all duration-300"
              >
                Shop Apparel
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-900/10 to-teal-900/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">Featured Products</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Shop our premium Specialty Built merchandise and diesel performance gear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
                      ${formatPrice(product.variants?.[0]?.price ?? '29.99')}
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
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Ready to Upgrade Your Rig?</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Premium performance parts, upgrade kits, and Specialty Built apparel — everything ships fast and is built to last.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link href="/shop?category=parts">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 shadow-xl"
                >
                  Shop Parts
                </motion.button>
              </Link>
              <Link href="/shop?category=apparel">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-teal-600 hover:bg-gray-100 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 shadow-xl"
                >
                  Shop Apparel
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/70 hover:border-white bg-transparent hover:bg-white/10 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300"
                >
                  Questions? Contact Us
                </motion.button>
              </Link>
            </div>
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