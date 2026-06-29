"use client";

import { Button } from "@heroui/react";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";




export default function GoogleLogin() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleGoogleLogin = async () => {
    try {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: redirect || "/",
      });
      console.log(data,'data');
    } catch (err) {
      toast.error("Google login failed or is not configured.");
    }
  };

  
  return (
    <Button 
      variant="bordered" 
      className="relative z-30 w-full font-medium border-2 cursor-pointer h-11" 
      size="lg" 
      onClick={handleGoogleLogin}
     
    >
       <FaGoogle  />
      Continue with Google
    </Button>
  );
}
