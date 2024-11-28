import { sendOrderComplete, sendOrderUpdateStatus } from "@/db/email";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  console.log(body);

  if (body.status === "completed") {
    await sendOrderComplete(body.buyer?.email, body.order_id, body.buyer?.nick);
  } else {
    await sendOrderUpdateStatus(
      body.buyer?.email,
      body.status,
      body.status_text,
      body.order_id
    );
  }
  return new Response(
    JSON.stringify({
      status: "Webhook Processed",
    }),
    {
      status: 200,
    }
  );
  // await sendOrderUpdateStatus(email,status)
}
