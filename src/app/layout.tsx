import { getTheme } from "@/actions/theme";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DM AI",
  description: "A collection of generators to help DMs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();

  return (
    <html lang="en" className={cn({ dark: theme === "dark" })}>
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
