import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TrpcProvider } from "@/lib/trpc/TrpcProvider";
import { Toaster } from "sonner"; // Importa el componente Toaster

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crea CVs optimizados con IA - ALTOCV",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <TrpcProvider>
            {children}
            <Toaster position="bottom-right" /> {/* Añade el Toaster aquí */}
          </TrpcProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
