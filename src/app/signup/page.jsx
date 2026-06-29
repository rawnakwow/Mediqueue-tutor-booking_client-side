"use client";

// 1. Removed CardBody and CardHeader from HeroUI imports
import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import RegisterForm from "@/components/auth/RegisterForm";
import { Suspense } from "react";
import { Loader } from "@/components/shared/loader"; // Changed to lowercase 'l' and added curly braces


export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[100px] pointer-events-none"></div>
      
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md z-10 py-8">
        <Card className="w-full shadow-2xl border border-divider/50 bg-background/60 backdrop-blur-xl">
          
          <Card.Header className="flex flex-col gap-1 text-center pt-8 pb-4">
            <h1 className="text-3xl font-extrabold tracking-tight">Create Account</h1>
            <p className="text-default-500 text-sm">Join SkillSphere and start your learning journey today.</p>
          </Card.Header>

          <Card.Content className="px-8 pb-8">
            <Suspense fallback={<Loader />}>
              <RegisterForm />
            </Suspense>
          </Card.Content>
          
        </Card>
      </motion.div>
    </div>
  );
}
 