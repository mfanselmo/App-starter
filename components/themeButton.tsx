"use client";

import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <SunMoon
      role="button"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    />
  );
};

export default ThemeButton;
