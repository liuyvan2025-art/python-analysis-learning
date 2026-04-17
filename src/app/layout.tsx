import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import { CozeBadgeRemover } from "@/components/CozeBadgeRemover";

export const metadata: Metadata = {
  title: "Python数据分析30天学习",
  description: "30天Python数据分析科研学习方案，包含在线代码运行、代码讲解、打卡功能",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-background antialiased">
        <CozeBadgeRemover />
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
