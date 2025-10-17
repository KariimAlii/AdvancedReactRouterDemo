import EventsList from '../components/EventsList';
import {useLoaderData} from "react-router-dom";

export default function EventsPage() {
    const response = useLoaderData();
    const events = response.events;
    return (
        <EventsList events={events} />
    );
}

export async function eventsLoader() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // ...
    } else {
        return response;
    }
}

