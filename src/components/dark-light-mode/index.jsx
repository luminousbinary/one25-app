import UseLocalStorage from "./useLocalStorage";

import "./dark-light.css";

export default function DarkLightMode() {
  const [theme, setTheme] = UseLocalStorage("theme", "dark");

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  console.log(theme);
  return (
    <div className="dark-light-mode" data-theme={theme}>
      <div>dark liht mode</div>

      <h1>The World</h1>
      <button onClick={handleToggleTheme}>Change theme</button>
    </div>
  );
  orex 
}
