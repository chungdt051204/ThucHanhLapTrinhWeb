import { Routes, Route } from "react-router-dom";
import AppContext from "./assets/components/AppContext";
import Home from "./assets/components/Home";
import HomeAdmin from "./assets/components/HomeAdmin";
import Login from "./assets/components/Login";
import { useEffect, useState } from "react";
import Detail from "./assets/components/Detail";
import Register from "./assets/components/Register";
import Cart from "./assets/components/Cart";
import UserInfo from "./assets/components/UserInfo";
import QuanLyLoai from "./assets/components/QuanLyLoai";
import QuanLyNguoiDung from "./assets/components/QuanLyNguoiDung";
import GetProductsWithQueryString from "./assets/components/GetProductsWithQueryString";
import QuanLySanPham from "./assets/components/QuanLySanPham";
import QuanLyDonHang from "./assets/components/QuanLyDonHang";
import MyOrders from "./assets/components/MyOrders";
import OrderItems from "./assets/components/OrderItems";
import UserNavBar from "./assets/components/UserNavbar";
import Footer from "./assets/components/Footer";
import ProductList from "./assets/components/ProductList";
import PriceFilter from "./assets/components/PriceFilter";
import Category from "./assets/components/Category";
import CategoryFilter from "./assets/components/CategoryFilter";
import Carousel from "./assets/components/Carousel";
import ProductWithSearchResult from "./assets/components/ProductWithSearchResult";
function App() {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [productsPage1, setProductsPage1] = useState([]);
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
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/product/getProducts.php"
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        setProductsPage1(data);
      })
      .catch();
  }, [refresh]);
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
  }, [refresh]);
  return (
    <>
      <AppContext.Provider
        value={{
          user,
          setUser,
          isLogin,
          setIsLogin,
          productsPage1,
          productsPage2,
          categories,
          refresh,
          setRefresh,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                category={<Category />}
                filter={<CategoryFilter />}
                component={<GetProductsWithQueryString />}
                carousel={<Carousel />}
              ></Home>
            }
          />
          <Route
            path="/page2"
            element={
              <Home
                category={<Category />}
                filter={<CategoryFilter />}
                component={<ProductList data={productsPage2} />}
                carousel={<Carousel />}
              ></Home>
            }
          />
          <Route
            path="/product-page"
            element={<Home component={<GetProductsWithQueryString />} />}
          />
          <Route
            path="/search"
            element={<Home component={<ProductWithSearchResult />} />}
          />
          <Route path="/product/detail" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/Cart" element={<Cart component={<Cart />}></Cart>} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route
            path="/my-order"
            element={<OrderItems component={<UserNavBar />} />}
          />
          <Route path="/admin" element={<HomeAdmin></HomeAdmin>} />
          <Route
            path="/admin/category"
            element={
              <HomeAdmin component={<QuanLyLoai></QuanLyLoai>}></HomeAdmin>
            }
          />
          <Route
            path="/admin/product"
            element={
              <HomeAdmin
                component={<QuanLySanPham data={productsPage1}></QuanLySanPham>}
              ></HomeAdmin>
            }
          />
          <Route
            path="/admin/product-page2"
            element={
              <HomeAdmin
                component={<QuanLySanPham data={productsPage2}></QuanLySanPham>}
              ></HomeAdmin>
            }
          />
          <Route
            path="/admin/user"
            element={
              <HomeAdmin
                component={<QuanLyNguoiDung></QuanLyNguoiDung>}
              ></HomeAdmin>
            }
          />
          <Route
            path="/admin/order"
            element={
              <HomeAdmin
                component={<QuanLyDonHang></QuanLyDonHang>}
              ></HomeAdmin>
            }
          />
          <Route
            path="/admin/order/order-item"
            element={
              <HomeAdmin component={<OrderItems></OrderItems>}></HomeAdmin>
            }
          />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
