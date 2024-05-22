import {
  useProfile,
  AuthClientError,
  StatusAPIResponse,
} from "@farcaster/auth-kit";
import React, { useCallback } from "react";
import { toast, ErrorIcon } from "react-hot-toast";

import { getNonce, login, logout } from "@/actions/auth";

interface AuthHookProps {
  isAuthenticated: boolean;
  profile: {
    fid?: number;
    pfpUrl?: string;
    username?: string;
    displayName?: string;
    bio?: string;
    custody?: `0x${string}`;
    verifications?: `0x${string}`[];
  };
  handleNonce: () => Promise<string>;
  handleLogin: (res: StatusAPIResponse) => void;
  handleLogout: () => Promise<void>;
  handleError: (error?: AuthClientError) => void;
}

export function useAuth(): AuthHookProps {
  const { isAuthenticated, profile } = useProfile();

  const handleNonce = useCallback(async () => {
    const { nonce } = await getNonce();

    return nonce!;
  }, []);

  const handleLogin = useCallback((res: StatusAPIResponse) => {
    console.log("Success Farcaster", res);

    // await login({
    //   message: res.message!,
    //   signature: res.signature!,
    //   name: res.username!,
    //   pfp: res.pfpUrl!,
    //   redirect: false,
    // });
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

  return {
    isAuthenticated,
    profile,
    handleNonce,
    handleLogin,
    handleLogout,
    handleError,
  };
}
