"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  };



  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-b-divider bg-background/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <div className="flex items-center">
          <Link href="/" className="font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            MediQueue
          </Link>
        </div>

        <nav className="hidden sm:flex items-center gap-8">
          <Link href="/" className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm">
            Home
          </Link>
          <Link href="/courses" className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm">
             Tutors
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-default-200 animate-pulse"></div>
          ) : session ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div 
                  role="button"
                  tabIndex={0}
                  className="flex items-center justify-center p-1 border-2 border-primary rounded-full hover:opacity-80 transition-opacity focus:outline-none shrink-0 cursor-pointer"
                >
                  <Image
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                    alt={session.user.name || "User profile"}
                    src={
  session.user.image ||
  `https://ui-avatars.com{encodeURIComponent(
    session.user.name || "User"
  )}&background=6c63ff&color=fff`
}

                    width={32}
                    height={32}
                    unoptimized
                  />
                </div>
              </DropdownTrigger>

              <DropdownMenu aria-label="Profile Actions" variant="faded" className="w-56">
                <DropdownItem key="profile" className="h-14 gap-2 border-b border-b-divider/50 rounded-none pointer-events-none">
                  <p className="text-xs font-normal text-default-400">Signed in as</p>
                  <p className="text-sm font-semibold text-foreground truncate max-w-[200px]">{session.user.email}</p>
                </DropdownItem>
                <DropdownItem key="my-profile" onClick={() => router.push("/my-profile")} className="mt-1">
                  My Profile
                </DropdownItem>
                <DropdownItem key="logout" color="danger" className="text-danger" onClick={handleLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/signin" className="hidden lg:inline-block hover:text-primary transition-colors font-medium text-sm">
                Login
              </Link>
              
              <Link 
                href="/signup" 
                className={buttonVariants({ variant: "solid", color: "primary", className: "font-medium text-sm shadow-md" })}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
