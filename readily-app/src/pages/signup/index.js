import SignupCard from "@/components/SignupCard";
import { useContext } from "react";
import { UserDataContext } from "@/lib/hooks";

export default function Signup() {
  const { signup } = useContext(UserDataContext);

  async function handleSignup(userData) {
    await signup(userData.get("email"), userData.get("password"));
  }
  return <SignupCard onSignup={handleSignup} />;
}
