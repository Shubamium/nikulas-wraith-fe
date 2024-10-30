import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.scss";
import CursorEffect from "./components/CursorEffect/CursorEffect";
import { Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

const fira = Fira_Code({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: 'Nikulas Wraith',
//   description: 'Generated by create next app',
// }

const title = " > Phantom Realm <  ";

const description =
  "Hello Spirits! You just stumbled into the Phantom Realm! I'm Nik, your friendly Virtual Phantom that's on your PC just chillin' and ready to chat with you. Let's play some games and escape reality for a little while!";
const banner = "https://i.ibb.co/tBgCNDL/awwawa.png";

export const metadata: Metadata = {
  title: title,

  metadataBase: new URL("https://nikulaswraith.com"),

  openGraph: {
    url: "https://nikulaswraith.com",
    title: title,
    description: description,
    authors: "shubamium",
    images: [banner],
  },
  twitter: {
    title: title,
    card: "summary_large_image",
    description: description,

    images: [banner],
  },
  description: description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fira.className}>
        <div id="gallery-head"></div>
        <CursorEffect />
        {children}
        <div className="bg-grid"></div>
      </body>
    </html>
  );
}
