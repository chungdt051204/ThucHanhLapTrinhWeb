import Footer from "./Footer";
import UserNavbar from "./UserNavbar";
import Products from "./Products";

export default function ProductsPage({ component }) {
  return (
    <>
      <UserNavbar />
      {component}
      <Footer />
    </>
  );
}
