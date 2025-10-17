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
    //! In loader functions
    //!===========================
    //! -> You can use browser apis
    //!     LocalStorage.setItem() ✅✅
    //!
    //! -> You can't use React Hooks
    //!     useState() ❌❌
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // ...
    } else {
        return response;
    }
}

