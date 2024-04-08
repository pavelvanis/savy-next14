import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter, Red_Hat_Display } from "next/font/google";

import { Toaster } from "sonner";
import { ThemeProvider, SessionProvider } from "@/components/providers";

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
      <ThemeProvider>
        <SessionProvider>
          <body className={font.className}>
            <Toaster richColors closeButton visibleToasts={5} />
            {children}
          </body>
        </SessionProvider>
      </ThemeProvider>
    </html>
  );
}
