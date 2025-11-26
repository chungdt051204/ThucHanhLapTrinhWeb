import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react"; // 👈 Cần import useEffect
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [loginNotValid, setLoginNotValid] = useState("");
  const email = useRef();
  const password = useRef();

  // 1. Hàm xử lý phản hồi từ Google sau khi người dùng đăng nhập
  const handleCredentialResponse = (response) => {
    // Lấy ID Token (JSON Web Token) từ phản hồi của Google
    const idToken = response.credential;
    
    // Gửi ID Token này đến Server PHP của bạn để xác minh
    fetch("http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/user/google_login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Gửi token dưới dạng body JSON
      body: JSON.stringify({ id_token: idToken }),
      credentials: "include", // Quan trọng để Server tạo và gửi cookie/session
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(({ message }) => {
        alert(message);
        navigate("/"); // Chuyển hướng sau khi đăng nhập thành công
      })
      .catch((error) => {
        console.error("Lỗi đăng nhập Google:", error);
        setLoginNotValid("Đăng nhập Google thất bại.");
      });
  };

  // 2. Khởi tạo Google Sign-In khi component được tải
  useEffect(() => {
    // Kiểm tra window.google đã tải từ index.html chưa
    if (window.google) {
      window.google.accounts.id.initialize({
        // Dùng Client ID bạn đã lấy từ Google Cloud
        client_id: "790521733798-ukk6t9ok55hgp1sp0843j5ntjrcgevj1.apps.googleusercontent.com", 
        callback: handleCredentialResponse, // Gán hàm xử lý token
      });
      
      // Render (vẽ) nút Sign-In của Google vào div có id="google-signin-button"
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large", type: "standard", width: "100%" } // Tùy chỉnh kiểu nút
      );
    }
  }, []); 

  // Xử lý đăng nhập email/password (logic hiện tại của bạn)
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
        setLoginNotValid("Sai thông tin đăng nhập.");
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

             {/* 3. THÊM DIV NÀY: Nơi nút Google Sign-In sẽ được hiển thị */}
            <div id="google-signin-button" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }} ></div>

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