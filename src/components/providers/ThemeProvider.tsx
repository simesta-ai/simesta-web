"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { initializeTheme } from '@/lib/redux/slices/uiSlice';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.ui);
  
  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  return <>{children}</>;
}