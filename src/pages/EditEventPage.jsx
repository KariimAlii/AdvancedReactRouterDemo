import EventForm from "../components/EventForm.jsx";
import {useLoaderData, useRouteLoaderData} from "react-router-dom";

export default function EditEventPage() {
    const data = useRouteLoaderData('event-details');


    return <EventForm event={data.event}/>
}