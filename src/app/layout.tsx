import type { Metadata } from "next";

import "./_styles/globals.scss";
import Header from "./_components/Header/Header";
import Navigation from "./_components/Navigation/Navigation";
import PaginationProvider from "./_context/pagination/Provider";
import type { ProviderProps } from "./_types/global";

export const metadata: Metadata = {
  title: "Async Race",
  description: "Car racing stimulation",
};

const RootLayout = ({
  children,
}: Readonly<ProviderProps>) => (
  <html lang="en">
    <body>
      <Header />
      <Navigation />
      <PaginationProvider>
        {children}
      </PaginationProvider>
    </body>
  </html>
);

export default RootLayout;