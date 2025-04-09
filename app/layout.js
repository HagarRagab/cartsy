import "@/app/_styles/globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en" style={{ filter: "none" }}>
            <body>{children}</body>
        </html>
    );
}
