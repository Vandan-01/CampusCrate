import "./Login.css"
import logo from "../../assets/logos/campuscrate-logo.png"
import { FcGoogle } from "react-icons/fc"
import { HiArrowRight, HiMagnifyingGlass, HiShieldCheck } from "react-icons/hi2"
import { useState } from "react"

function Login() {
  const [oauthError, setOauthError] = useState("")
  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "")
    if (!apiUrl) {
      setOauthError("Google sign-in is not configured for this deployment. Please contact the CampusCrate administrator.")
      return
    }
    window.location.assign(`${apiUrl}/auth/google`)
  }

  return (
    <main className="login-page">

      <section className="login-story">

        <div className="login-wordmark"><img src={logo} alt="" /><span>Campus<span>Crate</span></span></div>
        <div className="login-story__copy"><p>THE CAMPUS ARCHIVE</p><h1>Good things<br />find their way <em>back.</em></h1><span>LOST / FOUND / RETURNED</span></div><div className="login-object"><HiMagnifyingGlass /><i /></div>
      </section>

      <section className="login-panel"><div className="login-panel__content">

        <img src={logo} alt="CampusCrate" className="login-mobile-logo" />
        <p className="eyebrow">Welcome to CampusCrate</p><h2>One place for the things that matter.</h2>

        <p className="sub">
          Sign in with your campus Google account to report, search, and reconnect belongings with their people.
        </p>

        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={22} />
          Continue with Google <HiArrowRight />
        </button>

        {oauthError && <p className="login-oauth-error" role="alert">{oauthError}</p>}

        <div className="login-assurance"><HiShieldCheck /><p>Your account is protected by Google sign-in and CampusCrate’s community moderation.</p></div>

        <p className="copyright">
          © 2026 CampusCrate · A kinder campus, one returned item at a time.
        </p>

      </div></section>

    </main>
  )
}

export default Login
