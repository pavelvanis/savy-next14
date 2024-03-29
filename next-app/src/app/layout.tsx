import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter, Red_Hat_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const font = Red_Hat_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "savy - Money Manager",
  description:
    "Web application to manage your baking accounts and transactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
