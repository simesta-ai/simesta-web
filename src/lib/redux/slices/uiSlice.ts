import { STORAGE_KEYS } from '@/lib/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UiState = {
  theme: 'light' | 'dark';
  courseHeaderTitle: string;
  isSideSectionOpen: boolean;
  isMobileMenuOpen: boolean;
  sideSectionType?: 'chat' | 'search' | 'history';
  mobileMenuType?: 'chat' | 'search' | 'history';
};

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    
    // Check user preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  
  return 'light';
};

const initialState: UiState = {
  theme: 'dark', // Will be initialized correctly in the browser
  courseHeaderTitle: 'Supervised Machine Learning: Regression and Classification', 
  isSideSectionOpen: true,
  isMobileMenuOpen: false,
  sideSectionType: 'chat',
  mobileMenuType: 'chat',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    initializeTheme: (state) => {
      state.theme = getInitialTheme();
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.THEME, action.payload);
        
        if (action.payload === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
        
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
    setCourseHeaderTitle: (state, action: PayloadAction<string>) => {
      state.courseHeaderTitle = action.payload;
    },
    clearCourseHeaderTitle: (state) => {
      state.courseHeaderTitle = '';
    },
    openSideSection: (state) => {
      state.isSideSectionOpen = true;
    },
    closeSideSection: (state) => {
      state.isSideSectionOpen = false;
    },
    toggleSideSection: (state) => {
      state.isSideSectionOpen = !state.isSideSectionOpen;
    },
    openMobileMenu: (state) => {
      state.isMobileMenuOpen = true;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setSideSectionType: (state, action: PayloadAction<'chat' | 'search' | 'history'>) => {
      state.sideSectionType = action.payload;
    },
    setMobileMenuType: (state, action: PayloadAction<'chat' | 'search' | 'history'>) => {
      state.mobileMenuType = action.payload;
    },
  },
});

export const {
  initializeTheme,
  setTheme,
  toggleTheme,
} = uiSlice.actions;

export default uiSlice.reducer;