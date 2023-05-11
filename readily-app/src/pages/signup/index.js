import SignupCard from "@/components/SignupCard";

export default function Signup(props) {
    const {signup} = useContext(UserDataContext)
    return (
        <SignupCard onSignUp = {signup}/>
    )
}