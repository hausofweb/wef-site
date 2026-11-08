import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "World Eye Foundation - CMS",
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => (
  <html lang="en">
    <body style={{ margin: 0 }}>{children}</body>
  </html>
);

export default RootLayout;
