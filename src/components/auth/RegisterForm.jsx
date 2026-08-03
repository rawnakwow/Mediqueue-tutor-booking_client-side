// src/components/auth/RegisterForm.jsx
"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import GoogleLoginButton from "./GoogleLogin";

export default function RegisterForm() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        image: "", 
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await authClient.signUp.email({
            email: form.email,
            password: form.password,
            name: form.name,
            image: form.image,
        });

        setLoading(false);

        if (error) {
            toast.error(error.message || "Registration failed");
        } else {
            toast.success("Registration successful");
            router.push("/");
            router.refresh();
        }
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-2">
            <input 
                name="name" 
                placeholder="Name" 
                onChange={e => setForm({ ...form, name: e.target.value })} 
                required
                className="p-2 border rounded"
            />
            <input 
                type="email"
                name="email" 
                placeholder="Email" 
                onChange={e => setForm({ ...form, email: e.target.value })} 
                required
                className="p-2 border rounded"
            />
            <input 
                name="image" 
                placeholder="Photo URL" 
                onChange={e => setForm({ ...form, image: e.target.value })} 
                className="p-2 border rounded"
            />
            <input 
                type="password" 
                placeholder="Password" 
                onChange={e => setForm({ ...form, password: e.target.value })} 
                required
                className="p-2 border rounded"
            />
            
            <button type="submit" disabled={loading} className="p-2 bg-primary text-white rounded">
                {loading ? "Registering..." : "Register"}
            </button>

            <div className="my-4 border-t pt-4">
                <GoogleLoginButton />
            </div>
        </form>
    );
}
