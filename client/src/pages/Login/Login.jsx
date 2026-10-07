import "./Login.css"
import logo from "../../assets/logos/campuscrate-logo.png"
import { FcGoogle } from "react-icons/fc"

function Login() {
  return (
    <div className="login-page">

      <div className="login-left">

        <img src={logo} alt="CampusCrate" className="logo-img" />

        <h1>CampusCrate</h1>

        <p className="tagline">
          Lost & Found System
          <br />
          for College
        </p>

        <div className="features">

          <p>🔒 Secure college email login</p>

          <p>🛡️ Your data is safe with us</p>

          <p>✅ Trusted by students & admins</p>

        </div>

      </div>

      <div className="login-right">

        <h2>Welcome Back!</h2>

        <p className="sub">
          Continue to CampusCrate
        </p>


        <button className="google-btn">
          <FcGoogle size={22} />
          Sign in with Google
        </button>

        <p className="email-note">
          Only @college.edu accounts
          <br />
          are allowed
        </p>

        <p className="copyright">
          © 2026 CampusCrate
        </p>

      </div>

    </div>
  )
}

export default Login