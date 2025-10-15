import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";
import ErrorToaster from "@/components/ErrorToaster";

export const metadata = {
  title: "educational_video_app",
  description: "EdTech - Educational Video App",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <ErrorToaster />
        </Providers>
      </body>
    </html>
  );
}
