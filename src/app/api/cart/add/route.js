import { NextResponse } from 'next/server';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

export async function POST(request) {
  try {
    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ACCESS_TOKEN) {
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

    // Create a draft order for the customer
    const draftOrderResponse = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/draft_orders.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        draft_order: {
          line_items: [
            {
              variant_id: variantId,
              quantity: quantity
            }
          ]
        }
      })
    });

    if (!draftOrderResponse.ok) {
      throw new Error(`Shopify API error: ${draftOrderResponse.status}`);
    }

    const draftOrder = await draftOrderResponse.json();
    
    // Complete the draft order to create a checkout URL
    const completeResponse = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/draft_orders/${draftOrder.draft_order.id}/complete.json`, {
      method: 'PUT',
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      }
    });

    if (!completeResponse.ok) {
      throw new Error(`Failed to complete draft order: ${completeResponse.status}`);
    }

    const completedOrder = await completeResponse.json();

    return NextResponse.json({
      success: true,
      checkoutUrl: `https://${SHOPIFY_STORE_DOMAIN}/checkout/${completedOrder.draft_order.checkout?.token || ''}`,
      order: completedOrder.draft_order
    });

  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}