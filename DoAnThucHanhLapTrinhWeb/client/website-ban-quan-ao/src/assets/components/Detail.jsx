import Footer from "./Footer";
import NavBar from "./NavBar";
import product1 from "../../assets/product-1.jpg";
import "./Detail.css";

export default function Detail() {
  return (
    <>
      <NavBar />
      <div className="product-container">
        <div className="product-image">
          <img src={product1} alt="" />
        </div>
        <div className="product-details">
          <h1 className="product-title">Buttons tweed blazer</h1>
          <p>
            <strong>Brand:</strong> C&M Made in Wang Materials | Item S-014
          </p>
          <div class="rating">★★★★★</div>( 138 reviews )
          <p className="product-price">
            $59.0 <span className="product-oldprice">$82.0</span>
          </p>
          <div className="add-cart">
            <div className="qty">
              <button>-</button>
              <input type="text" value="1" readOnly />
              <button>+</button>
            </div>
            <button>ADD TO CART</button>
          </div>
          <div className="availability">
            <strong>Availability:</strong>
            <input type="checkbox" name="" id="" /> In Stock
          </div>
          <div className="colors">
            <strong>Available colors:</strong>
            <span className="color-dot color-brown"></span>
            <span className="color-dot color-red"></span>
          </div>
          <div className="sizes">
            <strong>Available sizes:</strong>
            <span>XS</span>
            <span>S</span>
            <span>M</span>
          </div>
          <div className="description">
            <h3>Description</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              doloremque, dolores sapiente excepturi voluptas voluptatem
              temporibus perspiciatis? Iusto sint voluptate necessitatibus sed!
              Alias, provident dolore. Natus illum minus debitis. Veniam.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
