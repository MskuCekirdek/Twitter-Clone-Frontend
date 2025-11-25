import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anasayfa / Twitter Clone",
  description: "Twitter Clone Anasayfa Sayfası",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
