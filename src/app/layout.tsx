import type { Metadata } from "next";
import { cormorant, dmSans } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hydrops.in"
  ),
  title: {
    default: "Hydrops — Pure Coconut Oil · India",
    template: "%s | Hydrops",
  },
  description:
    "Hydrops delivers crystal-clear, double-filtered virgin coconut oil crafted with precision in India. Naturally pure. Carefully refined.",
  keywords: ["coconut oil", "virgin coconut oil", "pure coconut oil", "Hydrops", "India"],
  openGraph: {
    type: "website",
    siteName: "Hydrops",
    title: "Hydrops — Pure Coconut Oil · India",
    description:
      "Crystal-clear, double-filtered virgin coconut oil. Naturally pure. Carefully refined.",
    images: [{ url: "/images/brand/logo.png", width: 800, height: 600, alt: "Hydrops" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hydrops — Pure Coconut Oil · India",
    description: "Crystal-clear, double-filtered virgin coconut oil. Naturally pure.",
    images: ["/images/brand/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
