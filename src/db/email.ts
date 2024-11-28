"use server";

import { render } from "@react-email/components";
import nodemailer, { TransportOptions } from "nodemailer";
import { OrderConfirmation as ConfirmEmail } from "@/app/components/Email/OrderConfirmation";
const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: "465",
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
} as TransportOptions);

// const mainEmail = "business@vpe.digital";

export async function sendOrderConfirmation(
  to: string,
  id: string,
  nick?: string
) {
  const emailHtml = await render(ConfirmEmail({ id: id }));
  try {
    const orderMail = await mailer.sendMail({
      from: `The Phantom Realm <${process.env.SMTP_USER}>`,
      to: to,
      cc: ["shuba.dev313@gmail.com"].join(","),
      subject: "[ORDER CONFIRMATION] Purchase Completed!",
      // text: `Thank you for your purchase! We greatly appreciate you choosing us to provide you with the best quality items!
      // \n\ Your purchase number for this order is in this email below.\n Your order tracking id is: ${id}`,
      html: emailHtml,
    });
    const nikMail = await mailer.sendMail({
      from: `The Phantom Realm <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `[NEW ORDER REQUEST] ${nick ? nick : to} made a purchase!`,
      cc: ["shuba.dev313@gmail.com"].join(","),
      text: `Someone made a purchase through your website, take action now!`,
    });
    console.log("Successfully send email");
  } catch (err) {
    console.error("ERROR_SEND_MAIL", err);
  }
}
export async function sendOrderUpdateStatus(
  to: string,
  status: string,
  status_message: string,
  order_id: string
) {
  try {
    const orderMail = await mailer.sendMail({
      from: `The Phantom Realm <${process.env.SMTP_USER}>`,
      to: to,
      subject: `[${order_id}] Your item has been updated!`,
      text: `Your item has been updated to  ${status.toUpperCase()}.\n \n${status_message}`,
    });
  } catch (err) {
    console.error("ERROR_SEND_MAIL (UPDATE_STATUS)", err);
  }
}
export async function sendOrderComplete(
  to: string,
  order_id: string,
  nick?: string
) {
  try {
    const nikMail = await mailer.sendMail({
      from: `The Phantom Realm <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      cc: ["shuba.dev313@gmail.com"].join(","),
      subject: `[${order_id}] ${nick ? nick : to} has confirmed their order!`,
      text: `Buyer has confirmed that they received the item and have marked this order as completed`,
    });
  } catch (err) {
    console.error("ERROR_SEND_MAIL (UPDATE_COMPLETE)", err);
  }
}
