import Auth from "./auth";
import Providers from "./providers";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Auth>{children}</Auth>
        </Providers>
      </body>
    </html>
  );
}
