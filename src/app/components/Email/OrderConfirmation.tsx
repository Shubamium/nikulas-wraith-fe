import * as React from "react";
import { Html, Hr, Img } from "@react-email/components";

type Props = { id: string };
export function OrderConfirmation({ id }: Props) {
  return (
    <Html lang="en">
      {/* <Button href={url}>Click me</Button> */}
      <Img
        src="https://i.ibb.co.com/fFn3zFh/confirm.png"
        alt="Thank you for your purchase! We greatly appreciate you choosing us to provide you with the best quality items! Your purchase number for this order is in this email below"
      />
      <Hr />
      <p>
        Should you have any questions, please email us at (business@vpe.digital)
        and include your purchase number.
      </p>
      <p>
        {" "}
        Your order tracking id is: <code>{id}</code>
      </p>
      <Hr />
    </Html>
  );
}
