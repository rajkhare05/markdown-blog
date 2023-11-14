import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home, { homeLoader } from "./pages/Home"
import Post, { postLoader } from "./pages/Post"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import CreatePost from "./pages/CreatePost"
import RootLayout from "./layouts/RootLayout"
import Sign from "./layouts/SignLayout"
import { useEffect, useState } from "react"
import LoginContext from "./contexts/LoginContext"
import TokenContext from "./contexts/TokenContext"

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path = "/" element = { <RootLayout /> }>
      <Route index element = { <Home /> } loader = { homeLoader } />
      <Route path = "post/:id" element = { <Post /> } loader = { postLoader } />
      <Route path = "post/new" element = { <CreatePost/> } />
      <Route path = "signup" element = { <SignUp /> } />
      <Route path = "signin" element = { <SignIn /> } />
    </Route>,
    <Route path = "/s" element = { <Sign /> } >
    </Route>
  ])
)

async function generateNewAccessToken(refreshToken) {
    try {
        const res = await fetch("http://localhost:4000/token", {
            method: "POST",
            body: JSON.stringify({
                refreshToken: refreshToken
            })
        })
        const data = await res.json()
        return data.accessToken

    } catch (err) {
        console.error(err);
        return null;
    }
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')

/*
  useEffect(() => {
    const newAccessToken = refreshToken != null && refreshToken !== '' ? generateNewAccessToken(refreshToken) : null
    if (newAccessToken != null)
        setAccessToken(newAccessToken)
    console.log(newAccessToken)
  }, [refreshToken])
*/

  return (
      <LoginContext.Provider value = {{ loggedIn, setLoggedIn }}>
        <TokenContext.Provider value = {{ accessToken, setAccessToken, refreshToken, setRefreshToken }}>
            { accessToken != null && <RouterProvider router = { router } /> }
        </TokenContext.Provider>
      </LoginContext.Provider>
  )
}

export default App

