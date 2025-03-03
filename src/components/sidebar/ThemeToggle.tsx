import React from 'react';
import { WbSunny, DarkMode} from "@mui/icons-material";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg transition-colors duration-200
        dark:bg-gray-600 dark:hover:bg-gray-900
        bg-gray-500 hover:bg-gray-700"
    >
      {isDark ? (
        <WbSunny  className="text-yellow-400" />
      ) : (
        <DarkMode className="text-white" />
      )}
    </button>
  );
};

export default ThemeToggle;