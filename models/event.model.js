const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    users: { type: [{ id: String, flags: [{ type: ObjectId, ref: "Flag" }] }], default: [] },
    date: { type: Date, default: Date.now }
});

const EventModel = model('Event', eventSchema, "events");

class Event {
    /**
     * 
     * @param {Date} start 
     * @param {Date} end 
     */
    static async create(start, end) {
        await EventModel.deleteMany({});
        var event = new EventModel({ start, end });
        return await event.save();
    }

    /**
     * 
     * @param {boolean} [valid]
     * @returns 
     */
    static getEvent(valid) {
        return EventModel.findOne(valid ? { end: { $gt: Date.now() }, start: { $lte: Date.now() } } : {}).populate("users.flags");
    }

    static isStarted(event) {
        return event && Date.now() >= event.start.getTime();
    }

    static isEnded(event) {
        return event && Date.now() > event.end.getTime();
    }

    static isValid(event) {
        return event && Event.isStarted(event) && !Event.isEnded(event);
    }

    static removeEvent() {
        return EventModel.deleteMany({});
    }
}

module.exports = Event;