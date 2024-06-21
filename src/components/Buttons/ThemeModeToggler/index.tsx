'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { MoonIcon } from './MoonIcon';
import { SunIcon } from './SunIcon';

type ThemeModeTogglerProps = {
  className?: string;
  onClick?: () => void;
};

export const ThemeModeToggler: React.FC<ThemeModeTogglerProps> = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme);
      if (storedTheme === 'dark') setIsDarkMode(true);
      else setIsDarkMode(false);
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      setTheme(systemTheme);
      localStorage.setItem('theme', systemTheme);
    }
  }, [setTheme]);

  const toggleColorMode = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(theme === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  const SwitchIcon = isDarkMode ? SunIcon : MoonIcon;
  // const SwitchIcon = isDarkMode ? MoonIcon : SunIcon;

  return (
    <button
      className={`
        flex items-center justify-center rounded-full p-2
        focus:outline-none focus:ring-2 focus:ring-transparent
        ${props.className || ''}
      `}
      onClick={props.onClick || toggleColorMode}
    >
      <SwitchIcon />
    </button>
  );
};
