import React from "react";
import Header from "@/components/FrontEnd/Header";
import Footer from "@/components/FrontEnd/Footer";
interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
