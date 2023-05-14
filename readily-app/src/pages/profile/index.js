import ProfileCard from "@/components/ProfileCard";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "@/lib/hooks";

export default function profile() {
  const { user, changeEmail, changePassword } = useContext(UserDataContext);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);

  function onChangeEmail() {
    changeEmail(user, newEmail);
    setCurrentEmail("");
    setNewEmail("");
  }
  function onChangePassword() {
    changePassword(user, newPassword);
  }

  return (
    <ProfileCard
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
