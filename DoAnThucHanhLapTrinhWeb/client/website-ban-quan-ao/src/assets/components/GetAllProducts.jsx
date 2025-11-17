import { useEffect, useState } from "react";
import Products from "./Products";

export default function GetAllProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/model/getAllProducts.php")
      .then((res) => {
          return res.json();
      })
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return (
    <>
      <Products data={products} />
    </>
  );
}
