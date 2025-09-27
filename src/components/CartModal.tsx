'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag, ExternalLink } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsCheckingOut(true)
    try {
      // Create Shopify checkout with all cart items
      const response = await fetch('/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity
          }))
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.checkoutUrl) {
          // Redirect to Shopify checkout with tax and shipping calculated
          window.location.href = data.checkoutUrl
        } else {
          throw new Error('No checkout URL received')
        }
      } else {
        throw new Error('Failed to create checkout')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Sorry, there was an error creating your checkout. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price
    return numPrice.toFixed(2)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Shopping Cart ({totalItems})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex flex-col h-full max-h-[calc(90vh-140px)]">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Add some products to get started!</p>
                  <button
                    onClick={onClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                      >
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{item.title}</h4>
                          <p className="text-sm text-gray-500">
                            ${formatPrice(item.price)} each
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${formatPrice(parseFloat(item.price) * item.quantity)}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-red-100 text-red-500 hover:text-red-700 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Cart Footer */}
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-medium text-gray-900">Subtotal:</span>
                      <span className="text-2xl font-bold text-gray-900">
                        ${formatPrice(totalPrice)}
                      </span>
                    </div>

                    {/* Tax & Shipping Note */}
                    <p className="text-sm text-gray-500 mb-4 text-center">
                      Tax and shipping calculated at checkout
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut || items.length === 0}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        {isCheckingOut ? (
                          <>
                            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                            <span>Creating Checkout...</span>
                          </>
                        ) : (
                          <>
                            <span>Checkout with Shopify</span>
                            <ExternalLink className="w-5 h-5" />
                          </>
                        )}
                      </button>

                      <div className="flex space-x-3">
                        <button
                          onClick={onClose}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-colors"
                        >
                          Continue Shopping
                        </button>
                        <button
                          onClick={clearCart}
                          className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-3 rounded-lg font-medium transition-colors"
                        >
                          Clear Cart
                        </button>
                      </div>
                    </div>

                    {/* Security Note */}
                    <p className="text-xs text-gray-400 text-center mt-4">
                      🔒 Secure checkout powered by Shopify
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}