const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

export function getFormattedDate(dateTimeStr) {
    const [ year, m, d ] = dateTimeStr.split('-', 3);
    const day = d.split('T', 1);
    const month = months[Number.parseInt(m) - 1];
    const date = day + " " + month + " " + year;
    return date;
}

export function readingDuration(bodyLength) {
    if (bodyLength < 1) {
        return "0 sec read"
    }
    let duration = "";
    let d = (bodyLength / 1000).toString()
    let [minutes, mantissa] = d.split(".")
    let m = +("." + mantissa) * .60

    if (m > .53) {
        ++minutes
    }

    if (minutes > 0) {
        duration = minutes + " min" 

    } else {
        duration = m.toString().split(".")[1].substring(0, 2) + " sec"
    }

    return duration + " read";
}

