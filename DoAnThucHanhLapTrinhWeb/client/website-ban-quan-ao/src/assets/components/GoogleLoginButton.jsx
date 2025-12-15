import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
const GOOGLE_CLIENT_ID =
  "479773514232-gn1q883tk2berunr0irpomrm96burot9.apps.googleusercontent.com";
//Thay bằng GOOGLE_CLIENT_ID của bạn
export default function GoogleLoginButton() {
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  // Hàm xử lý phản hồi thành công
  const handleCredentialResponse = (response) => {
    const idToken = response.credential;
    fetch("http://localhost:3000/server/google_login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_token: idToken }),
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        alert(data);
        navigate("/");
      })
      .catch((error) => {});
  };
  useEffect(() => {
    // Kiểm tra xem thư viện GIS đã được tải chưa
    if (window.google) {
      // 1. Khởi tạo Google Identity Services
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse, // Truyền hàm callback của React
        auto_select: false,
      });
      // 2. Render nút Đăng nhập tại vị trí được tham chiếu
      if (buttonRef.current) {
        window.google.accounts.id.renderButton(
          buttonRef.current, // Element HTML để render nút
          {
            theme: "outline",
            size: "large",
            type: "standard",
            shape: "pill",
            text: "signin_with",
          }
        );
      }
      console.log("Google Sign-In button rendered.");
    } else {
      console.warn(
        "Google Identity Services script chưa được tải. Đảm bảo bạn đã thêm thẻ script vào public/index.html."
      );
    }
  });
  return (
    <>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div ref={buttonRef} />
      </div>
    </>
  );
}
