
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {

  const theme = ref('light');

  function setTheme(newTheme: 'light' | 'dark' | 'color') {
    theme.value = newTheme;
  }


  return { theme, setTheme };
});
