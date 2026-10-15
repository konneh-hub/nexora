import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nexora Technologies | Building What Comes Next",
    template: "%s | Nexora Technologies",
  },
  description:
    "Practical technology for growing businesses. Explore web development, business digitisation, custom software and IT support from Nexora Technologies.",
  applicationName: "Nexora Technologies",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1220",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
