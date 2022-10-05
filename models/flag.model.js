const { Schema, model } = require("mongoose");

const FLAG_REX = /^ORA\{[a-zA-Z0-9]{1,25}\}$/;

const flagSchema = new Schema({
    points: { type: Number, min: 25, max: 500, validate: { validator: (a) => a % 25 == 0 }, required: true },
    flag: { type: String, validate: FLAG_REX, required: true, unique: true }
});

const FlagModel = model('Flag', flagSchema, "flags");

class Flag {
    /**
     * 
     * @param {Number} points 
     * @param {String} flag 
     */
    static create(points, flag) {
        var flag = new FlagModel({ points, flag });
        return flag.save();
    }

    static testFlag(flag) {
        return FLAG_REX.test(flag);
    }

    static getFlag(flag) {
        return FlagModel.findOne({ flag });
    }

    static removeFlag(flag) {
        return FlagModel.deleteOne({ flag });
    }

    static getAll() {
        return FlagModel.find({});
    }
}

module.exports = Flag;