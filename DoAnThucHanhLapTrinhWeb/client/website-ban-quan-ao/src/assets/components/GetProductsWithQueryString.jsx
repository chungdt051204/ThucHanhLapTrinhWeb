import { Link, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import "./Product.css";
export default function GetProductsWithQueryString() {
  const { products, refresh } = useContext(AppContext);
  const [searchParams] = useSearchParams("category_id");
  const id = searchParams.get("category_id");
  const [productsWithCategory_Id, setProductsWithCategory_Id] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost:3000/server/product/getProducts.php?category_id=${id}`
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        console.log(data);
        setProductsWithCategory_Id(data);
      })
      .catch();
  }, [refresh, id]);
  return (
    <>
      <div className="product-track">
        {productsWithCategory_Id.length > 0 ? (
          productsWithCategory_Id.map((value, index) => {
            return (
              <div key={index} className="product-item">
                <Link to={`/product/detail?id=${value.product_id}`}>
                  <img src={value.image_url} alt="" width={150} height={200} />
                </Link>
                <Link to={`/product/detail?id=${value.product_id}`}>
                  <p>{value.name}</p>
                </Link>
              </div>
            );
          })
        ) : products.length > 0 && productsWithCategory_Id.length > 0 ? (
          products.map((value, index) => {
            return (
              <div key={index} className="product-item">
                <Link to={`/product/detail?id=${value.product_id}`}>
                  <img src={value.image_url} alt="" width={150} height={200} />
                </Link>
                <Link to={`/product/detail?id=${value.product_id}`}>
                  <p>{value.name}</p>
                </Link>
              </div>
            );
          })
        ) : (
          <p>Không có sản phẩm để hiển thị</p>
        )}
      </div>
    </>
  );
}
