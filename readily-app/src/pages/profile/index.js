import ProfileCard from "@/components/ProfileCard";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "@/lib/hooks";

export default function profile() {
  const { user, changeEmail, changePassword } = useContext(UserDataContext);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    console.log(user);
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  function onChangeEmail(userData){console.log(userData.get("Current Email"))}
  function onChangePassword(userData){console.log(userData)}

  return (
    <ProfileCard
      email={email}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
    />
  );
}
