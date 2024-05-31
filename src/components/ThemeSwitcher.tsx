import { getTheme, setTheme } from "@/actions/theme";
import { MoonIcon, SunIcon } from "lucide-react";

export default async function ThemeSwitcher() {
  const currentTheme = await getTheme();
  const targetTheme = currentTheme === "dark" ? "light" : "dark";

  return (
    <form action={setTheme}>
      <button>
        {targetTheme === "dark" && <MoonIcon />}
        {targetTheme === "light" && <SunIcon />}
      </button>

      <input type="hidden" name="theme" value={targetTheme} />
    </form>
  );
}
