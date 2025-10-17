import MainNavigation from "../components/MainNavigation.jsx";
import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <>
            <MainNavigation/>
            <main>
                <Outlet />
            </main>
        </>
    )
}