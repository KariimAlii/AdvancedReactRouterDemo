import MainNavigation from "../components/MainNavigation.jsx";
import {Outlet, useLoaderData, useNavigation} from "react-router-dom";

export default function Layout() {
    //! You can't read loader data in a higher level component
    //! You can access loader data in the same level or any lower level component
    // const events = useLoaderData();
    // console.log(events)

    //! useNavigation() hook is used to get information about the current active navigation transition
    const navigation = useNavigation();
    //! navigation.state ===> 'idle' || 'loading' || 'submitting';
    return (
        <>
            <MainNavigation/>
            <main>
                {navigation.state === 'loading' && <p>Loading.....</p>}
                <Outlet />
            </main>
        </>
    )
}