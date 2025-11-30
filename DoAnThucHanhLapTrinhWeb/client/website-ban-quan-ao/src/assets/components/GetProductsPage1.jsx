import { useContext } from "react";
import AppContext from "./AppContext";
import Products from "./Products";

export default function GetProductsPage1() {
  const { productsPage1 } = useContext(AppContext);
  return (
    <>
      <Products data={productsPage1} />
    </>
  );
}
