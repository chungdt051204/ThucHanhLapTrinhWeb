import { Link } from "react-router-dom";
import "./Category.css";
export default function Category() {
  return (
    <>
      <section className="category">
        <div className="category-track1">
          <div className="ct1">
            <div>
              <h1>Women’s fashion</h1>
              <p>
                Nơi tôn vinh phong cách và cá tính phái đẹp. Khám phá những xu
                hướng thời trang mới nhất từ trang phục hằng ngày, đầm dự tiệc,
                đến phụ kiện tinh tế giúp bạn tự tin trong mọi khoảnh khắc.
              </p>
              <Link className="shop" to="/womenProduct-page">
                <p>SHOP NOW</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="category-track2">
          <div className="category-item item1">
            <div className="ct2">
              <h2>Men’s fashion</h2>
              <Link className="shop" to="/menProduct-page">
                <p>SHOP NOW</p>
              </Link>
            </div>
          </div>
          <div className="category-item item2">
            <div className="ct3">
              <h2>Kid’s fashion</h2>
              <Link className="shop" to="/kidProduct-page">
                <p className="shop">SHOP NOW</p>
              </Link>
            </div>
          </div>
          <div className="category-item item3">
            <div className="ct4">
              <h2>Cosmetics</h2>
              <Link className="shop" to="/cosmeticsProduct-page">
                <p>SHOP NOW</p>
              </Link>
            </div>
          </div>
          <div className="category-item item4">
            <div className="ct5">
              <h2>Accessories</h2>
              <Link className="shop" to="/accessoryProduct-page">
                <p>SHOP NOW</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
