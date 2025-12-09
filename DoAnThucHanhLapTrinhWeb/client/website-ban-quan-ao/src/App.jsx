import { Routes, Route } from "react-router-dom";
import AppContext from "./assets/components/AppContext";
import Home from "./assets/components/Home";
import HomeAdmin from "./assets/components/HomeAdmin";
import Login from "./assets/components/Login";
import { useEffect, useState } from "react";
import Detail from "./assets/components/Detail";
import Register from "./assets/components/Register";
import GetProductsPage2 from "./assets/components/GetProductsPage2";
import Cart from "./assets/components/Cart";
import UserInfo from "./assets/components/UserInfo";
import QuanLyLoai from "./assets/components/QuanLyLoai";
import QuanLyNguoiDung from "./assets/components/QuanLyNguoiDung";
import GetProductsWithQueryString from "./assets/components/GetProductsWithQueryString";
function App() {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsPage2, setProductsPage2] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/user/me.php",
      {
        credentials: "include",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLogin(true);
        setUser(data);
      })
      .catch();
  }, []);
  useEffect(() => {
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/product/getCategories.php"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCategories(data);
      });
  }, [refresh]);
  useEffect(() => {
    fetch("http://localhost:3000/server/product/getProducts.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      });
  }, []);
  useEffect(() => {
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/product/getProductsPage2.php"
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        setProductsPage2(data);
      })
      .catch();
  }, []);
  return (
    <>
      <AppContext.Provider
        value={{
          user,
          setUser,
          isLogin,
          setIsLogin,
          products,
          productsPage2,
          categories,
          setRefresh,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={<Home component={<GetProductsWithQueryString />}></Home>}
          />
          <Route
            path="/page2"
            element={<Home component={<GetProductsPage2 />}></Home>}
          />
          <Route path="/admin" element={<HomeAdmin></HomeAdmin>} />
          <Route path="/admin/category" element={<QuanLyLoai></QuanLyLoai>} />
          <Route path="/admin/user" element={<QuanLyNguoiDung></QuanLyNguoiDung>} />
          <Route path="/Cart" element={<Cart component={<Cart />}></Cart>} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/detail" element={<Detail />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
