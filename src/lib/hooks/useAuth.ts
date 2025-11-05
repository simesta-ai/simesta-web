"use client";

import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { RootState, AppDispatch } from "../redux/store";
import {
  initializeAuth,
  loginUser,
  registerUser,
  logoutUser,
  refreshTokens,
} from "../redux/slices/authSlice";

export const useAuth = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { user, authToken, refreshToken, isAuthenticated, isLoading, error } =
    useSelector((state: RootState) => state.persisted.auth);

  useEffect(() => {
    // Initialize auth state from localStorage (if available)
    dispatch(initializeAuth());
  }, [dispatch]);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await dispatch(loginUser({ email, password })).unwrap();
        if (result) {
            router.push("/dashboard");
        }
        return result;
    },
    [dispatch, router]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const resultAction = await dispatch(registerUser({ name, email, password }));
      if (registerUser.fulfilled.match(resultAction)) {
        router.push('/dashboard');
      }
      return resultAction;
    },
    [dispatch, router]
  );

  const logout = useCallback(async () => {
    await dispatch(logoutUser());
    router.push("/");
  }, [dispatch, router]);

  const refresh = useCallback(async () => {
    return await dispatch(refreshTokens());
  }, [dispatch]);

  // Protected route handling
  useEffect(() => {
    // Check if the current route requires authentication
    const isProtectedRoute =
      pathname?.startsWith("/dashboard") || pathname?.startsWith("/chat");

    // Check if we're on an auth page
    const isAuthPage = pathname == "/login" || pathname == "/signup";

    // Redirect logic
    if (isAuthenticated && isAuthPage) {
      router.push("/dashboard");
    } else if (!isAuthenticated && isProtectedRoute) {
      router.push("/login");
    }
  }, [isAuthenticated, pathname, router]);

  return {
    user,
    authToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    refresh,
  };
};
