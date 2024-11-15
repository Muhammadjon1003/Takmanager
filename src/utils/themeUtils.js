export const saveThemeToLocalStorage = (isDark) => {
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

export const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme');
  return theme === 'dark';
}; 