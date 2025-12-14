import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import AppContext from "./AppContext";
import "./Carousel.css";
export default function Carousel() {
  const { categories } = useContext(AppContext);
  const carousel = useRef();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < 4) {
          carousel.current.scrollLeft += 1000;
          return prev + 1; //Nếu thỏa thì tăng index lên 1
        } else {
          carousel.current.scrollLeft -= 4000;
          return 0; //Chạy đến cuối quay về đầu reset index về 0
        }
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [index]);
  return (
    <>
      <div className="carousel-track" ref={carousel}>
        {categories.length > 0 ? (
          categories.map((value, index) => {
            return (
              <div key={index} className="carousel-items">
                <img src={value.img_url} alt="" />
              </div>
            );
          })
        ) : (
          <p>Không có dữ liệu để hiển thị</p>
        )}
      </div>
    </>
  );
}
