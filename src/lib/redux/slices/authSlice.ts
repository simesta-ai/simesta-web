/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS, ENVIRONMENT_VARIABLES, STORAGE_KEYS } from '../../constants';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  authToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  authToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  '/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ENVIRONMENT_VARIABLES.API.BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
        email,
        password,
      });

      // get tokens from header
      const authToken = response.headers['authorization'];
      const refreshToken = response.headers['refresh-token'];

      
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken as string);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken as string);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.data));


      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, "usdhsdsu8udnua");
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, "response.data.refreshToken");
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ email: "samuel.blatchford@altostrat.com", name: "Samuel Blatchford", id: "1" }));
      
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to login. Please try again.'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  '/register',
  async (
    { name, email, password }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${ENVIRONMENT_VARIABLES.API.BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`, {
        email,
        password,
        name,
      });

      // get tokens from header
      const authToken = response.headers['authorization'];
      const refreshToken = response.headers['refresh-token'];
      
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken as string);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken as string);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.data));
      
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to register. Please try again.'
      );
    }
  }
);

export const logoutUser = createAsyncThunk('/logout', async (_, { rejectWithValue }) => {
  try {
    // Call the logout API endpoint with the tokens in the header
    const response = await axios.post(`${ENVIRONMENT_VARIABLES.API.BASE_URL}${API_ENDPOINTS.AUTH.LOGOUT}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)}`,
        'Refresh-Token': localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
      },
    });
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    return response.data.success;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to logout. Please try again.'
    );
  }
});

export const refreshTokens = createAsyncThunk(
  '/refresh-token',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState() as { auth: AuthState };
    
    if (!auth.refreshToken) {
      return rejectWithValue('No refresh token available');
    }
    
    try {
      const response = await axios.post(`${ENVIRONMENT_VARIABLES.API.BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, {
        refresh_token: auth.refreshToken,
      });

      // Get tokens from header
      const authToken = response.headers['authorization'];
      const refreshToken = response.headers['refresh-token'];
      
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken as string);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken as string);
      
      return response.data.success;
    } catch (error: any) {
      // If refresh fails, log the user out
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      
      return rejectWithValue(
        error.response?.data?.message || 'Session expired. Please login again.'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Initialize auth state from localStorage (for persistence)
    initializeAuth: (state) => {
      const authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      const userString = localStorage.getItem(STORAGE_KEYS.USER);
      
      if (authToken && refreshToken && userString) {
        state.authToken = authToken;
        state.refreshToken = refreshToken;
        state.user = JSON.parse(userString);
        state.isAuthenticated = true;
      }
    },
    // Clear any error messages
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.authToken = action.payload.authToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.authToken = action.payload.authToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    
    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.authToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    });
    
    // Refresh Token
    builder.addCase(refreshTokens.fulfilled, (state, action) => {
      state.authToken = action.payload.authToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(refreshTokens.rejected, (state) => {
      state.user = null;
      state.authToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    });
  },
});

export const { initializeAuth, clearError } = authSlice.actions;

export default authSlice.reducer;