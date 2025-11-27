import { Link } from "react-router-dom";
import "./Product.css";
export default function Products({ data }) {
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
              </div>
            );
          })
        ) : (
          <p>Khong co san pham de hien thi</p>
        )}
      </div>
    </>
  );
}
