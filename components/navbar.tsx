"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, useUser, SignOutButton } from "@clerk/nextjs";

const NavBar = () => {
  const { isLoaded, isSignedIn, user } = useUser();


  console.log("isSignedIn:", isSignedIn, "user:", user);

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <Image
            className="text-xl ont-bold text-emerald-700 cursor-pointer"
            src="/logo.png"
            width={60}
            height={60}
            alt="logo"
          />
        </Link>
        <div className="space-x-6 flex items-center">
          <SignedIn>
            <Link href="/mealplan">Mealplan</Link>
            {user?.imageUrl ? (
              <Link
                href="/profile"
                className="text-gray-700 hover:text-emerald-500 transition-colors"
              >
                <Image
                  src={user.imageUrl}
                  alt="Profile Picture"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            )}
            <SignOutButton>
              <button className="ml-4 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
          <SignedOut></SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
