import "./Footer.css";
export default function Footer() {
  return (
    <>
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-col about">
            <h2 class="logo">Ashion</h2>
            <p>
              Ashion is a modern and sophisticated fashion brand, offering you
              exclusive designs and premium quality.
            </p>
            <div class="payment-icons">
              <img
                src="https://cdn-icons-png.flaticon.com/512/196/196578.png"
                alt="MasterCard"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/349/349221.png"
                alt="Visa"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888870.png"
                alt="Discover"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/196/196566.png"
                alt="PayPal"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/217/217425.png"
                alt="Cirrus"
              />
            </div>
          </div>
          <div class="footer-col">
            <h3>QUICK LINKS</h3>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Blogs</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <h3>ACCOUNT</h3>
            <ul>
              <li>
                <a href="#">My Account</a>
              </li>
              <li>
                <a href="#">Orders Tracking</a>
              </li>
              <li>
                <a href="#">Checkout</a>
              </li>
              <li>
                <a href="#">Wishlist</a>
              </li>
            </ul>
          </div>
          <div class="footer-col newsletter">
            <h3>NEWSLETTER</h3>
            <form>
              <input type="email" placeholder="Email" />
              <button type="submit">SUBSCRIBE</button>
            </form>
            <div class="social-icons">
              <a href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-youtube"></i>
              </a>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          <div>
            <i
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                padding: "6px 5px",
                border: "1px solid black",
                borderRadius: "1000px",
                cursor: "pointer",
              }}
              class="fa-solid fa-arrow-up"
            ></i>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 Ashion. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
