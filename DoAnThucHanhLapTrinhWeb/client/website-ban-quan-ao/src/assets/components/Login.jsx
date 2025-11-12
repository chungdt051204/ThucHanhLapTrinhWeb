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
        alert("Sai thông tin đăng nhập");
      });
  };
  return (
    <>
      <section>
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                ref={email}
                placeholder=" "
                onChange={() => setLoginNotValid("")}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div>
              <input
                type="password"
                name="password"
                ref={password}
                placeholder=" "
                onChange={() => setLoginNotValid("")}
              />
              <label htmlFor="password">Password</label>
            </div>
            {loginNotValid && <span>{loginNotValid}</span>}
            <button>Login</button>
          </form>
          <p>
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </div>
      </section>
    </>
  );
}
