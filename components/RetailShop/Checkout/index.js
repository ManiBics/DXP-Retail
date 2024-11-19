import { useBackDrop } from "@/context/BackDropContext";
import { getLocale, localeToCurrency } from "@/utils";
import getStripe from "@/utils/stripe";
import { Button } from "@mui/material";
import { useParams } from "next/navigation";

const Checkout = (props) => {
  const { showBackDrop, hideBackDrop } = useBackDrop();
  const params = useParams();
  const { locale } = getLocale(params?.slug);

  const handleSubmit = async () => {
    showBackDrop();
    const line_items = props.items.map((item) => {
      const { quantity, pricevalue, name, description, image } = item;
      return {
        quantity,
        price_data: {
          currency: localeToCurrency(locale),
          unit_amount: Math.round(pricevalue * 100),
          product_data: {
            name,
            description,
            images: [image],
          },
        },
      };
    });

    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        line_items,
        redirect_url: locale ? `/${locale}` : "",
        locale: locale ?? "en-US",
      }),
    });

    const checkoutSession = await res.json();
    hideBackDrop();
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    console.warn(error.message);
  };

  return (
    <Button
      disabled={props.hasOutOfStock}
      onClick={handleSubmit}
      variant={props.theme || "contained"}
      color="success"
    >
      {props.label || "Checkout"}
    </Button>
  );
};

export default Checkout;
