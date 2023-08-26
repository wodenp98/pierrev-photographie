import CustomerDetails from "@/components/CustomerDetails/CustomerDetails";
import { stripe } from "@/lib/stripe/stripe";

export default async function Page({ searchParams }: { searchParams: any }) {
  const sessionId = searchParams?.session_id ?? "";
  const checkoutSession = await stripe?.checkout.sessions.retrieve(sessionId);
  const customerDetails = checkoutSession?.customer_details;

  return (
    <div>
      <p>Success</p>
      <CustomerDetails customerDetails={customerDetails} />
    </div>
  );
}
