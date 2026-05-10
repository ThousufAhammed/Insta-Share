import {useState} from 'react'
import Cookies from 'js-cookie'
import {Navigate, useNavigate} from 'react-router-dom'
import {cookieName, images} from '../../utils/constants.js'
import {getJwtToken, loginUser} from '../../utils/api.js'
import {demoCredentials} from '../../utils/mockApi.js'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  if (getJwtToken()) {
    return <Navigate to="/" replace />
  }

  const onSubmit = async event => {
    event.preventDefault()
    setErrorMsg('')
    setIsSubmitting(true)
    try {
      const data = await loginUser({username, password})
      Cookies.set(cookieName, data.jwt_token, {expires: 30})
      navigate('/', {replace: true})
    } catch (error) {
      setErrorMsg(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fillDemoAccount = () => {
    setUsername(demoCredentials.username)
    setPassword(demoCredentials.password)
    setErrorMsg('')
  }

  return (
    <main className="login-page">
      <section className="login-hero">
        <img src={images.login} alt="website login" className="login-illustration" />
      </section>
      <form className="login-card" onSubmit={onSubmit}>
        <div className="app-logo login-logo" role="img" aria-label="website logo">
          Insta Share
        </div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
          placeholder="Enter username"
          autoComplete="username"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="Enter password"
          autoComplete="current-password"
        />
        {errorMsg && <p className="form-error">*{errorMsg}</p>}
        <button type="submit" className="primary-button wide-button" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        <button type="button" className="demo-button wide-button" onClick={fillDemoAccount}>
          Use demo account
        </button>
        <p className="demo-hint">Demo credentials: demo / demo123</p>
      </form>
    </main>
  )
}

export default LoginForm
