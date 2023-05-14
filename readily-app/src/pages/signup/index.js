import SignupCard from "@/components/SignupCard";
import { useContext } from "react";
import { UserDataContext } from "@/lib/hooks";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const { user, signUp } = useContext(UserDataContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleSignup(userData) {
    signUp(email, password)
    .catch(err => setError(err.message))
    .then(() => {if (user) {router.push("/")}});
  }

  return (
    <SignupCard
      error={error}
      onSignup={handleSignup}
      password={password}
      email={email}
      onEmailChange={(newEmail) => setEmail(newEmail.target.value)}
      onPasswordChange={(newPassword) =>
        setPassword(newPassword.target.value)
      }
    />
  );
}
