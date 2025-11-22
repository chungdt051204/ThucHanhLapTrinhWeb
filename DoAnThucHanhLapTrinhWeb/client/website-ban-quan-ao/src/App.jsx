import { Routes, Route } from "react-router-dom";
import AppContext from "./assets/components/AppContext";
import Home from "./assets/components/Home";
import Login from "./assets/components/Login";
import { useEffect, useState } from "react";
import Detail from "./assets/components/Detail";
import Register from "./assets/components/Register";
import GetAllProducts from "./assets/components/GetAllProducts";
import GetWomenProducts from "./assets/components/GetWomenProducts";
import GetMenProducts from "./assets/components/GetMenProducts";
import GetKidProducts from "./assets/components/GetKidProducts";
import GetAccessoriesProducts from "./assets/components/GetAccessoriesProducts";
import ProductsPage from "./assets/components/ProductsPage";
function App() {
  const [user, setUser] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);
  const [menProducts, setMenProducts] = useState([]);
  const [kidProducts, setKidProducts] = useState([]);
  const [accessoriesProducts, setAccessoriesProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/server/me.php", {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setIsLogin(true);
      })
      .catch();
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/server/model/getCategories.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCategories(data);
      });
  }, []);
  useEffect(() => {
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/model/getAllProducts.php"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      });
  }, []);
  useEffect(() => {
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/model/getWomenProducts.php"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWomenProducts(data);
      });
  }, []);
  useEffect(() => {
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/model/getMenProducts.php"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMenProducts(data);
      });
  }, []);
  useEffect(() => {
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/model/getKidProducts.php"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setKidProducts(data);
      });
  }, []);
  useEffect(() => {
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/model/getAccessoriesProducts.php"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAccessoriesProducts(data);
      });
  }, []);
  return (
    <>
      <AppContext.Provider
        value={{
          user,
          isLogin,
          setIsLogin,
          products,
          categories,
          womenProducts,
          menProducts,
          kidProducts,
          accessoriesProducts,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={<Home component={<GetAllProducts />}></Home>}
          />
          <Route
            path="/women-product"
            element={<Home component={<GetWomenProducts />}></Home>}
          />
          <Route
            path="/men-product"
            element={<Home component={<GetMenProducts />}></Home>}
          />
          <Route
            path="/kid-product"
            element={<Home component={<GetKidProducts />}></Home>}
          />
          <Route
            path="/accessories-product"
            element={<Home component={<GetAccessoriesProducts />}></Home>}
          />
          <Route
            path="/womenProduct-page"
            element={
              <ProductsPage component={<GetWomenProducts />}></ProductsPage>
            }
          />
          <Route
            path="/menProduct-page"
            element={
              <ProductsPage component={<GetMenProducts />}></ProductsPage>
            }
          />
          <Route
            path="/kidProduct-page"
            element={
              <ProductsPage component={<GetKidProducts />}></ProductsPage>
            }
          />
          <Route
            path="/accessoryProduct-page"
            element={
              <ProductsPage
                component={<GetAccessoriesProducts />}
              ></ProductsPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
