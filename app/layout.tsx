/* eslint-disable react/jsx-no-undef */
import Providers from "@/app/Providers";
import { SessionProvider } from "next-auth/react";
export interface I_props {
  children: React.ReactNode;
}
export default function RootLayout({ children}: I_props) {
  return (
    <html lang="en">
      <head>
        <title>DashBoard</title>
      </head>
      <body className="bg-primary">
             <Providers >{children}</Providers>
       </body>
    </html>
  );
}
