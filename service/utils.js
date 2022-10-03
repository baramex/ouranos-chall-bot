/**
 * 
 * @param {number} ms 
 * @returns {string}
 */
function durationTime(ms) {
    const y = Math.floor(ms / (1000 * 60 * 60 * 24 * 365));
    const m = Math.floor(ms / (1000 * 60 * 60 * 24 * 30)) % 12;
    const d = Math.floor(ms / (1000 * 60 * 60 * 24)) % 30;
    const h = Math.floor(ms / (1000 * 60 * 60)) % 24;
    const min = Math.floor(ms / (1000 * 60)) % 60;
    const sec = Math.floor(ms / 1000) % 60;

    return ((y ? (y + " années ") : "") + (m ? m + " mois " : "") + (d ? d + " jours " : "") + (h ? h + " heures " : "") + (min ? min + " minutes " : "") + (sec ? sec + " secondes" : "")).trim() || "0 minutes";
}

/**
 * 
 * @param {Date} date 
 */
function formatDate(date) {
    return date.toLocaleDateString("fr-FR", { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
}

module.exports = { durationTime, formatDate };