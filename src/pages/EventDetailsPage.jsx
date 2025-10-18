import {Link, useLoaderData, useParams} from "react-router-dom";
import EventItem from "../components/EventItem.jsx";

export default function EventDetailsPage() {
    const data = useLoaderData();

    const {eventId} = useParams();

    return (
        <>
            <EventItem event={data.event} />
            <Link to=".." relative="path">Back to Index</Link>
        </>
    )
}

export async function eventDetailsLoader({request, params}) {
    // request.url ✅✅
    // params.eventId ✅✅
    //!  const {eventId} = useParams(); ❌❌ you can't use hooks inside a loader
    const response = await fetch(`http://localhost:8080/events/${params.eventId}`)

    if(!response.ok) {
        throw new Response(
            JSON.stringify({ message: "Could not fetch selected event" }),
            { status: 500 }
        );
    }

    return response;
}