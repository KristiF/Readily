import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { UserDataProvider } from "@/lib/hooks";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <div>
      <UserDataProvider>
        <Navbar />
        <Component {...pageProps} />
      </UserDataProvider>
    </div>
  );
}
