import { NextResponse } from 'next/server';

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function POST(request) {
  try {
    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Missing Shopify configuration' },
        { status: 500 }
      );
    }

    const { variantId, quantity = 1 } = await request.json();

    if (!variantId) {
      return NextResponse.json(
        { error: 'Variant ID is required' },
        { status: 400 }
      );
    }

    // Create checkout using Storefront API GraphQL
    const checkoutCreateMutation = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
            totalPrice {
              amount
              currencyCode
            }
          }
          checkoutUserErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        lineItems: [
          {
            variantId: variantId,
            quantity: quantity
          }
        ]
      }
    };

    const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: checkoutCreateMutation,
        variables: variables
      })
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    const { checkout, checkoutUserErrors } = data.data.checkoutCreate;

    if (checkoutUserErrors.length > 0) {
      throw new Error(`Checkout errors: ${JSON.stringify(checkoutUserErrors)}`);
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: checkout.webUrl,
      checkout: checkout
    });

  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart', details: error.message },
      { status: 500 }
    );
  }
}