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

const mainEmail = "nikulaswraith@gmail.com";

export async function sendOrderConfirmation(to: string, id: string) {
  const emailHtml = await render(ConfirmEmail({ id: id }));
  try {
    const orderMail = await mailer.sendMail({
      from: `The Phantom Realm <${process.env.SMTP_USER}>`,
      to: to,
      cc: ["vicnet.video@gmail.com"].join(","),
      subject: "[ORDER CONFIRMATION] Purchase Completed!",
      // text: `Thank you for your purchase! We greatly appreciate you choosing us to provide you with the best quality items!
      // \n\ Your purchase number for this order is in this email below.\n Your order tracking id is: ${id}`,
      html: emailHtml,
    });
    const nikMail = await mailer.sendMail({
      from: `The Phantom Realm <${process.env.SMTP_USER}>`,
      to: mainEmail,
      subject: `[NEW ORDER REQUEST] ${to} made a purchase!`,
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
