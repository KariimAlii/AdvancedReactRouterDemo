import {Link, redirect, useParams, useRouteLoaderData} from "react-router-dom";
import EventItem from "../components/EventItem.jsx";
import {getAuthToken} from "../util/auth.js";

export default function EventDetailsPage() {
    const data = useRouteLoaderData('event-details');

    const {eventId} = useParams();

    return (
        <>
            <EventItem event={data.event} />
            <Link to=".." relative="path">Back to Index</Link>
        </>
    )
}



export async function deleteEventAction({ params, request }) {
    const token = getAuthToken();
    const baseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(baseUrl + '/events/' + params.eventId, {
        method: 'DELETE', // request.method
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(!response.ok) {
        throw new Response(
            JSON.stringify({ message: "Could not delete event" }),
            { status: 500 }
        );
    }

    return redirect('/events');
}