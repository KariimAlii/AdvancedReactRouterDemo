import PageContent from "../components/PageContent.jsx";
import {useRouteError} from "react-router-dom";
import MainNavigation from "../components/MainNavigation.jsx";

export default function ErrorPage() {
    const error = useRouteError();
    //! error.status   only if you throw a Response object

    let title = 'An Error Occured !';
    let message = "Something went wrong..";
    if(error.status === 500) {
        message = JSON.parse(error.data).message;
    }
    if(error.status === 404) {
        title = 'Not Found!';
        message = 'Could not find resource or page.'
    }
    return (
        <>
            <MainNavigation/>
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}