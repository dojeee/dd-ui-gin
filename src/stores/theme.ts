
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {

  const theme = ref('light');

  function setTheme(newTheme: 'light' | 'dark') {
    console.log("修改了theme", newTheme)
    theme.value = newTheme;
  }


  return { theme, setTheme };
});
