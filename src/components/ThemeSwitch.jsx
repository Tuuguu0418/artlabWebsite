"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeSwitch({ iconSize }) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <FiSun className="text-xl" />;

  if (resolvedTheme == "dark") {
    return <FiSun size={iconSize} onClick={() => setTheme("light")} />;
  }

  if (resolvedTheme == "light") {
    return <FiMoon size={iconSize} onClick={() => setTheme("dark")} />;
  }
}
