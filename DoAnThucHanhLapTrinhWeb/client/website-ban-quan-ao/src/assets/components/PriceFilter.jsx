import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function PriceFilter() {
  const [searchParams] = useSearchParams("category_id");
  const id = searchParams.get("category_id");
  const navigate = useNavigate();
  const priceRangeRef = useRef();
  const handlePriceRangeSelected = () => {
    if (priceRangeRef.current.value !== "") {
      navigate(
        `/product-page?category_id=${id}&price=${priceRangeRef.current.value}`
      );
    } else {
      navigate(`/product-page?category_id=${id}`);
    }
  };
  return (
    <>
      <select
        ref={priceRangeRef}
        onChange={handlePriceRangeSelected}
        name="price_range"
        id="price-filter"
      >
        <option value="">Chọn giá</option>
        <option value="low">Dưới 200.000 VND</option>
        <option value="medium">Từ 200.000 - 400.000 VND</option>
        <option value="high">Trên 400.000 VND</option>
      </select>
    </>
  );
}
