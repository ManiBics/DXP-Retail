import { Inter } from "next/font/google";
import "./globals.css";
import ContextProviders from "@/components/common/ContextProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Baby Shop",
  description: "Baby Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProviders>{children}</ContextProviders>
      </body>
    </html>
  );
}
