import {
  useProfile,
  AuthClientError,
  StatusAPIResponse,
} from "@farcaster/auth-kit";
import { Session } from "next-auth";
import React, { useCallback, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { toast, ErrorIcon } from "react-hot-toast";

import { getNonce, login, logout } from "@/actions/auth";

interface AuthHookProps {
  isAuthenticated: boolean;
  session: Session | null;
  profile: {
    fid?: number;
    pfpUrl?: string;
    username?: string;
    displayName?: string;
    bio?: string;
    custody?: `0x${string}`;
    verifications?: `0x${string}`[];
  };
  dialogRef: React.RefObject<HTMLDialogElement>;
  handleNonce: () => Promise<string>;
  handleLogin: (res: StatusAPIResponse) => void;
  handleLogout: () => Promise<void>;
  handleError: (error?: AuthClientError) => void;
}

export function useAuth(): AuthHookProps {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { data: session } = useSession();
  const { isAuthenticated, profile } = useProfile();

  const handleNonce = useCallback(async () => {
    const { nonce } = await getNonce();

    return nonce!;
  }, []);

  const handleLogin = useCallback((res: StatusAPIResponse) => {
    console.log("Success Farcaster", res);

    login({
      message: res.message!,
      signature: res.signature!,
      name: res.username!,
      pfp: res.pfpUrl!,
      redirect: false,
    });
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
  }, []);

  const handleError = useCallback((error?: AuthClientError) => {
    error &&
      toast(error?.message, {
        icon: <ErrorIcon />,
        className: "",
      });
  }, []);

  useEffect(() => {
    if (session) {
      dialogRef.current?.open && dialogRef.current?.close();
    }
  }, [session]);

  return {
    session,
    isAuthenticated,
    profile,
    dialogRef,
    handleNonce,
    handleLogin,
    handleLogout,
    handleError,
  };
}
