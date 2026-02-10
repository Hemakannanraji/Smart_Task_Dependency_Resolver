import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Admin email list
  const ADMIN_EMAILS = ["hema2005kannan@gmail.com"];

  const handleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      // ✅ Decide role
      const role = ADMIN_EMAILS.includes(decoded.email)
        ? "admin"
        : "user";

      const userData = {
        name: decoded.name,
        email: decoded.email,
        role: role,
      };

      // ✅ Save user in context + localStorage
      login(userData);

      // ✅ Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleError = () => {
    console.log("Google Login Failed");
  };

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Login with Google</h2>

      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}

export default Login;
