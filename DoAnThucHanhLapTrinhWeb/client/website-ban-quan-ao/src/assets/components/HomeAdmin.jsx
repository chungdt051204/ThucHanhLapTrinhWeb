import Footer from "./Footer";
export default function Home({ component }) {
  return (
    <>
      <AdminNavbar />
      {component}
      <Footer />
    </>
  );
}
