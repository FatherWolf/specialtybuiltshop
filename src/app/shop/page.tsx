'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingCart, Filter } from 'lucide-react'
import Header from '../../components/Header'
import ProductModal from '../../components/ProductModal'
import { formatPrice } from '../../lib/format'

// Map of permitted ?category= values (and a few aliases) to the internal filter key
const CATEGORY_ALIASES: Record<string, string> = {
  parts: 'parts',
  apparel: 'merchandise',
  merchandise: 'merchandise',
  merch: 'merchandise',
  'best-sellers': 'best-sellers',
  bestsellers: 'best-sellers',
  featured: 'best-sellers',
}

// Next.js 15 requires components that read URL search params via
// useSearchParams() to be wrapped in a <Suspense> boundary so the rest of
// the page can be prerendered. The actual shop UI lives in ShopContent —
// this default export just provides the suspense fallback.
export default function Shop() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <Header />
          <section className="py-24 bg-accent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="h-12 w-64 bg-muted/40 rounded mx-auto mb-4 animate-pulse" />
              <div className="h-6 w-96 bg-muted/40 rounded mx-auto animate-pulse" />
            </div>
          </section>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  )
}

function ShopContent() {
  const searchParams = useSearchParams()
  const initialFilter = (() => {
    const c = searchParams.get('category')?.toLowerCase()
    return (c && CATEGORY_ALIASES[c]) || 'parts'
  })()

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState(initialFilter)
  const [mounted, setMounted] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Keep filter in sync if the user navigates with a different ?category=
  useEffect(() => {
    const c = searchParams.get('category')?.toLowerCase()
    const mapped = (c && CATEGORY_ALIASES[c]) || 'parts'
    setFilter(mapped)
  }, [searchParams])

  useEffect(() => {
    if (!mounted) return

    async function fetchProducts() {
      try {
        // Try to fetch from Shopify first
        const response = await fetch('/api/products')
        if (response.ok) {
          const shopifyProducts = await response.json()
          if (shopifyProducts && shopifyProducts.length > 0) {
            setProducts(shopifyProducts)
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [mounted])

  // Mock products for demo purposes when Shopify isn't connected
  const mockProducts = [
    {
      id: '1',
      title: 'Performance Cold Air Intake',
      description: 'High-flow cold air intake system for increased horsepower and torque',
      handle: 'performance-cold-air-intake',
      images: [{ id: '1', src: '/api/placeholder/400/400', altText: 'Cold Air Intake' }],
      variants: [{ 
        id: '1', 
        title: 'Default', 
        price: { amount: '299.99', currencyCode: 'USD' }, 
        availableForSale: true 
      }],
      priceRange: {
        minVariantPrice: { amount: '299.99', currencyCode: 'USD' },
        maxVariantPrice: { amount: '299.99', currencyCode: 'USD' }
      }
    },
    {
      id: '2',
      title: 'Heavy Duty Turbo Upgrade Kit',
      description: 'Complete turbo upgrade kit for maximum performance gains',
      handle: 'heavy-duty-turbo-upgrade',
      images: [{ id: '2', src: '/api/placeholder/400/400', altText: 'Turbo Kit' }],
      variants: [{ 
        id: '2', 
        title: 'Default', 
        price: { amount: '1299.99', currencyCode: 'USD' }, 
        availableForSale: true 
      }],
      priceRange: {
        minVariantPrice: { amount: '1299.99', currencyCode: 'USD' },
        maxVariantPrice: { amount: '1299.99', currencyCode: 'USD' }
      }
    },
    {
      id: '3',
      title: 'Custom Exhaust System',
      description: 'Stainless steel custom exhaust for improved flow and sound',
      handle: 'custom-exhaust-system',
      images: [{ id: '3', src: '/api/placeholder/400/400', altText: 'Exhaust System' }],
      variants: [{ 
        id: '3', 
        title: 'Default', 
        price: { amount: '799.99', currencyCode: 'USD' }, 
        availableForSale: true 
      }],
      priceRange: {
        minVariantPrice: { amount: '799.99', currencyCode: 'USD' },
        maxVariantPrice: { amount: '799.99', currencyCode: 'USD' }
      }
    },
    {
      id: '4',
      title: 'Specialty Built T-Shirt',
      description: 'Premium cotton t-shirt with Specialty Built logo',
      handle: 'specialty-built-tshirt',
      images: [{ id: '4', src: '/api/placeholder/400/400', altText: 'T-Shirt' }],
      variants: [{ 
        id: '4', 
        title: 'Medium', 
        price: { amount: '24.99', currencyCode: 'USD' }, 
        availableForSale: true 
      }],
      priceRange: {
        minVariantPrice: { amount: '24.99', currencyCode: 'USD' },
        maxVariantPrice: { amount: '24.99', currencyCode: 'USD' }
      }
    },
    {
      id: '5',
      title: 'Logo Hoodie',
      description: 'Comfortable hoodie with embroidered Specialty Built logo',
      handle: 'specialty-built-hoodie',
      images: [{ id: '5', src: '/api/placeholder/400/400', altText: 'Hoodie' }],
      variants: [{ 
        id: '5', 
        title: 'Large', 
        price: { amount: '49.99', currencyCode: 'USD' }, 
        availableForSale: true 
      }],
      priceRange: {
        minVariantPrice: { amount: '49.99', currencyCode: 'USD' },
        maxVariantPrice: { amount: '49.99', currencyCode: 'USD' }
      }
    },
    {
      id: '6',
      title: 'Diesel Performance Cap',
      description: 'Adjustable cap with Specialty Built performance logo',
      handle: 'diesel-performance-cap',
      images: [{ id: '6', src: '/api/placeholder/400/400', altText: 'Cap' }],
      variants: [{ 
        id: '6', 
        title: 'One Size', 
        price: { amount: '19.99', currencyCode: 'USD' }, 
        availableForSale: true 
      }],
      priceRange: {
        minVariantPrice: { amount: '19.99', currencyCode: 'USD' },
        maxVariantPrice: { amount: '19.99', currencyCode: 'USD' }
      }
    }
  ]

  // Convert Shopify products to display format
  const shopifyProductsFormatted = products.map((product: any) => ({
    id: product.id,
    title: product.title,
    description: product.body_html ?
      product.body_html.replace(/<[^>]*>/g, '').substring(0, 200) + '...' :
      'Premium product from Specialty Built',
    handle: product.handle,
    tags: (product.tags || []).map((t: string) => t.toLowerCase()),
    productType: (product.product_type || '').toLowerCase(),
    images: product.images || [],
    variants: product.variants || [],
    priceRange: {
      minVariantPrice: {
        amount: product.variants?.[0]?.price || '0.00',
        currencyCode: 'USD'
      },
      maxVariantPrice: {
        amount: product.variants?.[0]?.price || '0.00',
        currencyCode: 'USD'
      }
    }
  }))

  const displayProducts = shopifyProductsFormatted.length > 0 ? shopifyProductsFormatted : mockProducts

  const categories = ['parts', 'merchandise', 'best-sellers']

  // Filter by Shopify tag or product type. Set tags in Shopify admin:
  //   parts         → performance parts, engine components, anything mechanical
  //   apparel       → hats, shirts, hoodies, merch
  //   best-seller   → featured / top selling products
  const matchesCategory = (product: any, category: string) => {
    const tags: string[] = product.tags || []
    const type: string = product.productType || ''

    if (category === 'parts') {
      return tags.includes('parts') ||
             tags.includes('performance') ||
             type.includes('part') ||
             type.includes('performance') ||
             type.includes('engine')
    }
    if (category === 'merchandise') {
      return tags.includes('apparel') ||
             tags.includes('merch') ||
             tags.includes('merchandise') ||
             type.includes('apparel') ||
             type.includes('merch')
    }
    if (category === 'best-sellers') {
      return tags.includes('best-seller') ||
             tags.includes('bestseller') ||
             tags.includes('featured')
    }
    return true
  }

  const filteredProducts = displayProducts.filter(product => matchesCategory(product, filter))

  const openProductModal = (product: any) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const closeProductModal = () => {
    setModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Shop Header */}
      <section className="py-24 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {filter === 'merchandise'
                ? <>Specialty Built <span className="text-primary">Apparel</span></>
                : filter === 'best-sellers'
                  ? <>Best <span className="text-primary">Sellers</span></>
                  : <>Performance <span className="text-primary">Parts</span></>}
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              {filter === 'merchandise'
                ? 'Premium hats, tees, hoodies, and gear — rep the brand that builds the horsepower.'
                : filter === 'best-sellers'
                  ? 'Our top-selling parts and apparel — the gear customers keep coming back for.'
                  : 'Performance parts and upgrade kits for Duramax, Cummins, and Powerstroke platforms.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-muted" />
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === category
                        ? 'bg-primary text-white'
                        : 'bg-accent text-foreground hover:bg-muted'
                    }`}
                  >
                    {category === 'best-sellers'
                      ? 'Best Sellers'
                      : category === 'merchandise'
                        ? 'Apparel'
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!mounted || loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-accent rounded-lg p-6 animate-pulse">
                  <div className="w-full h-48 bg-muted rounded-lg mb-4"></div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => {
                // A product is fully sold out when every variant is unavailable.
                // We still render the card (with a "Sold Out" overlay) so the
                // customer can see what's coming back, instead of silently
                // hiding it.
                const variants = product.variants || []
                const allSoldOut =
                  variants.length > 0 &&
                  variants.every(
                    (v: any) => v?.available === false || v?.availableForSale === false
                  )
                return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-accent rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
                    allSoldOut ? 'opacity-90' : ''
                  }`}
                  onClick={() => openProductModal(product)}
                >
                  <div className="aspect-square bg-muted relative">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].src}
                        alt={product.images[0].alt || product.title}
                        className={`w-full h-full object-cover ${allSoldOut ? 'grayscale' : ''}`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <ShoppingCart className="w-16 h-16 text-muted" />
                      </div>
                    )}
                    {allSoldOut && (
                      <div className="absolute top-3 left-3 bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                        Sold Out
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        ${formatPrice(product.priceRange.minVariantPrice.amount)}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          openProductModal(product)
                        }}
                        className="bg-secondary hover:bg-secondary/90 text-background px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center space-x-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>View Details</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon Notice */}
      {products.length === 0 && (
        <section className="py-16 bg-accent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Full E-commerce <span className="text-primary">Coming Soon</span>
              </h2>
              <p className="text-lg text-foreground/70 mb-6">
                Our complete online store is in development. Contact us directly for current pricing and availability.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Contact for Pricing
              </motion.a>
            </motion.div>
          </div>
        </section>
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={closeProductModal}
      />
    </div>
  )
}