import EventForm from "../components/EventForm.jsx";
import {redirect} from "react-router-dom";

export default function NewEventPage() {
    return <EventForm method="post" />
}

