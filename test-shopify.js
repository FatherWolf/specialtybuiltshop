// Test script to verify Shopify configuration
const fs = require('fs')

// Read .env.local manually
let envVars = {}
try {
  const envFile = fs.readFileSync('.env.local', 'utf8')
  envFile.split('\n').forEach(line => {
    if (line.includes('=') && !line.startsWith('#')) {
      const [key, value] = line.split('=')
      envVars[key.trim()] = value.trim()
    }
  })
} catch (error) {
  console.log('Could not read .env.local file')
}

const SHOPIFY_STORE_DOMAIN = envVars.NEXT_PUBLIC_SHOPIFY_DOMAIN
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = envVars.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

console.log('Testing Shopify configuration...')
console.log('Domain:', SHOPIFY_STORE_DOMAIN)
console.log('Token:', SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'Set' : 'Missing')

async function testStorefrontAPI() {
  if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN || SHOPIFY_STOREFRONT_ACCESS_TOKEN === 'your-storefront-token-here') {
    console.log('\n❌ MISSING: You need to set NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN')
    console.log('\nTo get your Storefront Access Token:')
    console.log('1. Go to your Shopify admin → Apps → Manage private apps')
    console.log('2. Create a private app or edit existing one')
    console.log('3. Enable "Storefront API access"')
    console.log('4. Set permissions: Read products, Read product listings, Read customers, Read checkouts')
    console.log('5. Copy the Storefront access token to your .env.local file')
    return
  }

  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  id
                  src: url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    console.log('\n🔄 Testing Storefront API connection...')

    const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { first: 5 }
      })
    })

    const data = await response.json()

    if (data.errors) {
      console.log('❌ GraphQL Errors:', data.errors)
      return
    }

    if (data.data && data.data.products) {
      const productCount = data.data.products.edges.length
      console.log(`✅ Successfully connected! Found ${productCount} products`)

      if (productCount > 0) {
        console.log('\n📦 Sample products:')
        data.data.products.edges.forEach((edge, index) => {
          const product = edge.node
          const price = product.variants.edges[0]?.node?.priceV2?.amount || 'N/A'
          console.log(`${index + 1}. ${product.title} - $${price}`)
        })
      } else {
        console.log('⚠️  No products found. Add some products to your Shopify store.')
      }
    } else {
      console.log('❌ Unexpected response structure:', data)
    }

  } catch (error) {
    console.log('❌ Connection failed:', error.message)
  }
}

testStorefrontAPI()