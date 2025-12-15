import { useContext, useState } from "react";
import AppContext from "./AppContext";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "./logo.png";
export default function NavBar() {
  const navigate = useNavigate();
  const { user, isLogin, setIsLogin } = useContext(AppContext);
  const avatar =
    user.avatar && user.avatar.includes("https")
      ? user.avatar
      : `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/images/user/${user.avatar}`;
  const [isClicked, setIsClicked] = useState(false);
  const handleLogout = () => {
    setIsLogin(false);
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/user/logout.php",
      {
        method: "DELETE",
        credentials: "include",
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(({ message }) => {
        alert(message);
        navigate("/");
      })
      .catch();
  };
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/admin">
              <img src={logo} alt="" />
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/admin">
              <p>DASHBOARD</p>
            </Link>
          </li>
          <li>
            <Link to="/admin/category">
              <p>QUẢN LÝ LOẠI</p>
            </Link>
          </li>
          <li>
            <Link to="/admin/product">
              <p>QUẢN LÝ SẢN PHẨM</p>
            </Link>
          </li>
          <li>
            <Link to="/admin/user">
              <p>QUẢN LÝ NGƯỜI DÙNG</p>
            </Link>
          </li>
          <li>
            <Link to="/admin/order">
              <p>QUẢN LÝ ĐƠN HÀNG</p>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            {isLogin ? (
              <div className="user-dropdown">
                <div className="user-dropdown-item">
                  <img
                    onClick={() => setIsClicked((prev) => !prev)}
                    src={avatar}
                    alt="avatar"
                    width={50}
                    height={50}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                  {isClicked ? (
                    <div>
                      <i class="fa-solid fa-angle-up"></i>
                    </div>
                  ) : (
                    <i class="fa-solid fa-angle-down"></i>
                  )}
                </div>
                {isClicked && (
                  <div className="user-dropdown-menu">
                    <Link to="/user-info">
                      <p>USER INFO</p>
                    </Link>
                    <p onClick={handleLogout}>LOGOUT</p>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <p>LOGIN</p>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
