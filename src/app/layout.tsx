import type { Metadata } from "next";
import { Cabin, Geist, Lobster, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import SessionWrapper from "@/components/common/SessionWrapper";
import ReactQueryWrapper from "@/components/common/ReactQueryWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const lobster = Lobster({
  variable: "--lobster",
  weight: "400",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--nunito",
  weight: "800",
  subsets: ["latin"],
});

const cabin = Cabin({
  variable: "--cabin",
  weight: "400",
  subsets: ["latin"],
});

// const ebGaramond = EB_Garamond({
//   variable: "--eb-garamond",
//   weight: "400",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Tiketex",
  description: "",
  icons: {
    icon: "/calendar.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${lobster.variable} ${nunito.variable} ${cabin.variable} antialiased`}
      >
        <ReactQueryWrapper>
          <SessionWrapper>
            <Header />
            {children}
            <Footer />
          </SessionWrapper>
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
