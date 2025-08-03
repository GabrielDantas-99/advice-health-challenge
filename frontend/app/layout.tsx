import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";

const font = Poppins({
  weight: ["200", "300", "400", "600"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "AdviceHealth",
  description: "Gerenciador de Tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="32x32"></link>
      </head>
      <body
        className={`${font.className} antialiased`}
      >
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
