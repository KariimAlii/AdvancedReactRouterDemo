
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
// import EventsPage, {eventsLoader} from "./pages/EventsPage.jsx";
import EventDetailsPage, {deleteEventAction, eventDetailsLoader} from "./pages/EventDetailsPage.jsx";
import NewEventPage from "./pages/NewEventPage.jsx";
import EditEventPage from "./pages/EditEventPage.jsx";
import Layout from "./pages/Layout.jsx";
import EventRootLayoutPage from "./components/EventRootLayoutPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import {newEventAction} from "./components/EventForm.jsx";
import AuthenticationPage, {authenticationAction} from "./pages/AuthenticationPage.jsx";
import logoutAction from "./pages/Logout.js";
import {checkAuthLoader, tokenLoader} from "./util/auth.js";
import {lazy, Suspense} from "react";
import eventsLoader from "./loaders/eventsLoader.js";

// const EventsPage = lazy(() => import('./pages/EventsPage'))
const EventsPage = lazy(() =>
    new Promise(resolve => {
        setTimeout(() => resolve(import('./pages/EventsPage')), 1000); // 1s delay
    })
);


const router = createBrowserRouter([
    {
        path : '/',
        element: <Layout/>,
        errorElement: <ErrorPage />,
        loader: tokenLoader, //! keep the token available for the entire app routes
        id: 'root',
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'auth',
                element: <AuthenticationPage/>,
                action: authenticationAction
            },
            {
                path: 'logout',
                action: logoutAction
            },
            {
                path: 'events',
                element: <EventRootLayoutPage/>,
                children: [
                    {
                        index: true,
                        element: <Suspense fallback={<p>Loading Events Module...</p>}>
                            <EventsPage/>
                        </Suspense>,
                        //! errorElement: <ErrorPage />, ✅✅
                        loader: eventsLoader
                    },
                    {
                        path : ':eventId',
                        id: 'event-details',
                        loader: eventDetailsLoader,
                        children: [
                            {
                                index: true,
                                element: <EventDetailsPage/>,
                                action: deleteEventAction
                            },
                            {
                                path : 'edit',
                                element: <EditEventPage/>,
                                action: newEventAction,
                                loader: checkAuthLoader
                            },
                        ]
                    },
                    {
                        path : 'new',
                        element: <NewEventPage/>,
                        action: newEventAction,
                        loader: checkAuthLoader
                    },
                ]
            },
        ]
    },
])
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
