
function extractTimestamp(ts) {
    const dateObject = new Date(ts);

    const date = dateObject.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).replace(/ /g, "-");

    const time = dateObject.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    return {date, time};
}

export default extractTimestamp;