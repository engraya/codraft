import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import './globals.css'
import { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import Provider from "./Provider"
import Footer from "@/components/Footer"


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'CoDraft',
  description: 'Codraft - Collaborate and share documents in real-time. Enhance your productivity with seamless editing, secure sharing, and intuitive collaboration tools. Perfect for teams and individuals.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { 
          colorPrimary: "#3371FF" ,
          fontSize: '16px'
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <Provider>
            {children}
          </Provider>
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  )
}