import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: "2023-08-16",
});

export async function POST(request: Request) {
  const userCart = await request.json();
  const origin = request.headers.get("origin");

  const lineItems = userCart.map((item: any) => {
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: item.nom,
          images: [item.imageUrl],
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    submit_type: "pay",
    shipping_address_collection: {
      allowed_countries: ["FR"],
    },
    success_url: `${origin}/compte`,
    cancel_url: `${origin}/compte`,
  });

  return NextResponse.json(session);
}
