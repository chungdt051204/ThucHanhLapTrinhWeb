import { Link } from "react-router-dom";
export default function PaginationButton() {
  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: "80px",
          width: "250px",
          margin: "80px auto 20px",
        }}
      >
        <button>Trang đầu</button>
        <Link to="/">
          <button>1</button>
        </Link>
        <Link to="/page2">
          <button>2</button>
        </Link>
        <button>Trang cuối</button>
      </div>
    </>
  );
}
