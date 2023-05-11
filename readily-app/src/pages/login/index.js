import LoginCard from "../../components/LoginCard";
import { useState, useContext } from "react";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";
import { UserDataContext } from "@/lib/hooks";
export default function LoginPresenter(props){
    const [error, setError] = useState(false) 
    const router = useRouter()
   
    const {logIn, loading} = useContext(UserDataContext)

    function loginUser(userData) {
        logIn(userData.get("email"), userData.get("password"))
        .then(router.push("/"))
        .catch(err=>setError(err.message))
       
        // await signInWithEmailAndPassword(auth, userData.get("email"), userData.get("password"))
        // .then((userCredentials) => setUser(userCredentials))
        // .catch((err)=>{setError(err);console.log(err)})
    }

    return(
        <div>
            {loading ?
            <Loading/> :
            <LoginCard onLogin={loginUser}/>
            }
        </div>)

}