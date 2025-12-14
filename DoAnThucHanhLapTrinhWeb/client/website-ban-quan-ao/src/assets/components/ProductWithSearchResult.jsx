import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "./ProductList";

export default function ProductWithSearchResult() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [productWithSearchResult, setProductWithSearchResult] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost:3000/server/product/getProducts.php?name=${encodeURIComponent(
        name
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProductWithSearchResult(data);
      })
      .catch();
  }, [name]);
  return (
    <>
      <h2>Tìm thấy {productWithSearchResult.length} sản phẩm</h2>
      <ProductList data={productWithSearchResult} />
    </>
  );
}
