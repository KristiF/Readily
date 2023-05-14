import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { UserDataProvider, UserDataContext } from "@/lib/hooks";
import { useContext } from "react";
import { useRouter } from "next/router";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <div>
      <UserDataProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </UserDataProvider>
    </div>
  );
}

function AppContent({ Component, pageProps }) {
  const { user, logOut } = useContext(UserDataContext);
  const router = useRouter();
  function handleLogout() {
    logOut().then(()=>router.push("/"))
  }	
  
  return (
    <div>
      {(router.pathname !== "/") &&
        <Navbar user={user} onLogOut={()=>handleLogout()}/>
      }
      <Component {...pageProps} />
    </div>
  );
}
