"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, TextField, Label, Input, Button } from "@heroui/react";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";
import Link from "next/link";
import GoogleLogin from "./GoogleLogin";



export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleRegister = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  let cleanImage = "https://ui-avatars.com" + encodeURIComponent(name);
  if (photoURL && photoURL.trim() !== "") {
    try {
      const validUrl = new URL(photoURL);
      cleanImage = validUrl.href;
    } catch (urlError) {
      setIsLoading(false);
      return toast.error("Please enter a valid photo URL structure.");
    }
  }

  try {
    const { data, error } = await authClient.signUp.email({
      email: email.trim(),
      password,
      name: name.trim(),
      image: cleanImage, 
    });

if (error) {
  console.error("Backend Auth Error Details String:", JSON.stringify(error, null, 2));
  console.dir(error); 
  
  toast.error(error.message || "Failed to register. Please try again.");
}
else {
      toast.success("Successfully registered! Please sign in.");
      router.push(redirect ? `/signin?redirect=${encodeURIComponent(redirect)}` : "/signin");
    }
  } catch (err) {
    console.error("Critical Signup Exception Error:", err);
    toast.error("An unexpected server communication error occurred.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="w-full flex flex-col items-center">
      <Form onSubmit={handleRegister} validationBehavior="native" className="flex flex-col gap-5 w-full">
        
        <TextField isRequired name="name" className="flex flex-col gap-1.5 text-left w-full">
          <Label className="text-sm font-semibold text-default-700">Full Name</Label>
          <div className="relative flex items-center w-full">
            <span className="absolute left-3 z-10 text-default-400 pointer-events-none">
              <FaUser className="shrink-0" />
            </span>
            <Input
              placeholder="John Doe"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-transparent border-2 border-default-200 rounded-xl outline-none transition-colors focus:border-primary text-white"
            />
          </div>
        </TextField>

        <TextField isRequired name="email" className="flex flex-col gap-1.5 text-left w-full">
          <Label className="text-sm font-semibold text-default-700">Email</Label>
          <div className="relative flex items-center w-full">
            <span className="absolute left-3 z-10 text-default-400 pointer-events-none">
              <FaEnvelope className="shrink-0" />
            </span>
            <Input
              placeholder="john@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-transparent border-2 border-default-200 rounded-xl outline-none transition-colors focus:border-primary text-white"
            />
          </div>
        </TextField>

        <TextField name="photoURL" className="flex flex-col gap-1.5 text-left w-full">
          <Label className="text-sm font-semibold text-default-700">Photo URL (Optional)</Label>
          <div className="relative flex items-center w-full">
            <span className="absolute left-3 z-10 text-default-400 pointer-events-none">
              <FaImage className="shrink-0" />
            </span>
            <Input
              placeholder="https://example.com"
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-transparent border-2 border-default-200 rounded-xl outline-none transition-colors focus:border-primary text-white"
            />
          </div>
        </TextField>

        <TextField isRequired name="password" className="flex flex-col gap-1.5 text-left w-full">
          <Label className="text-sm font-semibold text-default-700">Password</Label>
          <div className="relative flex items-center w-full">
            <span className="absolute left-3 z-10 text-default-400 pointer-events-none">
              <FaLock className="shrink-0" />
            </span>
            <Input
              placeholder="Choose a strong password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-transparent border-2 border-default-200 rounded-xl outline-none transition-colors focus:border-primary text-white"
            />
          </div>
        </TextField>

        <Button 
          type="submit" 
          color="primary" 
          size="lg" 
          className="relative z-20 font-bold mt-2 shadow-lg shadow-primary/30 w-full cursor-pointer h-11" 
          isLoading={isLoading}
        >
          Sign Up
        </Button>
      </Form>

      <div className="flex items-center gap-4 my-6 w-full">
        <hr className="flex-1 border-t border-divider opacity-50" />
        <p className="text-default-500 text-sm font-medium shrink-0">OR</p>
        <hr className="flex-1 border-t border-divider opacity-50" />
      </div>

      <div className="relative z-20 w-full cursor-pointer">
              
              <GoogleLogin />
            </div>

      <p className="text-center text-sm text-default-500 mt-6 relative z-20">
        Already have an account?{" "}
        <Link href={redirect ? `/signin?redirect=${encodeURIComponent(redirect)}` : "/signin"} className="text-primary font-semibold hover:underline cursor-pointer">
          Log in
        </Link>
      </p>
    </div>
  );
}
