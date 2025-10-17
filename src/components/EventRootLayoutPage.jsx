import EventsNavigation from "./EventsNavigation.jsx";
import {Outlet} from "react-router-dom";

export default function EventRootLayoutPage() {
    return (
       <>
            <EventsNavigation/>
            <Outlet/>
       </>
    )
}