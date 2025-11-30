import { useContext } from "react";
import AppContext from "./AppContext";
import Products from "./Products";

export default function GetProductsPage2() {
  const { productsPage2 } = useContext(AppContext);
  return (
    <>
      <Products data={productsPage2} />
    </>
  );
}
