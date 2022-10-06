const { scheduleJob, cancelJob } = require("node-schedule");
const { updateFlags } = require("../modules/flags");

function init() {
    scheduleJob("fast-update", "*/5 * * * *", () => {
        updateFlags().catch(console.error);
    });
}

function startEventSchedule(date) {
    scheduleJob("start-event", date, () => {
        updateFlags().catch(console.error);
    });
}

function endEventSchedule(date) {
    scheduleJob("end-event", date, () => {
        updateFlags().catch(console.error);
    });
}

function cancelEventsSchedule() {
    cancelJob("start-event");
    cancelJob("end-event");
}

module.exports = { init, startEventSchedule, endEventSchedule, cancelEventsSchedule };