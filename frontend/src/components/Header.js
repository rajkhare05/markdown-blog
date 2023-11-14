import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
// import Box from "@mui/material/Box"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import LoginContext from "../contexts/LoginContext"
import "../styles/header.css"
import TokenContext from "../contexts/TokenContext"
import CreateIcon from '@mui/icons-material/Create';
import Stack from "@mui/material/Stack"

function Header() {
    
    const { loggedIn, setLoggedIn } = useContext(LoginContext)
    const { refreshToken, setAccessToken, setRefreshToken } = useContext(TokenContext)
    const navigate = useNavigate()

    const [anchorElUser, setAnchorElUser] = useState(null)

    const writeArticleHandler = () => {
        navigate('post/new')
    }
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = async (event) => {
        const option = event.target.innerText
        if (option === 'Sign Out') {
            await fetch('http://localhost:4000/signout', {
                method: 'DELETE',
                body: JSON.stringify({ refreshToken })
            })
            setLoggedIn(false)
            setRefreshToken(null)
            setAccessToken(null)
            window.location.reload()
        }
        setAnchorElUser(null)
    }

    const profileOptions = [ "Profile", "Settings", "Sign Out"]

    return (
        <header>
            <div className = "top-bar">
                <div id = "blog-title">
                    <NavLink to = "/"> MARKDOWN BLOG </NavLink>
                </div>

                {
                    ( loggedIn && ( 
                    <Stack direction = "row" spacing = {4}>
                        <Tooltip title="Write article">
                            <IconButton onClick={writeArticleHandler} sx={{ p: 0 }}>
                                <CreateIcon fontSize="medium" />
                            </IconButton>
                        </Tooltip> 
                        { /*<Box sx={{ flexGrow: 0 }}>*/}
                        <Tooltip title="Profile">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="https://api.multiavatar.com/skull.png" id = "profile-pic" />
                            </IconButton>
                        </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {profileOptions.map((option) => (
                            <MenuItem key={option} onClick={(e) => handleCloseUserMenu(e)}>
                                <Typography textAlign="center">{option}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                        {/* </Box> */}
                    </Stack>
                    ))
                    || <div className = "SignIn"> <NavLink to = {'signin'}>Sign In </NavLink> </div>
                }
            </div>
            <hr />
        </header>
    )
}

export default Header
