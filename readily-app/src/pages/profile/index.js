import ProfileCard from "@/components/ProfileCard";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "@/lib/hooks";
import { useRouter } from "next/router";


export default function profile() {
  const router = useRouter()
  const { user, changeEmail, changePassword } = useContext(UserDataContext);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null)
 
  function onChangeEmail() {
    changeEmail(user, newEmail);
    setCurrentEmail("");
    setNewEmail("");
  }
  function onChangePassword() {
      console.log(newPassword)
      console.log(confirmNewPassword)
      if(newPassword == confirmNewPassword){changePassword(user, newPassword);setNewPassword("");setConfirmNewPassword("")}
      else{setPasswordError("Passwords don't match!")}
  }

  return (
    <ProfileCard
      emailError={emailError}
      passwordError={passwordError}
      currentEmail={currentEmail}
      newEmail={newEmail}
      newPassword={newPassword}
      confirmNewPassword={confirmNewPassword}
      onChangeCurrentEmail={(alteredCurrentEmail) =>
        setCurrentEmail(alteredCurrentEmail.target.value)
      }
      onChangeNewEmail={(newEmail) => setNewEmail(newEmail.target.value)}
      onChangeNewPassword={(newPassword) =>
        setNewPassword(newPassword.target.value)
      }
      onChangeConfirmNewPassword={(confirmNewPassword) =>
        setConfirmNewPassword(confirmNewPassword.target.value)
      }
      onSubmitChangePassword={onChangePassword}
      onSubmitChangeEmail={onChangeEmail}
    />
  );
}
