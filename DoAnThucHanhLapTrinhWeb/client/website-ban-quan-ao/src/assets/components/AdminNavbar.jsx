import { useContext, useState } from "react";
import AppContext from "./AppContext";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "./logo.png";
import { useRef } from "react";

export default function NavBar() {
  const navigate = useNavigate();
  const { user, isLogin, setIsLogin } = useContext(AppContext);
  const avatar =
    user.avatar && user.avatar.includes("https")
      ? user.avatar
      : `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/images/${user.avatar}`;

  const inputRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [count, setCount] = useState(0);
  const handleChange = () => {
    setSearchValue(inputRef.current.value);
    fetch(
      `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/product/getSearchSuggestions.php?name=${encodeURIComponent(
        inputRef.current.value
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchSuggestion(data);
      })
      .catch();
  };
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
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/">
              <p>DASKBOARD</p>
            </Link>
          </li>
          <li>
            <Link to="/admin/category">
              <p>QUẢN LÝ LOẠI</p>
            </Link>
          </li>
          <li>
            <Link to="/menProduct-page">
              <p>QUẢN LÝ SẢN PHẨM</p>
            </Link>
          </li>
          <li>
            <Link to="/kidProduct-page">
              <p>QUẢN LÝ NGƯỜI DÙNG</p>
            </Link>
          </li>
          <li>
            <Link to="/accessoryProduct-page">
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
                    onClick={() => setCount(count + 1)}
                    src={avatar}
                    alt="avatar"
                    width={50}
                    height={50}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                  {count % 2 == 0 ? (
                    <div>
                      <i class="fa-solid fa-angle-up"></i>
                    </div>
                  ) : (
                    <i class="fa-solid fa-angle-down"></i>
                  )}
                </div>
                {count % 2 != 0 && (
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
