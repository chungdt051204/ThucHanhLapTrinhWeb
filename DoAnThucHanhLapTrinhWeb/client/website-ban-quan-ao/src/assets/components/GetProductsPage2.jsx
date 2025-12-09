import { useContext } from "react";
import AppContext from "./AppContext";
import { Link } from "react-router-dom";
import "./Product.css";
export default function GetProductsPage2() {
  const { productsPage2 } = useContext(AppContext);
  return (
    <>
      <div className="product-track">
        {productsPage2.length > 0 &&
          productsPage2.map((value, index) => {
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
          })}
      </div>
    </>
  );
}
