"use client";

import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import RegisterForm from "@/components/auth/RegisterForm";

export default function SignUp() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      <div className="pointer-events-none absolute -right-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-primary/20 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-secondary/20 blur-[100px]" />

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="z-10 w-full max-w-md py-8"
      >
        <Card className="w-full overflow-hidden border border-divider/50 bg-background/80 shadow-2xl backdrop-blur-xl">
          <div className="px-6 pb-3 pt-8 text-center sm:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-default-500">
              Join MediQueue and start booking learning sessions today.
            </p>
          </div>

          <div className="px-6 pb-8 pt-4 sm:px-8">
            <RegisterForm />
          </div>
        </Card>
      </motion.div>
    </main>
  );
}