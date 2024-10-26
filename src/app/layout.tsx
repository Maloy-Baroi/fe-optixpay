import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OptixPay",
  description: "This a payment aggrega",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
