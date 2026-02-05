import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [dark, setDark] = useState<boolean>(
    () =>
      (localStorage.getItem("theme") ?? (prefersDark ? "dark" : "light")) ===
      "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
};

export default DarkModeToggle;
