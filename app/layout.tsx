import "./globals.css";

export const metadata = {
  title: "sunscreenglow",
  description: "A solar-powered website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <link
          rel="stylesheet"
          href="https://lachlanjc-btju310jv-lachlanjc.vercel.app/fonts.css"
        />
        {children}
      </body>
    </html>
  );
}
