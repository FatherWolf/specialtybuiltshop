const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ACCESS_TOKEN) {
  throw new Error('Missing required Shopify environment variables');
}

const shopifyFetch = async (query, variables = {}) => {
  const url = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/${query}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const getAllProducts = async () => {
  try {
    const data = await shopifyFetch('products.json');
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProduct = async (id) => {
  try {
    const data = await shopifyFetch(`products/${id}.json`);
    return data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};