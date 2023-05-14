import Loading from "@/components/Loading";
import { useContext, useEffect } from "react";
import { UserDataContext } from "@/lib/hooks";
import { useRouter } from "next/router";
export default function Signout(props){
    const {logOut, user} = useContext(UserDataContext)
    useEffect(function logOutUser() {
        logOut().then(()=> {
        if (!user)
            window.location.href = "/"
        })
    }, [])

    return(
        <Loading/>
    )
}