import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "vid.bd | Universal Media & File Utility Hub",
  description: "Download videos from any platform and convert files with zero server load. Fast, secure, and free.",
  keywords: ["video downloader", "file converter", "pdf tools", "youtube downloader", "facebook downloader", "vid.bd"],
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
