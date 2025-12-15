import Footer from "./Footer";
import AdminNavbar from "./AdminNavbar";
export default function Home({ component }) {
  return (
    <>
      <AdminNavbar />
      {component}
      <Footer />
    </>
  );
}
