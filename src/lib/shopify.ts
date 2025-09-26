import Client from 'shopify-buy'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ShopifyProduct = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ShopifyImage = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ShopifyVariant = any

const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'specialty-built.myshopify.com',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: '2024-01'
})

export default client

export type Product = {
  id: string
  title: string
  description: string
  handle: string
  images: Array<{
    id: string
    src: string
    altText?: string
  }>
  variants: Array<{
    id: string
    title: string
    price: {
      amount: string
      currencyCode: string
    }
    availableForSale: boolean
  }>
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await client.product.fetchAll()
    return products.map((product: ShopifyProduct) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      handle: product.handle,
      images: product.images.map((image: ShopifyImage) => ({
        id: image.id,
        src: image.src,
        altText: image.altText
      })),
      variants: product.variants.map((variant: ShopifyVariant) => ({
        id: variant.id,
        title: variant.title,
        price: {
          amount: variant.price.amount,
          currencyCode: variant.price.currencyCode
        },
        availableForSale: variant.available
      })),
      priceRange: {
        minVariantPrice: {
          amount: product.variants[0]?.price?.amount || '0',
          currencyCode: product.variants[0]?.price?.currencyCode || 'USD'
        },
        maxVariantPrice: {
          amount: product.variants[product.variants.length - 1]?.price?.amount || '0',
          currencyCode: product.variants[product.variants.length - 1]?.price?.currencyCode || 'USD'
        }
      }
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  try {
    const products = await client.product.fetchByHandle(handle)
    if (!products) return null

    const product = products as ShopifyProduct
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      handle: product.handle,
      images: product.images.map((image: ShopifyImage) => ({
        id: image.id,
        src: image.src,
        altText: image.altText
      })),
      variants: product.variants.map((variant: ShopifyVariant) => ({
        id: variant.id,
        title: variant.title,
        price: {
          amount: variant.price.amount,
          currencyCode: variant.price.currencyCode
        },
        availableForSale: variant.available
      })),
      priceRange: {
        minVariantPrice: {
          amount: product.variants[0]?.price?.amount || '0',
          currencyCode: product.variants[0]?.price?.currencyCode || 'USD'
        },
        maxVariantPrice: {
          amount: product.variants[product.variants.length - 1]?.price?.amount || '0',
          currencyCode: product.variants[product.variants.length - 1]?.price?.currencyCode || 'USD'
        }
      }
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function createCheckout(variantId: string, quantity: number = 1) {
  try {
    const checkout = await client.checkout.create()
    const checkoutWithLineItem = await client.checkout.addLineItems(checkout.id, [
      {
        variantId: variantId,
        quantity: quantity
      }
    ])
    return checkoutWithLineItem
  } catch (error) {
    console.error('Error creating checkout:', error)
    return null
  }
}