const MSEC_PER_MINUTE = 1000 * 60;
const MSEC_PER_HOUR = MSEC_PER_MINUTE * 60;
const MSEC_PER_DAY = MSEC_PER_HOUR * 24;


// Calculate the time difference between specified time and current time
export function getTimeDiffFromNow(timeStampStr) {
    let now = new Date();
    let target = new Date(timeStampStr);

    let interval = now.getTime() - target.getTime();

    let days = Math.floor(interval / MSEC_PER_DAY);
    interval = interval - (days * MSEC_PER_DAY);

    // Calculate the hours, minutes, and seconds.  
    let hours = Math.floor(interval / MSEC_PER_HOUR);
    interval = interval - (hours * MSEC_PER_HOUR);

    let minutes = Math.floor(interval / MSEC_PER_MINUTE);
    interval = interval - (minutes * MSEC_PER_MINUTE);

    let seconds = Math.floor(interval / 1000);

    if(days !== 0){
        return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if(hours !== 0){
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if(minutes !== 0){
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
        return `${seconds} ${seconds <= 1 ? "second" : "seconds"} ago`;
    }
}