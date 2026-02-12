import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const ADMIN_EMAILS = ["hema2005kannan@gmail.com"];

  const handleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const role = ADMIN_EMAILS.includes(decoded.email)
        ? "admin"
        : "user";

      const userData = {
        name: decoded.name,
        email: decoded.email,
        role: role,
      };

      login(userData);

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
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Smart Task Dependency Resolver</h1>
        <p style={styles.subtitle}>
          Organize, Prioritize and Execute Tasks Efficiently
        </p>

        <div style={{ marginTop: "30px" }}>
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>

        <p style={styles.footerText}>
          Secure login powered by Google
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0061A2, #E3F1FF)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "white",
    padding: "50px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "400px",
  },
  title: {
    color: "#0061A2",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#555",
    fontSize: "14px",
  },
  footerText: {
    marginTop: "25px",
    fontSize: "12px",
    color: "#888",
  },
};

export default Login;
