import EventsList from '../components/EventsList';
import {useLoaderData} from "react-router-dom";

export default function EventsPage() {
    const response = useLoaderData();
    if(response.isError) {
        return <p>{response.message}</p>
    }
    const events = response.events;
    return (
        <EventsList events={events} />
    );
}



