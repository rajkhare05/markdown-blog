import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import LoginContext from '../contexts/LoginContext'
import TokenContext from '../contexts/TokenContext'

const theme = createTheme()

async function sendSignInForm(data) {
    const res = await axios.post('http://localhost:4000/signin', data)
    return res.data
}

export default function SignIn() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const { setLoggedIn } = useContext(LoginContext)
  const { setAccessToken, setRefreshToken } = useContext(TokenContext)

  async function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const payload = {
        email: data.get('email'),
        password: data.get('password')
    }
    try {
        const data = await sendSignInForm(payload)
        setLoggedIn(true)
        setRefreshToken(data.refreshToken)
        setAccessToken(data.accessToken)
        navigate("/")

    } catch (err) {
        if (err.request.status === 400)
            console.log(err.response.data.message)
        setMessage(err.response.data.message)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            { message.length > 0 ? <div className = "signin-message" style = {{ color: "red" }}>{ message } <br /></div>: "" }
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
