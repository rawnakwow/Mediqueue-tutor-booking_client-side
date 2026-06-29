"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, TextField, Label, Input, Button } from "@heroui/react";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import GoogleLogin from "./GoogleLogin";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Failed to sign in. Please check your credentials.");
      } else {
        toast.success("Successfully logged in!");
        router.push(redirect || "/");
        router.refresh();
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Form onSubmit={handleLogin} validationBehavior="native" className="flex flex-col gap-5 w-full">
        
        <TextField isRequired name="email" className="flex flex-col gap-1.5 text-left w-full">
          <Label className="text-sm font-semibold text-default-700">Email</Label>
          <div className="relative flex items-center w-full">
            <span className="absolute left-3 z-10 text-default-400 pointer-events-none">
              <FaEnvelope className="shrink-0" />
            </span>
            <Input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-transparent border-2 border-default-200 rounded-xl outline-none transition-colors focus:border-primary text-white"
            />
          </div>
        </TextField>

        {/* Password Input Wrapper */}
        <TextField isRequired name="password" className="flex flex-col gap-1.5 text-left w-full">
          <Label className="text-sm font-semibold text-default-700">Password</Label>
          <div className="relative flex items-center w-full">
            <span className="absolute left-3 z-10 text-default-400 pointer-events-none">
              <FaLock className="shrink-0" />
            </span>
            <Input
              placeholder="Enter your password"
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
          Sign In
        </Button>
      </Form>

      <div className="flex items-center gap-4 my-6 w-full">
        <hr className="flex-1 border-t border-divider opacity-50" />
        <p className="text-default-500 text-sm font-medium shrink-0">OR</p>
        <hr className="flex-1 border-t border-divider opacity-50" />
      </div>

      <div className="relative z-20 w-full cursor-pointer" >
        
        <GoogleLogin />
      </div>

      <p className="text-center text-sm text-default-500 mt-6 relative z-20">
        Do not have an account?{" "}
        <Link href={redirect ? `/signup?redirect=${encodeURIComponent(redirect)}` : "/signup"} className="text-primary font-semibold hover:underline cursor-pointer">
          Sign up
        </Link>
      </p>
    </div>
  );
}
