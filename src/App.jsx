
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import EventsPage, {eventsLoader} from "./pages/EventsPage.jsx";
import EventDetailsPage, {deleteEventAction, eventDetailsLoader} from "./pages/EventDetailsPage.jsx";
import NewEventPage from "./pages/NewEventPage.jsx";
import EditEventPage from "./pages/EditEventPage.jsx";
import Layout from "./pages/Layout.jsx";
import EventRootLayoutPage from "./components/EventRootLayoutPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import {newEventAction} from "./components/EventForm.jsx";
import AuthenticationPage, {authenticationAction} from "./pages/AuthenticationPage.jsx";
import logoutAction from "./pages/Logout.js";
import {tokenLoader} from "./util/auth.js";


// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

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
                        element: <EventsPage/>,
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
                                action: newEventAction
                            },
                        ]
                    },
                    {
                        path : 'new',
                        element: <NewEventPage/>,
                        action: newEventAction
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
