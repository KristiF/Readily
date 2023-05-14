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

  return (
    <ProfileCard
      email={email}
      onChangeEmail={changeEmail}
      onChangePassword={changePassword}
    />
  );
}
