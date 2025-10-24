import MainNavigation from "../components/MainNavigation.jsx";
import {Outlet, useLoaderData, useNavigation, useSubmit} from "react-router-dom";
import {useEffect} from "react";
import {getTokenDuration} from "../util/auth.js";

export default function Layout() {
    //! You can't read loader data in a higher level component
    //! You can access loader data in the same level or any lower level component
    // const events = useLoaderData();
    // console.log(events)

    //! useNavigation() hook is used to get information about the current active navigation transition
    const navigation = useNavigation();
    //! navigation.state ===> 'idle' || 'loading' || 'submitting';
    const token = useLoaderData() //! or useRouteLoaderData('root')
    const submit = useSubmit();
    //! clear the jwt token after 1 hour
    useEffect(() => {
        if(!token) {
            return;
        }

        if(token === 'EXPIRED') {
            submit(null, { action: '/logout', method:'post' })
        }

        const tokenDuration = getTokenDuration();

        setTimeout(() => {
            submit(null, { action: '/logout', method:'post' })
        }, tokenDuration)
    }, [token, submit])
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