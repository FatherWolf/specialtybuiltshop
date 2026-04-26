'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
  id: string
  variantId: string
  title: string
  price: string
  quantity: number
  image?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Bump this whenever the Shopify backing store changes (or any time we want
// to invalidate every existing cart in the wild). Stored alongside the cart
// itself in localStorage; on load we compare and silently clear if stale.
//
// Version 2 (2026-04): Switched from old specialty-built.myshopify.com store
// to new specialtybuilt.myshopify.com via the Headless channel. All variant
// IDs from the old store are dead.
const CART_SCHEMA_VERSION = 2
const CART_STORAGE_KEY = 'cart'
const CART_VERSION_KEY = 'cart-schema-version'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount, but only if the schema version
  // matches. Otherwise discard — variant IDs from a previous store will
  // 404 at checkout.
  useEffect(() => {
    try {
      const storedVersion = parseInt(
        localStorage.getItem(CART_VERSION_KEY) ?? '0',
        10
      )
      if (storedVersion !== CART_SCHEMA_VERSION) {
        // Stale cart from a previous store/schema. Wipe and write the new
        // version so we don't keep re-clearing.
        localStorage.removeItem(CART_STORAGE_KEY)
        localStorage.setItem(CART_VERSION_KEY, String(CART_SCHEMA_VERSION))
        return
      }
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch {
      // Corrupted JSON or localStorage unavailable — just start fresh.
      localStorage.removeItem(CART_STORAGE_KEY)
      localStorage.setItem(CART_VERSION_KEY, String(CART_SCHEMA_VERSION))
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    localStorage.setItem(CART_VERSION_KEY, String(CART_SCHEMA_VERSION))
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.variantId === newItem.variantId)
      if (existingItem) {
        return prevItems.map(item =>
          item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }
      return [...prevItems, newItem]
    })
  }

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
      totalPrice
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