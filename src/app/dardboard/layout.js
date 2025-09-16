import "../globals.css";
import '@/components/Header'

export const metadata = {
  title: "Dardboard",
  description: "The Application-Specific Integrated Circuit (ASIC) Design and Research Laboratory at the University of Information Technology - VNU-HCM.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Header/> */}
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
