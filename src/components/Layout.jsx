import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
        <Header />
        <main style={{ padding: "40px 60px" }}>
            <Outlet />
        </main>
        <Footer />
        </>
    );
}

export default Layout;
