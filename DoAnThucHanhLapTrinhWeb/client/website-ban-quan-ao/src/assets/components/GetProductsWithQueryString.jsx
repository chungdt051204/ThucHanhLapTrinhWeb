import { Link, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import "./Product.css";
import ProductList from "./ProductList";
import { fetchApi } from "../services/api.js";
export default function GetProductsWithQueryString() {
  const { refresh, productsPage1, setProductsPage1 } = useContext(AppContext);
  const [searchParams] = useSearchParams("category_id");
  const categoryId = searchParams.get("category_id");

  useEffect(() => {
    let apiBackend =
      "http://localhost/ThucHanhLapTrinhWeb/DoAnThucHanhLapTrinhWeb/server/product/getProducts.php";
    if (categoryId) apiBackend = apiBackend + `?category_id=${categoryId}`;
    fetchApi({ url: apiBackend, setData: setProductsPage1 });
  }, [refresh, categoryId, setProductsPage1]);
  return (
    <>
      <ProductList data={productsPage1}></ProductList>
    </>
  );
}
