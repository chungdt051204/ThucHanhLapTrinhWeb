import { useContext } from "react";
import AppContext from "./AppContext";
import Products from "./Products";

export default function GetAccessoriesProducts() {
  const { accessoriesProducts } = useContext(AppContext);
  return (
    <>
      <Products data={accessoriesProducts} />
    </>
  );
}
