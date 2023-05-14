import LoginCard from "../../components/LoginCard";
import { useState, useContext, useEffect } from "react";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import { UserDataContext } from "@/lib/hooks";

export default function Login(){
    const [error, setError] = useState(false) 
    const router = useRouter()
   
    const {user, logIn, loading} = useContext(UserDataContext)

    function loginUser(userData) {
        logIn(userData.get("email"), userData.get("password"))
          .catch(err => setError(err.message))
    }

    useEffect(() => {
        if (user && router.pathname === "/login" || router.pathname === "signup") {
            router.push("/");
        }
        
        if (!user) {
            if (router.pathname !== "/login" || router.pathname !== "/signup" || router.pathname !== "/")
                router.push("/login");  
        }
    }, [router.pathname, user]);

    return(
        <div>
            {loading ?
            <Loading/> :
            <LoginCard error={error} onLogin={loginUser}/>
            }
        </div>)
}
