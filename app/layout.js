import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import ChatBot from "@/components/ChatBot";
import BackToTop from "@/components/BackToTop";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500", "600", "700", "800", "900"] })

export const metadata = {
  title: "ByteMart - SuperDev",
  description: "ByteMart - A simple eCommerce website. SuperDev's Contribution",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${outfit.className} antialiased bg-background text-foreground transition-colors duration-300`} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <AppContextProvider>
              <ChatBot />
              <BackToTop />
              {children}
            </AppContextProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
