import { Routes, Route } from "react-router-dom";
import AppContext from "./assets/components/AppContext";
import Home from "./assets/components/Home";
import Login from "./assets/components/Login";
import { useEffect, useState } from "react";
import Detail from "./assets/components/Detail";
import Register from "./assets/components/Register";
import GetProductsPage1 from "./assets/components/GetProductsPage1";
import GetProductsPage2 from "./assets/components/GetProductsPage2";
import GetWomenProducts from "./assets/components/GetWomenProducts";
import GetMenProducts from "./assets/components/GetMenProducts";
import GetKidProducts from "./assets/components/GetKidProducts";
import GetAccessoriesProducts from "./assets/components/GetAccessoriesProducts";
import GetCosmeticsProducts from "./assets/components/GetCosmeticsProducts";
import ProductsPage from "./assets/components/ProductsPage";
import Cart from "./assets/components/Cart";
import PaginationButton from "./assets/components/PaginationButton";
function App() {
  const [user, setUser] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsPage1, setProductsPage1] = useState([]);
  const [productsPage2, setProductsPage2] = useState([]);
  const [categories, setCategories] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);
  const [menProducts, setMenProducts] = useState([]);
  const [kidProducts, setKidProducts] = useState([]);
  const [accessoriesProducts, setAccessoriesProducts] = useState([]);
  const [cosmeticsProducts, setCosmeticsProducts] = useState([]);
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
        setUser(data);
        setIsLogin(true);
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
  }, []);
  useEffect(() => {
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/product/getAllProducts.php"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/server/product/getProductsPage1.php")
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        setProductsPage1(data);
      })
      .catch();
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/server/product/getProductsPage2.php")
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        setProductsPage2(data);
      })
      .catch();
  }, []);
  useEffect(() => {
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/product/getWomenProducts.php"
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
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/product/getMenProducts.php"
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
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/product/getKidProducts.php"
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
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/product/getAccessoriesProducts.php"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAccessoriesProducts(data);
      });
  }, []);
  useEffect(() => {
    fetch(
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/product/getCosmeticsProducts.php"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCosmeticsProducts(data);
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
          productsPage1,
          productsPage2,
          categories,
          womenProducts,
          menProducts,
          kidProducts,
          accessoriesProducts,
          cosmeticsProducts,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                component={<GetProductsPage1 />}
                button={<PaginationButton />}
              ></Home>
            }
          />
          <Route
            path="/page2"
            element={
              <Home
                component={<GetProductsPage2 />}
                button={<PaginationButton />}
              ></Home>
            }
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
            path="/cosmetics-product"
            element={<Home component={<GetCosmeticsProducts />}></Home>}
          />
          <Route path="/Cart" element={<Cart component={<Cart />}></Cart>} />

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
          <Route
            path="/cosmeticsProduct-page"
            element={
              <ProductsPage component={<GetCosmeticsProducts />}></ProductsPage>
            }
          />
          <Route
            path="/cart"
            element={<ProductsPage component={<Cart />}></ProductsPage>}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/detail" element={<Detail />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
