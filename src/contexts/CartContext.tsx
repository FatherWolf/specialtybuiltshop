'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
  id: string
  variantId: string
  title: string
  price: string
  quantity: number
  image?: string
  /** Free-text customization the buyer typed on the product page (powder
   *  coat color, engraving text, etc.). Travels to Shopify as a line-item
   *  attribute so it lands on the order in Shopify Admin. Undefined or ''
   *  means no customization was requested. */
  customText?: string
}

/** Lightweight notification surfaced by <CartToast />. Set by addItem. */
export interface CartNotification {
  id: number
  title: string
  quantity: number
  image?: string
  price: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  /** Most recent "added to cart" notification, or null. CartToast watches this. */
  notification: CartNotification | null
  /** Imperatively dismiss the current notification (e.g. from CartToast on click). */
  dismissNotification: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

/**
 * Normalize customization text for comparison. Undefined, empty, and
 * whitespace-only all collapse to '' so they're treated as "no
 * customization" and merge into the same cart line.
 */
function normalizeCustomText(text?: string): string {
  return (text ?? '').trim()
}

/**
 * Two cart entries merge only when they're the same variant AND carry the
 * same customization. A buyer ordering one bracket in gloss black and
 * another in candy red must get two separate lines — otherwise the
 * fabricator can't tell which is which on the Shopify order.
 */
function isSameLine(a: CartItem, b: CartItem): boolean {
  return (
    a.variantId === b.variantId &&
    normalizeCustomText(a.customText) === normalizeCustomText(b.customText)
  )
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [notification, setNotification] = useState<CartNotification | null>(null)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => isSameLine(item, newItem))
      if (existingItem) {
        return prevItems.map(item =>
          isSameLine(item, newItem)
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }
      return [...prevItems, newItem]
    })

    // Surface a toast. The id is just a monotonically-changing key so
    // CartToast can re-trigger its enter animation if the same product
    // is added twice in a row.
    setNotification({
      id: Date.now(),
      title: newItem.title,
      quantity: newItem.quantity,
      image: newItem.image,
      price: newItem.price,
    })
  }

  const dismissNotification = () => setNotification(null)

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      notification,
      dismissNotification,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}