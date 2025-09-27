'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Plus, Minus, Check } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

interface ProductModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
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
      setSelectedVariant(product.variants[0])
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

    try {
      addItem({
        id: `${displayProduct.id}-${selectedVariant.id}`,
        variantId: selectedVariant.id,
        title: displayProduct.title,
        price: selectedVariant.price?.amount || selectedVariant.price || '29.99',
        quantity: quantity,
        image: displayProduct.images?.[0]?.src || displayProduct.images?.[0]
      });

      alert(`Added ${quantity}x ${displayProduct.title} to cart!`);
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
            className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-4 text-foreground/70">Loading product details...</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-muted">
                  <h2 className="text-2xl font-bold text-foreground">{displayProduct.title}</h2>
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-accent rounded-lg transition-colors"
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
                          src={images[selectedImage]}
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
                        {images.map((image: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`aspect-square bg-slate-100 rounded-lg overflow-hidden border-2 transition-colors ${
                              selectedImage === index ? 'border-blue-500' : 'border-transparent hover:border-slate-300'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${displayProduct.title} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    <div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        ${selectedVariant?.price || displayProduct.price || '29.99'}
                      </div>
                      <div className="text-sm text-slate-600">
                        <span className="text-green-600 flex items-center">
                          <Check className="w-4 h-4 mr-1" />
                          Available on Shopify
                        </span>
                      </div>
                    </div>

                    {/* Product Description */}
                    <div className="prose max-w-none">
                      <p className="text-slate-700 leading-relaxed">
                        {displayProduct.description}
                      </p>
                      {displayProduct.features && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-slate-800 mb-2">Features:</h4>
                          <ul className="list-disc list-inside space-y-1 text-slate-600">
                            {displayProduct.features.map((feature: string, index: number) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Color Options */}
                    {variants.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-slate-800">Color Options:</h4>
                        <div className="flex flex-wrap gap-3">
                          {variants.map((variant: any) => (
                            <button
                              key={variant.id}
                              onClick={() => setSelectedVariant(variant)}
                              className={`flex items-center space-x-2 px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                                selectedVariant?.id === variant.id
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-slate-200 hover:border-blue-300'
                              }`}
                            >
                              {variant.color && (
                                <div 
                                  className="w-4 h-4 rounded-full border border-slate-300"
                                  style={{ backgroundColor: variant.color }}
                                />
                              )}
                              <span>{variant.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}


                    {/* Quantity Selector */}
                    <div>
                      <h4 className="font-semibold mb-3">Quantity:</h4>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2 border border-muted rounded-lg hover:border-primary transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2 border border-muted rounded-lg hover:border-primary transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                      onClick={handleAddToCart}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!selectedVariant}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </motion.button>
                    
                    <div className="text-center text-sm text-slate-500">
                      Secure checkout powered by Shopify
                    </div>

                    {/* Product Details */}
                    <div className="space-y-2 text-sm text-foreground/70">
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