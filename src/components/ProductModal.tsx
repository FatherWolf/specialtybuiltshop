'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Plus, Minus, Check } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/format'

interface ProductModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
}

/**
 * Treat a variant as available unless Shopify explicitly says it's not.
 * Different code paths normalize the field differently:
 *   - Storefront API (our default) → variant.available (boolean)
 *   - Mock fallback data            → variant.available (boolean)
 *   - Older shopify-buy SDK shape   → variant.availableForSale (boolean)
 * Anything missing/undefined defaults to available so we don't accidentally
 * mark legitimately-stocked items as sold out.
 */
function isVariantAvailable(variant: any): boolean {
  if (!variant) return false
  if (variant.available === false) return false
  if (variant.availableForSale === false) return false
  return true
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [productDetails, setProductDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    if (isOpen && product) {
      fetchProductDetails()
    }
  }, [isOpen, product])

  const fetchProductDetails = async () => {
    if (!product?.id) return

    setLoading(true)
    // Use static product data for clean display
    setProductDetails(product)
    if (product.variants && product.variants.length > 0) {
      // Pre-select the first IN-STOCK variant. Falling back to the first
      // variant overall keeps the price/details visible even when every
      // option is sold out (the Add to Cart button still gets disabled).
      const isAvailable = (v: any) => v?.available !== false && v?.availableForSale !== false
      const firstInStock = product.variants.find(isAvailable)
      setSelectedVariant(firstInStock ?? product.variants[0])
    }
    setLoading(false)
  }

  if (!isOpen || !product) return null

  const displayProduct = productDetails || product
  const images = displayProduct.images || []
  const variants = displayProduct.variants || []

  // Group variants by color/option
  const variantOptions = variants.reduce((acc: any, variant: any) => {
    if (variant.option1) {
      if (!acc.option1) acc.option1 = []
      if (!acc.option1.includes(variant.option1)) {
        acc.option1.push(variant.option1)
      }
    }
    if (variant.option2) {
      if (!acc.option2) acc.option2 = []
      if (!acc.option2.includes(variant.option2)) {
        acc.option2.push(variant.option2)
      }
    }
    return acc
  }, {})

  const handleVariantChange = (optionName: string, optionValue: string) => {
    const newVariant = variants.find((variant: any) => 
      (optionName === 'option1' && variant.option1 === optionValue) ||
      (optionName === 'option2' && variant.option2 === optionValue)
    )
    if (newVariant) {
      setSelectedVariant(newVariant)
    }
  }

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    if (!isVariantAvailable(selectedVariant)) return;

    try {
      addItem({
        id: `${displayProduct.id}-${selectedVariant.id}`,
        variantId: selectedVariant.id,
        title: displayProduct.title,
        price: selectedVariant.price?.amount || selectedVariant.price || '29.99',
        quantity: quantity,
        image: displayProduct.images?.[0]?.src || displayProduct.images?.[0]
      });

      // Confirmation feedback is handled by <CartToast /> (mounted in the
      // root layout), which auto-renders when CartContext.notification is
      // set by addItem above.
      onClose();
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Sorry, there was an error adding the item to your cart. Please try again.');
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-4 text-gray-300">Loading product details...</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-600">
                  <h2 className="text-2xl font-bold text-white">{displayProduct.title}</h2>
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 p-6">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                    <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
                      {images.length > 0 ? (
                        <img
                          src={typeof images[selectedImage] === 'string' ? images[selectedImage] : images[selectedImage]?.src}
                          alt={displayProduct.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <ShoppingCart className="w-24 h-24 text-slate-400" />
                        </div>
                      )}
                    </div>

                    {images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {images.map((image: any, index: number) => {
                          const imgSrc = typeof image === 'string' ? image : image?.src
                          return (
                            <button
                              key={index}
                              onClick={() => setSelectedImage(index)}
                              className={`aspect-square bg-slate-100 rounded-lg overflow-hidden border-2 transition-colors ${
                                selectedImage === index ? 'border-blue-500' : 'border-transparent hover:border-slate-300'
                              }`}
                            >
                              <img
                                src={imgSrc}
                                alt={`${displayProduct.title} ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    <div>
                      <div className="text-3xl font-bold text-teal-400 mb-2">
                        ${formatPrice(selectedVariant?.price ?? displayProduct.price ?? '29.99')}
                      </div>
                      <div className="text-sm">
                        {isVariantAvailable(selectedVariant) ? (
                          <span className="text-green-400 flex items-center">
                            <Check className="w-4 h-4 mr-1" />
                            In Stock
                          </span>
                        ) : (
                          <span className="text-red-400 flex items-center font-medium">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Product Description */}
                    <div className="prose max-w-none">
                      <p className="text-gray-300 leading-relaxed">
                        {displayProduct.description}
                      </p>
                      {displayProduct.features && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-white mb-2">Features:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-300">
                            {displayProduct.features.map((feature: string, index: number) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Variant Options */}
                    {variants.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-white">Options:</h4>
                        <div className="flex flex-wrap gap-3">
                          {variants.map((variant: any) => {
                            const available = isVariantAvailable(variant)
                            const selected = selectedVariant?.id === variant.id
                            return (
                              <button
                                key={variant.id}
                                onClick={() => available && setSelectedVariant(variant)}
                                disabled={!available}
                                aria-disabled={!available}
                                title={available ? variant.title : `${variant.title} — out of stock`}
                                className={`flex items-center space-x-2 px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                                  !available
                                    ? 'border-gray-700 bg-gray-900/40 text-gray-500 line-through cursor-not-allowed'
                                    : selected
                                      ? 'border-purple-500 bg-purple-900/50 text-white'
                                      : 'border-gray-600 hover:border-purple-400 text-gray-300 hover:text-white'
                                }`}
                              >
                                {variant.color && (
                                  <div
                                    className={`w-4 h-4 rounded-full border border-slate-300 ${!available ? 'opacity-40' : ''}`}
                                    style={{ backgroundColor: variant.color }}
                                  />
                                )}
                                <span>{variant.title}</span>
                                {!available && (
                                  <span className="text-[10px] uppercase tracking-wide text-red-400 ml-1 no-underline font-semibold">
                                    Sold out
                                  </span>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}


                    {/* Quantity Selector */}
                    <div>
                      <h4 className="font-semibold mb-3 text-white">Quantity:</h4>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2 border border-gray-600 rounded-lg hover:border-purple-400 transition-colors text-gray-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold text-white">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2 border border-gray-600 rounded-lg hover:border-purple-400 transition-colors text-gray-300"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    {(() => {
                      const canAdd = selectedVariant && isVariantAvailable(selectedVariant)
                      return (
                        <motion.button
                          onClick={handleAddToCart}
                          whileHover={canAdd ? { scale: 1.02 } : {}}
                          whileTap={canAdd ? { scale: 0.98 } : {}}
                          disabled={!canAdd}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>{canAdd ? 'Add to Cart' : 'Out of Stock'}</span>
                        </motion.button>
                      )
                    })()}
                    
                    <div className="text-center text-sm text-gray-400">
                      Secure checkout powered by Shopify
                    </div>

                    {/* Product Details */}
                    <div className="space-y-2 text-sm text-gray-400">
                      <div><strong>Product Type:</strong> {displayProduct.product_type || 'General'}</div>
                      <div><strong>Vendor:</strong> {displayProduct.vendor || 'Specialty Built'}</div>
                      {selectedVariant && selectedVariant.sku && (
                        <div><strong>SKU:</strong> {selectedVariant.sku}</div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}