import { Link, useLocation, useNavigate } from "react-router-dom";
import "./PaginationButton.css";

export default function PaginationButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname === "/page2" ? 2 : 1;
  return (
    <>
      <div className="pagination-container">
        <button
          className={`arrow-btn ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => currentPage !== 1 && navigate("/")}
        >
          ←
        </button>
        <Link
          to="/"
          className={`page-number ${currentPage === 1 ? "active" : ""}`}
        >
          1
        </Link>
        <Link
          to="/page2"
          className={`page-number ${currentPage === 2 ? "active" : ""}`}
        >
          2
        </Link>
        <button
          className={`arrow-btn ${currentPage === 2 ? "disabled" : ""}`}
          onClick={() => currentPage !== 2 && navigate("/page2")}
        >
          →
        </button>
      </div>
    </>
  );
}
