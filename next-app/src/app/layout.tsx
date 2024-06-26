import "@/styles/globals.css";

import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";

import { Toaster } from "sonner";
import { ThemeProvider, SessionProvider } from "@/components/providers";

const font = Red_Hat_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Savy",
  description:
    "Savy is a modern web application that helps you manage your finances.",
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
