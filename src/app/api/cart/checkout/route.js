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

    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      );
    }

    // Create cart with multiple items using Storefront API GraphQL
    const cartCreateMutation = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
            lines(first: 250) {
              edges {
                node {
                  id
                  quantity
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    // Convert items to proper format with global IDs
    const cartLines = items.map(item => {
      const globalVariantId = item.variantId.toString().includes('gid:')
        ? item.variantId
        : `gid://shopify/ProductVariant/${item.variantId}`;

      return {
        merchandiseId: globalVariantId,
        quantity: item.quantity
      };
    });

    const variables = {
      input: {
        lines: cartLines,
        buyerIdentity: {
          countryCode: 'US' // Default to US, Shopify will calculate appropriate taxes
        }
      }
    };

    const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: cartCreateMutation,
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

    const { cart, userErrors } = data.data.cartCreate;

    if (userErrors.length > 0) {
      throw new Error(`Cart errors: ${JSON.stringify(userErrors)}`);
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: cart.checkoutUrl,
      cart: {
        id: cart.id,
        checkoutUrl: cart.checkoutUrl,
        subtotal: cart.cost.subtotalAmount,
        total: cart.cost.totalAmount,
        tax: cart.cost.totalTaxAmount,
        items: cart.lines.edges.map(edge => ({
          id: edge.node.id,
          quantity: edge.node.quantity,
          total: edge.node.cost.totalAmount,
          title: edge.node.merchandise.product.title,
          variant: edge.node.merchandise.title
        }))
      }
    });

  } catch (error) {
    console.error('Error creating checkout:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout', details: error.message },
      { status: 500 }
    );
  }
}