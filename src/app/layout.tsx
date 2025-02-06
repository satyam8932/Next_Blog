import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MetaExpat",
  description: "Plan your next expatriation the easy way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
