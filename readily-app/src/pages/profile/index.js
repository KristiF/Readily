import ProfileCard from "@/components/ProfileCard";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "@/lib/hooks";
import { useRouter } from "next/router";

export default function profile() {
  const router = useRouter();
  const { user, changeEmail, changePassword } = useContext(UserDataContext);
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  function onChangeEmail() {
    changeEmail(user, newEmail)
      .then(() => {
        setCurrentEmail("");
        setNewEmail("");
        setEmailError(null);
      })
      .catch((error) => setEmailError(error.message));
  }
  function onChangePassword() {
    if (newPassword == confirmNewPassword) {
      changePassword(user, newPassword)
        .then(() => {
          setNewPassword("");
          setConfirmNewPassword("");
          setPasswordError(null);
        })
        .catch((error) => setPasswordError(error.message));
    } else {
      setPasswordError("Passwords don't match!");
    }
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
