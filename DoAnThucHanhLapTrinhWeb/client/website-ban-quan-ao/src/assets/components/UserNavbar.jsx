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
      : `http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/images/user/${user.avatar}`;
  const inputRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [count, setCount] = useState(0);
  const handleChange = () => {
    setSearchValue(inputRef.current.value);
    fetch(
      `http://localhost:3000/server/product/getProducts.php?name=${encodeURIComponent(
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
  const handleSearch = () => {
    navigate(`/search?name=${inputRef.current.value}`);
    setSearchValue("");
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
              <p>HOME</p>
            </Link>
          </li>
          <li>
            <Link to={`/product-page?category_id=1`}>
              <p>WOMEN'S</p>
            </Link>
          </li>
          <li>
            <Link to={`/product-page?category_id=2`}>
              <p>MEN'S</p>
            </Link>
          </li>
          <li>
            <Link to={`/product-page?category_id=3`}>
              <p>KID'S</p>
            </Link>
          </li>
          <li>
            <Link to={`/product-page?category_id=4`}>
              <p>ACCESSORIES</p>
            </Link>
          </li>
          <li>
            <Link to={`/product-page?category_id=5`}>
              <p>COSMETIC</p>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <div className="input">
              <input type="text" ref={inputRef} onChange={handleChange} />
              <button onClick={handleSearch}>Tìm</button>
              <div>
                {searchValue != "" && (
                  <div className="searchSuggestion-track">
                    {searchSuggestion.length > 0 ? (
                      searchSuggestion.map((value, index) => {
                        return (
                          <div key={index} className="searchSuggestion-item">
                            <img
                              src={value.image_url}
                              alt=""
                              width={80}
                              height={100}
                            />
                            <p>{value.name}</p>
                          </div>
                        );
                      })
                    ) : (
                      <p style={{ color: "red", fontSize: "14px" }}>
                        Không tìm thấy sản phẩm
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </li>
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
                    <Link to="/my-orders">
                      <p>MY ORDERS</p>
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
          <li>
            <Link>
              <i className="fa-regular fa-heart"></i>
            </Link>
          </li>
          <li>
            <i
              onClick={() => {
                if (isLogin) navigate("/cart");
                else {
                  alert("Bạn chưa đăng nhập");
                  navigate("/");
                }
              }}
              className="fa-solid fa-cart-shopping"
            ></i>
          </li>
        </ul>
      </nav>
    </>
  );
}
