"use client";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export default function LogOut(){ 
    const router = useRouter();

    const handleLogOut = async () => {
        console.log("logging out")
        await authClient.signOut();
        router.push("/");
    }

    return<Button variant="outline" onClick={() => handleLogOut()}>Log Out</Button>
}

