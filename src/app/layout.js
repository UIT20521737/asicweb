// src/app/layout.js
import "./globals.css";

// Metadata này là mặc định cho cả trang web
export const metadata = {
  title: "ASICLab - UIT",
  description: "The official website of the ASICLab laboratory.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
          <div>{children}</div>
        </body>
    </html>
  );
}