import SignupCard from "@/components/SignupCard";
import { useContext } from "react";
import { UserDataContext } from "@/lib/hooks";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const { user, signUp } = useContext(UserDataContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleSignup() {
    if (confirmPassword == password) {
      signUp(email, password)
        .catch((err) => setError(err.message))
        .then(() => {
          if (user && !error) {
            router.push("/");

          }
        })
        .then(setError(false));
    }

    else if(email == ""){
      setError("empty email")
    }

    else if(confirmPassword == ""){
      setError("blank confirm field")
    }

    else if(confirmPassword !== password){
      setError("no match")
    }



  }

  return (
    <SignupCard
      error={error}
      onSignup={handleSignup}
      password={password}
      confirmPassword={confirmPassword}
      email={email}
      onEmailChange={(newEmail) => setEmail(newEmail.target.value)}
      onPasswordChange={(newPassword) => setPassword(newPassword.target.value)}
      onConfirmPasswordChange={(newPassword) =>
        setConfirmPassword(newPassword.target.value)
      }
    />
  );
}
