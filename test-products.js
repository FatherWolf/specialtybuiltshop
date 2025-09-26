// Test the products API endpoint
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

const SHOPIFY_STORE_DOMAIN = envVars.SHOPIFY_STORE_DOMAIN
const SHOPIFY_ACCESS_TOKEN = envVars.SHOPIFY_ACCESS_TOKEN

console.log('Testing Products API (Admin API)...')
console.log('Domain:', SHOPIFY_STORE_DOMAIN)
console.log('Admin Token:', SHOPIFY_ACCESS_TOKEN ? 'Set' : 'Missing')

async function testProductsAPI() {
  if (!SHOPIFY_ACCESS_TOKEN) {
    console.log('\n❌ MISSING: Admin API access token')
    return
  }

  try {
    console.log('\n🔄 Testing Admin API connection...')

    const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/products.json`, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    })

    console.log('Response Status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log('❌ API Error Response:', errorText)
      return
    }

    const data = await response.json()

    if (data.products) {
      const productCount = data.products.length
      console.log(`✅ Successfully connected! Found ${productCount} products`)

      if (productCount > 0) {
        console.log('\n📦 Sample products:')
        data.products.slice(0, 3).forEach((product, index) => {
          const price = product.variants[0]?.price || 'N/A'
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

testProductsAPI()