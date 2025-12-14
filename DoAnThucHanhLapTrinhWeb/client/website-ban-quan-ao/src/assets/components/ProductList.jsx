import { Link } from "react-router-dom";
import PaginationButton from "./PaginationButton";
export default function ProductList({ data }) {
  return (
    <>
      <div className="product-track">
        {data.length > 0 ? (
          data.map((value, index) => {
            return (
              <div key={index} className="product-item">
                <Link to={`/product/detail?id=${value.product_id}`}>
                  <img src={value.image_url} alt="" width={150} height={200} />
                </Link>
                <Link to={`/product/detail?id=${value.product_id}`}>
                  <p>{value.name}</p>
                </Link>
                <p style={{ color: "red" }}>{value.price}000 VND</p>
              </div>
            );
          })
        ) : (
          <p>Không có sản phẩm để hiển thị</p>
        )}
      </div>
      {data.length > 10 && <PaginationButton />}
    </>
  );
}
