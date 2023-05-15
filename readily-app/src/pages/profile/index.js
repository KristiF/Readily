import ProfileCard from "@/components/ProfileCard";
import { useContext, useState } from "react";
import { UserDataContext } from "@/lib/hooks";
import { useEffect } from "react";

export default function Profile() {
  const { user, changeEmail, changePassword } = useContext(UserDataContext);
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (user) {
      setCurrentEmail(user.email);
    }
  }, [user]);

  function onChangeEmail() {
    if (currentEmail !== user.email) {
      setEmailError("invalid email");
      return;
    }
    if (currentEmail === "") {
      setEmailError("empty email field");
      return;
    }
    if (newEmail === "") {
      setEmailError("no new email");
      return;
    }
    if (currentEmail === "" && newEmail === "") {
      setEmailError("empty email fields");
      return;
    } else {
      changeEmail(user, newEmail)
        .then(() => {
          setCurrentEmail("");
          setNewEmail("");
        })
        .then(() => setEmailError(false))
        .catch((error) => setEmailError(error.message));
    }
  }
  function onChangePassword() {
    if (newPassword == confirmNewPassword) {
      changePassword(user, newPassword)
        .then(() => {
          setNewPassword("");
          setConfirmNewPassword("");
        })
        .then(setPasswordError(false))
        .catch((error) => setPasswordError(error.message));
    }

    if (newPassword === "") {
      setPasswordError("empty password");
      return;
    }
    if (confirmNewPassword === "") {
      setPasswordError("empty confirm password");
      return;
    }
    if (confirmNewPassword === "" && newPassword === "") {
      setPasswordError("both password fields empty");
      return;
    } else {
      setPasswordError("no match");
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
