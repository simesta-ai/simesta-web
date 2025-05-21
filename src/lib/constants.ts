import blackAccentLogo from "@/assets/simesta-rebranded-black.svg";
import whiteAccentLogo from "@/assets/simesta-rebranded-white.svg";
import backgroundImage from "@/assets/bg-min.png";
import visualLm from "@/assets/visual-lm.png";
import readWriteLm from "@/assets/read-write-lm.png";
import auralLm from "@/assets/aural-lm.png";

export const ENVIRONMENT_VARIABLES = {
  API: {
    BASE_URL: process.env.API_BASE_URL,
  },
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
};

export const IMAGES = {
  LOGO: {
    BLACK: blackAccentLogo,
    WHITE: whiteAccentLogo,
  },
  BACKGROUND: {
    OVERLAY: backgroundImage,
  },
  LEARNING_METHODS: {
    VISUAL: visualLm,
    READ_WRITE: readWriteLm,
    AURAL: auralLm,
  }
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "simesta:auth:token",
  REFRESH_TOKEN: "simesta:auth:refresh",
  USER: "simesta:auth:user",
  THEME: "simesta:theme",
};

