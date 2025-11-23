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
    fetch("http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/user/login.php", {
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
        setLoginNotValid("Sai thông ");
      });
  };
  return (
    <>
      <section className="auth-section">
        <div className="auth-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="auth-form">
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

            <button className="auth-button">Login</button>
          </form>
          <p>
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </div>
      </section>
    </>
  );
}
