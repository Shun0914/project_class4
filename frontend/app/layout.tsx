import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { GoogleOAuthWrapper } from "@/lib/components/GoogleOAuthWrapper";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "まっちゃんウォレット(仮)",
  description: "家計簿アプリ まっちゃんウォレット(仮)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
          <GoogleOAuthWrapper>
            <AuthProvider>{children}</AuthProvider>
          </GoogleOAuthWrapper>
        
      </body>
    </html>
  );

}
