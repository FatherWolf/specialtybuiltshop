import { NextResponse } from 'next/server';

// Refetch this product from Shopify at most once per 60 seconds.
export const revalidate = 60;

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Fetch a single product by handle (slug) OR Shopify global ID.
// Storefront API uses `handle` for lookup; if the caller passes a numeric/legacy
// REST id we fall back to querying by global id.
const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      productType
      tags
      images(first: 20) {
        edges {
          node { id url altText }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            price { amount currencyCode }
            availableForSale
          }
        }
      }
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
    }
  }
`;

const PRODUCT_BY_ID_QUERY = `
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      title
      handle
      descriptionHtml
      productType
      tags
      images(first: 20) {
        edges {
          node { id url altText }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            price { amount currencyCode }
            availableForSale
          }
        }
      }
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
    }
  }
`;

function normalizeProduct(node) {
  if (!node) return null;
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    body_html: node.descriptionHtml || '',
    description: (node.descriptionHtml || '').replace(/<[^>]*>/g, ''),
    product_type: node.productType || '',
    tags: node.tags || [],
    images: node.images.edges.map((edge) => ({
      id: edge.node.id,
      src: edge.node.url,
      alt: edge.node.altText || node.title,
    })),
    variants: node.variants.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      price: edge.node.price.amount,
      currency: edge.node.price.currencyCode,
      available: edge.node.availableForSale,
    })),
    priceRange: node.priceRange,
  };
}

async function storefrontFetch(query, variables) {
  const response = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }
  return data.data;
}

export async function GET(request, { params }) {
  try {
    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Missing Shopify configuration' },
        { status: 500 }
      );
    }

    const { id } = params;

    // If the param looks like a Shopify global ID, query by ID; otherwise treat as handle/slug.
    const isGlobalId = typeof id === 'string' && id.startsWith('gid://shopify/Product/');
    const { product } = isGlobalId
      ? await storefrontFetch(PRODUCT_BY_ID_QUERY, { id })
      : await storefrontFetch(PRODUCT_BY_HANDLE_QUERY, { handle: id });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(normalizeProduct(product));
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
