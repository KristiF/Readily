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
    if (email === "") {
      setError("empty email");
    } else if (confirmPassword === "") {
      setError("blank confirm field");
    } else if (confirmPassword !== password) {
      setError("no match");
    } else if (confirmPassword == password) {
      signUp(email, password)
        .then(() => {
          if (!error) {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            router.push("/");
          }
        })
        .then(setError(false))
        .catch((err) => setError(err.message));
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
