import { Link, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import "./Product.css";
import ProductList from "./ProductList";
export default function GetProductsWithQueryString() {
  const { refresh } = useContext(AppContext);
  const [searchParams] = useSearchParams("category_id");
  const categoryId = searchParams.get("category_id");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let apiBackend =
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/product/getProducts.php";
    if (categoryId) apiBackend = apiBackend + `?category_id=${categoryId}`;
    fetch(apiBackend)
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch();
  }, [refresh, categoryId]);
  return (
    <>
      <ProductList data={products}></ProductList>
    </>
  );
}
