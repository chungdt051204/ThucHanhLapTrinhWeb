import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "./AppContext";
import "./CategoryFilter.css";
export default function CategoryFilter() {
  const { categories } = useContext(AppContext);
  return (
    <>
      <section class="new-product-section">
        <div class="container">
          <div class="title">
            <h2>NEW PRODUCT</h2>
            <div class="underline"></div>
          </div>
          <ul class="categories">
            <li class="active">
              <Link to="/">
                <p>All</p>
              </Link>
            </li>
            {categories.length > 0 &&
              categories.map((value, index) => {
                return (
                  <li key={index}>
                    <Link to={`/?category_id=${value.category_id}`}>
                      <p>{value.category_name}</p>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    </>
  );
}
