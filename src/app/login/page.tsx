"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SignInButton, SignOutButton, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { trpc } from '@/server/client';

const HomePage = () => {
    const { user } = useClerk();

    const createUserIfNotExists = trpc.user.createUserIfNotExists.useMutation();

    useEffect(() => {
      if (user && user.id) {
        createUserIfNotExists.mutate({ id: user.id, email: user.emailAddresses[0].emailAddress });
      }
    }, [user]);

    return (
        <div className="flex justify-center items-center h-screen">
           {!user && <Link href="/auth/sign-in"><Button className="ml-5 mt-2 rounded-3xl">Sign In</Button></Link>}
                {user && <SignOutButton><Button className="ml-5 mt-2 rounded-3xl">Sign Out</Button></SignOutButton>}
        </div>
    );
};

export default HomePage;