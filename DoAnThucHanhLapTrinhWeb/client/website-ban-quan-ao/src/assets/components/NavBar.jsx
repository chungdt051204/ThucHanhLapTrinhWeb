import { useContext, useState } from "react";
import AppContext from "./AppContext";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "./logo.png";
import { useRef } from "react";
export default function NavBar() {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(AppContext);
  const inputRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState([]);
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
              <p>HOME</p>
            </Link>
          </li>
          <li>
            <Link to="/womenProduct-page">
              <p>WOMEN'S</p>
            </Link>
          </li>
          <li>
            <Link to="/menProduct-page">
              <p>MEN'S</p>
            </Link>
          </li>
          <li>
            <Link to="/kidProduct-page">
              <p>KID'S</p>
            </Link>
          </li>
          <li>
            <Link to="/accessoryProduct-page">
              <p>ACCESSORIES</p>
            </Link>
          </li>
          <li>
            <Link to="/cosmeticsProduct-page">
              <p>COSMETIC</p>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link>
              <div className="input">
                <input type="text" ref={inputRef} onChange={handleChange} />
                <div>
                  {searchValue != "" && (
                    <div className="searchSuggestion-track">
                      {searchSuggestion.length > 0 &&
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
                        })}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </li>
          <li>
            {isLogin ? (
              <Link>
                <p onClick={handleLogout}>LOGOUT</p>
              </Link>
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
                isLogin ? navigate("/cart") : alert("Bạn chưa đăng nhập");
              }}
              className="fa-solid fa-cart-shopping"
            ></i>
          </li>
        </ul>
      </nav>
    </>
  );
}
