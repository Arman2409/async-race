import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./_styles/globals.scss";
import Header from "./_components/Header/Header";
import Navigation from "./_components/Navigation/Navigation";
import PaginationProvider from "./_context/pagination/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Async Race",
  description: "Car racing website",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Navigation />
        <PaginationProvider>
          {children}
        </PaginationProvider>
      </body>
    </html>
  );
}

export default RootLayout;