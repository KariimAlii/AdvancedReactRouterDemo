import MainNavigation from "../components/MainNavigation.jsx";
import {Outlet, useLoaderData} from "react-router-dom";

export default function Layout() {
    //! You can't read loader data in a higher level component
    //! You can access loader data in the same level or any lower level component
    const events = useLoaderData();
    console.log(events)
    return (
        <>
            <MainNavigation/>
            <main>
                <Outlet />
            </main>
        </>
    )
}