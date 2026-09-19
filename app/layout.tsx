import "./globals.css";
import type {Metadata} from "next";
export const metadata:Metadata={title:"VISION SHOP",description:"Plateforme e-commerce multi-boutiques"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}