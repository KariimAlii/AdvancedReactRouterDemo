import EventForm from "../components/EventForm.jsx";

export default function NewEventPage() {
    function submitHandler(event) {
        event.preventDefault();
    }

    return <EventForm />
}