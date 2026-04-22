import { NextResponse } from 'next/server';

// Refetch from Shopify at most once per 60 seconds. Product changes made in
// Shopify admin will appear on the site within a minute.
export const revalidate = 60;

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          productType
          tags
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          variants(first: 50) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

// Map a Storefront GraphQL product to the flatter shape the client components expect
// (mimics the old Admin REST response: body_html, images[].src, variants[].price as string)
function normalizeProduct(node) {
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

export async function GET() {
  try {
    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Missing Shopify configuration' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: PRODUCTS_QUERY,
          variables: { first: 50 },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    const products = data.data.products.edges.map((edge) =>
      normalizeProduct(edge.node)
    );

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
