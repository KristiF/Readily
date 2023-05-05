import NavbarView from "../../src/views/navbarView";
import LoginView from "../../src/views/loginView";
import { useAuth } from "../../src/context/UserContext";
import { useState } from "react";
import Loading from "../../src/components/loading";
// import { db } from "../../src/firebaseConfig";

export default function LoginPresenter(props){
    const [error, setError] = useState(false) 
    // const router = useRouter()
   
    const {logIn, userData, loading} = useAuth()


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
            <LoginView error={error} onLogin = {loginUserACB}/>
             }
        </div>)

}