import { useContext } from "react";
import AppContext from "./AppContext";
import Products from "./Products";

export default function GetMenProducts() {
  const { menProducts } = useContext(AppContext);
  return (
    <>
      <Products data={menProducts} />
    </>
  );
}
