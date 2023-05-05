import LoginCard from "@/components/LoginCard";
//import { useAuth } from "../../src/context/UserContext";
import { useState } from "react";
import Loading from "@/components/Loading";
// import { db } from "../../src/firebaseConfig";

export default function LoginPresenter(props){
    const [error, setError] = useState(false) 
    // const router = useRouter()
   
    //const {logIn, userData, loading} = useAuth()


    async function loginUserACB(userData) {
        await logIn(userData.get("email"), userData.get("password")).catch(err=>setError(err.message))
        router.push("/")
        // await signInWithEmailAndPassword(auth, userData.get("email"), userData.get("password"))
        // .then((userCredentials) => setUser(userCredentials))
        // .catch((err)=>{setError(err);console.log(err)})
    }


    return(
        <div>

            <LoginCard error={error} /> 

        </div>)

}