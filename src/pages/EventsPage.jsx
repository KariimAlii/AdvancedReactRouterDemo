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

export async function eventsLoader() {
    //! In loader functions
    //!===========================
    //! -> You can use browser apis
    //!     LocalStorage.setItem() ✅✅
    //!
    //! -> You can't use React Hooks
    //!     useState() ❌❌
    const response = await fetch('http://localhost:8080/eventsjj');

    if (!response.ok) {
        // return new Response() ✅✅
        // return {
        //     isError: true,
        //     message: "Could not fetch events."
        // } ✅✅
        // throw { message: 'Could not fetch events.' };
        throw new Response(
            JSON.stringify({ message: "Could not fetch events" }),
            { status: 500 }
        );
    } else {
        return response;
    }
}

