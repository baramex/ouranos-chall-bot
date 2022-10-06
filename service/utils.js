const ms = require("ms");

/**
 * 
 * @param {number} duration 
 * @returns {string}
 */
function durationTime(duration) {
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    return years > 0 ? years + " ans" : months > 0 ? months + " mois" : days > 0 ? days + " jours" : hours > 0 ? hours + " heures" : minutes > 0 ? minutes + " minutes" : seconds + " secondes";
}

/**
 * 
 * @param {Date} date 
 */
function formatDate(date) {
    return date.toLocaleDateString("fr-FR", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
}

function convertStringToDate(date) {
    const offset = Number(new Date(date).toLocaleDateString("fr-FR", { timeZoneName: "short" }).split("UTC")[1]) + new Date().getTimezoneOffset() / 60;
    const d = new Date(date);
    if (!d || !(d instanceof Date) || isNaN(d)) return false;
    d.setHours(d.getHours() + offset);
    return d;
}

function convertStringToDuration(str) {
    let before = "";
    let act = 0;
    const res = [];
    str.split("").forEach((dur, l, arr) => {
        res[act] = (res[act] || "") + dur;

        if (before.match(/[0-9]/) && dur.match(/[a-z]/i) && !(arr[l + 1] || "").match(/[a-z]/i)) {
            act++;
        }

        if (!dur.match(/[a-z]/g)) before = dur;
    });

    let t = 0;
    res.forEach(r => {
        t += ms(r) || 0;
    });
    if (isNaN(t) || t < 0) t = 0;

    return t;
}

module.exports = { durationTime, formatDate, convertStringToDate, convertStringToDuration };