import {Link} from "react-router-dom";

const DUMMY_EVENTS = [
    { id : '1', title: 'Event 1'},
    { id : '2', title: 'Event 3'},
    { id : '3', title: 'Event 3'},
]
export default function EventsPage() {
    return (
        <>
            <h1>Events Page</h1>
            <ul>
                {DUMMY_EVENTS.map(event => (
                    <li key={event.id}>
                        <Link to={event.id}>{event.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}