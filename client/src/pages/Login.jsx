import "./Login.css";

export default function Login() {

    const googleLogin = () => {

        window.location.href = "http://localhost:5000/api/auth/google";

    }

    return (

        <div className="login">

            <div className="card">

                <h1>CampusCrate</h1>

                <p>

                    Lost & Found Portal

                </p>

                <button onClick={googleLogin}>

                    Continue with Google

                </button>

            </div>

        </div>

    )

}