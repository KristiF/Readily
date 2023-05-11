import SignupCard from "@/components/SignupCard";
import { useContext } from "react";
import { UserDataContext } from "@/lib/hooks";
import { useState } from "react";

export default function Signup() {
  const { signup } = useContext(UserDataContext);
  const [passwordValue, setNewPasswordValue] = useState("");
  const [emailValue, setNewEmailValue] = useState("");

  async function handleSignup(userData) {
    setNewPasswordValue("");
    setNewEmailValue("");
    await signup(userData.get("email"), userData.get("password"));
  }

  return (
    <SignupCard
      onSignup={handleSignup}
      passwordValue={passwordValue}
      emailValue={emailValue}
      setNewEmailValue={(newEmail) => setNewEmailValue(newEmail.target.value)}
      setNewPasswordValue={(newPassword) =>
        setNewPasswordValue(newPassword.target.value)
      }
    />
  );
}
