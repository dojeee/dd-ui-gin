import { defineStore } from "pinia";
import { ref, watch } from "vue";

type Theme = "light" | "dark" | "color";

export const useThemeStore = defineStore("theme", () => {
  // 1. Initialize state from localStorage or default to 'color'
  const theme = ref<Theme>((localStorage.getItem("theme") as Theme) || "color");

  // 2. Create the setter function
  function setTheme(newTheme: Theme) {
    theme.value = newTheme;
  }

  // 3. Watch for changes and update localStorage
  watch(
    theme,
    (newTheme) => {
      localStorage.setItem("theme", newTheme);
    },
    { immediate: true }
  ); // immediate is not strictly necessary here but can be useful

  return { theme, setTheme };
});
