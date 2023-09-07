import CustomerDetails from "@/components/CustomerDetails/CustomerDetails";
import { stripe } from "@/lib/stripe/stripe";
import { BsFillPatchCheckFill } from "react-icons/bs";

export default async function Page({ searchParams }: { searchParams: any }) {
  const sessionId = searchParams?.session_id ?? "";

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product", "line_items"],
  });

  const items = session?.line_items?.data.map((item: any) => {
    return {
      id: item.price.product?.metadata.id + item.price.created?.toString(),
      name: item?.description,
      price: item.amount_total / 100,
      imageUrl: item.price.product?.images[0],
      details: item.price.product?.description,
      createdAt: item.price.created,
    };
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <BsFillPatchCheckFill size={50} color="green" />
      <p>Thank you for your purchase!</p>
      <CustomerDetails customerDetails={items} />
    </div>
  );
}
