const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];
  
const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
];

// FORMATS THE DATE FOR BEING DISPLAYED IN THE EXTENSION
function formatDisplayDate(fullDate) {
    const month = months[fullDate.getMonth()];
    const day = days[fullDate.getDay() - 1];
    const date = fullDate.getDate();
    const year = fullDate.getFullYear();
    return `${day} ${month} ${date}th, ${year}`;
}

// FORMATS THE DATE USED IN THE URL FOR GETTING 
// THE CELEBRATION DAY FOR THE SPECIFIED DATE
function formatUrlDate(fullDate) {
    const date = fullDate.getDate() > 10 ? 
        fullDate.getDate() : `0${fullDate.getDate()}`;
    const month = months[fullDate.getMonth()];
    const year = fullDate.getFullYear();
    return `${month}/${date}/${year}`;
}