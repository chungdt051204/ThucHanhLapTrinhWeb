import { useContext } from "react";
import AppContext from "./AppContext";
import Carousel from "./Carousel";
import Category from "./Category";
import AdminNavbar from "./AdminNavbar";
import CategoryFilter from "./CategoryFilter";
import Footer from "./Footer";
export default function Home({ component, button }) {
  const { user, isLogin } = useContext(AppContext);
  return (
    <>
      <AdminNavbar />
      {component}
      <Footer />
    </>
  );
}
