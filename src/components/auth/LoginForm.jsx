// src/components/auth/LoginForm.jsx
"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const { data, error } = await authClient.signIn.email({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            toast.error(error.message || "Invalid credentials");
        } else {
            toast.success("Login successful");
            router.push("/");
            router.refresh();
        }
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-2">
            <input 
                type="email"
                placeholder="Email" 
                value={email}
                onChange={e => setEmail(e.target.value)} 
                required
                className="p-2 border rounded"
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={e => setPassword(e.target.value)} 
                required
                className="p-2 border rounded"
            />
            <button type="submit" disabled={loading} className="p-2 bg-primary text-white rounded">
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}
