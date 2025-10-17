import {Link, useParams} from "react-router-dom";

export default function EventDetailsPage() {
    const {eventId} = useParams();

    return (
        <>
            <h1>Event Details Page</h1>
            <p>Event {eventId}</p>
            <Link to=".." relative="path">Back to Index</Link>
        </>
    )
}