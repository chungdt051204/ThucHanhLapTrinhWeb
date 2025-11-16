import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "./Auth.css";
export default function Login() {
  const navigate = useNavigate();
  const [loginNotValid, setLoginNotValid] = useState("");
  const email = useRef();
  const password = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email.current.value);
    formData.append("password", password.current.value);
    fetch("http://localhost:3000/server/login.php", {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(({ message }) => {
        alert(message);
        navigate("/");
      })
      .catch(() => {
        alert("Sai thông tin đăng nhập ");
      });
  };
  return (
    <>
      <section className="login-section">
        <div className="login-container">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="email"
                name="email"
                ref={email}
                placeholder=" "
                onChange={() => setLoginNotValid("")}
                className="input-field"
              />
              <label htmlFor="email" className="input-label">
                Email
              </label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                ref={password}
                placeholder=" "
                onChange={() => setLoginNotValid("")}
                className="input-field"
              />
              <label htmlFor="password" className="input-label">
                Password
              </label>
            </div>

            {loginNotValid && (
              <span className="error-message">{loginNotValid}</span>
            )}

            <button className="login-button">Login</button>
          </form>

          <p className="register-prompt">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="register-link">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
