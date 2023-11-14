import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import "../styles/sidebar.css"
import { useState } from "react"

function Sidebar() {

    const [theme, setTheme] = useState("light")

    const themeHandler = () => {
        const theme = { dark: "dark-theme", light: "light-theme" }
        const root = document.getElementById("root")

        if (root.classList.contains(theme["light"])) {
            root.classList.remove(theme["light"])
            root.classList.add(theme["dark"])
            setTheme("dark")

        } else {
            root.classList.remove(theme["dark"])
            root.classList.add(theme["light"])
            setTheme("light")
        }
    }

    return (
        <div className = "sidebar">
            <div className = "tab" id = "home-tb"> Home </div>
            <div className = "tab" id = "create-tb"> Popular </div>
            <div className = "tab" id = "signin-tb"> About </div>
            <div className = "tab" id = "signup-tb"> Contact </div>
            <button className = "tab" onClick = { themeHandler }> 
                { 
                    theme === "light" ? <DarkModeIcon fontSize = "large" /> : <LightModeIcon fontSize = "large" /> 
                }
            </button>
        </div>
    )
}

export default Sidebar

