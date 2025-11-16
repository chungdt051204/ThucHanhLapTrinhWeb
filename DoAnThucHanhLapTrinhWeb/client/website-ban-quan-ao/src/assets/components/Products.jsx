import "./Product.css";
export default function Products({ data }) {
  return (
    <>
      <div className="product-track">
        {data.length > 0 &&
          data.map((value, index) => {
            return (
              <div key={index} className="product-item">
                <img src={value.image_url} alt="" width={150} height={200} />
                <hp>{value.name}</hp>
              </div>
            );
          })}
      </div>
    </>
  );
}
