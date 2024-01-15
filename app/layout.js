import { ChackrauiProvider } from "@/providers/ChakrauiProvider";
import "animate.css";
import "./globals.css";
import { Inter } from "next/font/google";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Layouts/Footer";
import RecoilProvider from "@/providers/state-providers/RecoilStateProviders/RecoilProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HAGmax",
  description: "Movie Streaming Site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilProvider>
          <ReactQueryProvider>
            <ChackrauiProvider>
              <Navbar />
              {children}
              <ToastContainer />
              <Footer />
            </ChackrauiProvider>
          </ReactQueryProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
