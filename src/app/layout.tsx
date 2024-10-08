import type { Metadata } from "next";
import { poppins } from "@/components/ui/font";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getUserRole, isLoggedIn } from "@/app/actions/auth/auth-action";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Tolerra",
    description:
        "Education Platform Focusing to Visual Disisability for Self Development.",
    icons: {
        icon: "favicon.ico",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const userIsLoggedIn = await isLoggedIn();
    const userRole = await getUserRole();

    return (
        <html lang="en">
            <body className={`${poppins.className}`}>
                <div className="flex flex-col min-h-screen">
                    <Header isSignedIn={userIsLoggedIn} userRole={userRole} />
                    <Toaster />
                    <main className="flex-grow px-8 sm:px-6 md:px-8 lg:px-16 xl:px-0 max-w-7xl mx-auto w-full">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
