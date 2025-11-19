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
function App() {
  const [user, setUser] = useState("");
  const [isLogin, setIsLogin] = useState(false);
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
  return (
    <>
      <AppContext.Provider value={{ user, isLogin, setIsLogin }}>
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
