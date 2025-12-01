import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "./Auth.css";
export default function Register() {
  const navigate = useNavigate();
  const [fullNameNotValid, setFullNameNotValid] = useState();
  const [usernameNotValid, setUsernameNotValid] = useState();
  const [emailNotValid, setEmailNotValid] = useState();
  const [passwordNotValid, setPasswordNotValid] = useState();
  const [verifyPasswordNotValid, setVerifyPasswordNotValid] = useState();
  const [phoneNotValid, setPhoneNotValid] = useState();
  const [avatarNotValid, setAvatarNotValid] = useState();
  const fullName = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const avatar = useRef();
  const phone = useRef();
  const male = useRef();
  const female = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName.current.value);
    formData.append("username", username.current.value);
    formData.append("email", email.current.value);
    formData.append("password", password.current.value);
    formData.append("avatar", avatar.current.files[0]);
    formData.append("phone", phone.current.value);
    const gender = male.current.checked
      ? male.current.value
      : female.current.value;
    formData.append("gender", gender);
    const data = Object.fromEntries(formData.entries());
    console.log("Dữ liệu form:", data);
    if (fullName.current.value === "") {
      setFullNameNotValid("Họ tên không được bỏ trống");
      return;
    } else if (
      username.current.value === "" ||
      username.current.value.trim().length < 5
    ) {
      setUsernameNotValid("Tên đăng nhập phải có tối thiểu 5 ký tự");
      return;
    } else if (!email.current.value.includes("@")) {
      setEmailNotValid("Vui lòng điền email hợp lệ");
      return;
    } else if (
      password.current.value.length < 8 ||
      password.current.value === username.current.value
    ) {
      setPasswordNotValid(
        "Mật khẩu phải có đủ 8 ký tự và không được trùng với tên đăng nhập"
      );
      return;
    } else if (verifyPassword.current.value !== password.current.value) {
      setVerifyPasswordNotValid("Mật khẩu không khớp");
      return;
    } else if (phone.current.value.length < 10) {
      setPhoneNotValid("Số điện thoại hợp lệ phải có đủ 10 số");
      return;
    } else if (!avatar.current.files[0]) {
      setAvatarNotValid("Bạn chưa chọn tệp");
      return;
    } else {
      fetch(
        "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/user/register.php",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => {
          if (res.ok) return res.json();
          throw res;
        })
        .then((data) => {
          alert(data);
          navigate("/login");
        })
        .catch(async (error) => {
          const { message } = await error.json();
          setAvatarNotValid(message);
        });
    }
  };
  return (
    <>
      <section className="auth-section">
        <div className="auth-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <input
                type="text"
                name="fullName"
                ref={fullName}
                placeholder=" "
                onChange={() => setFullNameNotValid("")}
                className="input-field"
              />
              <label htmlFor="fullName" className="input-label">
                Full name
              </label>
            </div>
            {fullNameNotValid && (
              <span className="error-message">{fullNameNotValid}</span>
            )}
            <div className="input-group">
              <input
                type="text"
                name="username"
                ref={username}
                placeholder=" "
                onChange={() => setUsernameNotValid("")}
                className="input-field"
              />
              <label htmlFor="username" className="input-label">
                Username
              </label>
            </div>
            {usernameNotValid && (
              <span className="error-message">{usernameNotValid}</span>
            )}
            <div className="input-group">
              <input
                type="text"
                name="email"
                ref={email}
                placeholder=" "
                onChange={() => setEmailNotValid("")}
                className="input-field"
              />
              <label htmlFor="email" className="input-label">
                Email
              </label>
            </div>
            {emailNotValid && (
              <span className="error-message">{emailNotValid}</span>
            )}
            <div className="input-group">
              <input
                type="password"
                name="password"
                ref={password}
                placeholder=" "
                onChange={() => setPasswordNotValid("")}
                className="input-field"
              />
              <label htmlFor="password" className="input-label">
                Password
              </label>
            </div>
            {passwordNotValid && (
              <span className="error-message">{passwordNotValid}</span>
            )}
            <div className="input-group">
              <input
                type="password"
                name="verifyPassword"
                ref={verifyPassword}
                placeholder=" "
                onChange={() => setVerifyPasswordNotValid("")}
                className="input-field"
              />
              <label
                htmlFor="verifyPassword"
                className="input-label input-label-verifyPassword"
              >
                Verify Password
              </label>
            </div>
            {verifyPasswordNotValid && (
              <span className="error-message">{verifyPasswordNotValid}</span>
            )}
            <div className="input-group">
              <input
                type="text"
                name="phone"
                ref={phone}
                placeholder=" "
                onChange={() => setPhoneNotValid("")}
                className="input-field"
              />
              <label htmlFor="phone" className="input-label">
                Phone
              </label>
            </div>
            {phoneNotValid && (
              <span className="error-message">{phoneNotValid}</span>
            )}
            <div className="gender-group">
              <label htmlFor="gender" className="gender-label">
                Gender:
              </label>
              <div className="gender-options">
                <label className="gender-option">
                  <input type="radio" name="gender" ref={male} value="nam" />
                  <span>Nam</span>
                </label>
                <label className="gender-option">
                  <input type="radio" name="gender" ref={female} value="nữ" />
                  <span>Nữ</span>
                </label>
              </div>
            </div>
            <input type="file" name="avatar" ref={avatar} /> <br />
            {avatarNotValid && (
              <span className="error-message">{avatarNotValid}</span>
            )}
            <button className="auth-button register ">Đăng ký</button>
          </form>
        </div>
      </section>
    </>
  );
}
