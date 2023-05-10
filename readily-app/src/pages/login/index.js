import LoginCard from "../../src/components/LoginCard";
import { useState } from "react";
import Loading from "../../src/components/Loading";
import useUserData from "../../src/lib/hooks";

export default function LoginPresenter(props){
    const [error, setError] = useState(false) 
    // const router = useRouter()
   
    const {logIn, loading} = useUserData()


    async function loginUserACB(userData) {
        await logIn(userData.get("email"), userData.get("password")).catch(err=>setError(err.message))
        router.push("/")
        // await signInWithEmailAndPassword(auth, userData.get("email"), userData.get("password"))
        // .then((userCredentials) => setUser(userCredentials))
        // .catch((err)=>{setError(err);console.log(err)})
    }


    return(
        <div>
            {loading ?
            <Loading/> :
            <LoginCard onLogin={loginUserACB}/>
            }
        </div>)

}