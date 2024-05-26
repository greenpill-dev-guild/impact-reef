"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import React, { useRef } from "react";
import { useSignIn, QRCode, AuthKitProvider } from "@farcaster/auth-kit";

import { authConfig } from "@/modules/auth";
import { useAuth } from "@/hooks/auth/useAuth";

import { Dialog } from "@/components/Dialog";
import { SessionProvider } from "next-auth/react";

interface Link {
  title: string;
  icon: string;
  action?: () => void;
}

export interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  return (
    <SessionProvider>
      <AuthKitProvider config={authConfig}>
        <LoginContent />
      </AuthKitProvider>
    </SessionProvider>
  );
};

export const LoginContent: React.FC<LoginProps> = () => {
  const {
    isAuthenticated,
    // profile,
    // handleNonce,
    dialogRef,
    handleLogin,
    handleLogout,
    handleError,
  } = useAuth();

  // const getNonce = useCallback(async () => {
  //   const nonce = await getCsrfToken();
  //   if (!nonce) throw new Error("Unable to generate nonce");
  //   return nonce;
  // }, []);

  const { url, signIn, connect } = useSignIn({
    nonce: "csrfToken",
    onSuccess: handleLogin,
    onError: handleError,
  });

  const profileLinks: Link[] = [
    { title: "endorsements", icon: "/icons/fire.svg" },
    { title: "metrics", icon: "/icons/flag.svg" },
    { title: "criteria", icon: "/icons/newspaper.svg" },
    { title: "settings", icon: "/icons/flag.svg" },
    { title: "logout", icon: "/icons/fire.svg", action: handleLogout },
  ];

  async function handleLoginClick() {
    try {
      await connect();
      signIn();

      dialogRef.current?.showModal();
    } catch (error) {
      toast("Error starting sign in");
    }
  }

  return (
    <div className="">
      {isAuthenticated ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {/* <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              /> */}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {profileLinks.map((link) => (
              <li key={link.title} className="capitalize font-semibold">
                {link?.action ? (
                  <button onClick={link.action}>{link.title}</button>
                ) : (
                  <Link href={`/profile/${link.title}`}>{link.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleLoginClick}
          className="button grid place-items-center w-36 p-4 rounded-full bg-blue-950 text-neutral-50 font-semibold leading-snug"
        >
          Sign In
        </button>
      )}
      <Dialog
        id="login-dialog"
        ref={dialogRef}
        style={{
          padding: 0,
        }}
        className="flex gap-4 max-w-2xl h-[480px]"
      >
        <Image
          alt="login image for impact reef"
          src="/images/img-signin.jpg"
          width={520}
          height={723}
        />
        <div className="flex flex-col w-full py-8 pr-4 text-zinc-800">
          <h2 className="text-2xl font-bold leading-7 mb-4">
            Build your Impact Profile by evaluating others and helping the
            ecosystem grow.
          </h2>
          <p className="text-base font-light leading-7">
            Please continue with Farcaster
          </p>
          {url && <QRCode uri={url} size={240} />}
        </div>
      </Dialog>
    </div>
  );
};
