import { NavLink } from "react-router-dom"
import "../styles/navbar.css"

function Navbar() {

    return (
        <div className="navbar">
            <div id="navbar-main-tab">
                <NavLink to="/" className="navbar-tab" id="home">Home</NavLink>
                <NavLink to="top" className="navbar-tab" id="top">Top</NavLink>
                <NavLink to="latest" className="navbar-tab" id="latest">Latest</NavLink>
                <NavLink to="pricing" className="navbar-tab" id="pricing">Pricing</NavLink>
                <NavLink to="about" className="navbar-tab" id="about">About</NavLink>
            </div>
            <div id="navbar-profile-tab">
                <NavLink to="s/signup" className="navbar-tab">Sign Up</NavLink>
                <NavLink to="s/signin" className="navbar-tab">Sign In</NavLink>
            </div>
        </div>
    )
}

export default Navbar
