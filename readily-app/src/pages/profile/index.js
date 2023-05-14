import ProfileCard from "@/components/ProfileCard";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "@/lib/hooks";

export default function profile() {
  const { user, changeEmail, changePassword } = useContext(UserDataContext);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [newEmail, setNewEmail] = useState(null);

  useEffect(() => {
    if (user) {
      setCurrentEmail(user.email);
    }
  }, [user]);

  function onChangeEmail() {
    changeEmail(user, newEmail)
    setCurrentEmail("");
    setNewEmail("");
  }
  function onChangePassword() {
      changePassword(user, newPassword)
  }

  return (
    <ProfileCard
      currentEmail={currentEmail}
      onChangeCurrentEmail={(alteredCurrentEmail) =>
        setCurrentEmail(alteredCurrentEmail.target.value)
      }
      newEmail={newEmail}
      onChangeNewEmail={(newEmail) => setNewEmail(newEmail.target.value)}
      onChangePassword={onChangePassword}
      onSubmitChangeEmail={onChangeEmail}
    />
  );
}
