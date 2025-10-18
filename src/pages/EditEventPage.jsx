import EventForm from "../components/EventForm.jsx";
import {useLoaderData} from "react-router-dom";

export default function EditEventPage() {
    const data = useLoaderData();

    return <EventForm event={data.event}/>
}