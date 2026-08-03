"use client";

import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


export function CombinedProviders({children}){


return (

<GoogleOAuthProvider
clientId={
process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
}
>

<AuthProvider>

{children}

<ToastContainer />

</AuthProvider>

</GoogleOAuthProvider>

);


}