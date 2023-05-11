import SignupCard from "@/components/SignupCard";
import { useContext } from 'react';
import { UserDataContext } from '@/lib/hooks';

export default function Signup(props) {
    const {signup} = useContext(UserDataContext)

    function handleSignup(userData){
        console.log(userData.get("firstName"))
    }
    return (
        <SignupCard onSignup = {handleSignup}/>
    )
}