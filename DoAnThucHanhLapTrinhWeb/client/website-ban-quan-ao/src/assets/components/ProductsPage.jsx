import Footer from "./Footer";
import NavBar from "./NavBar";
import Products from "./Products";

export default function ProductsPage({ component }) {
  return (
    <>
      <NavBar />
      {component}
      <Footer />
    </>
  );
}
