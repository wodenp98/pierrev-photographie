import React from "react";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../../lib/redux/provider";
import NavbarHomePage from "../../components/Navbars/NavbarHomePage";
import Footer from "../../components/Footer/Footer";
import { AuthContextProvider } from "@/lib/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pierre.V Photographie",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <AuthContextProvider>
            <NextTopLoader />
            <NavbarHomePage />
            {children}
            <Toaster />
            <Footer />
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
