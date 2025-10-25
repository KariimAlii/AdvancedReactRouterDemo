export default async function eventsLoader() {

    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {

        throw new Response(
            JSON.stringify({ message: "Could not fetch events" }),
            { status: 500 }
        );
    } else {
        return response;
    }
}