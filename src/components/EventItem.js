
const EventItem = ({ info }) => {
    const { event } = info;

    console.log(event, "event item")
    return (
        <div>
            <p>{event.title}</p>
        </div>
    );
};
export default EventItem; 