const { CommandInteraction, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const Event = require("../models/event.model");
const { convertStringToDate, convertStringToDuration, durationTime } = require("../service/utils");

/**
 * 
 * @param {CommandInteraction} interaction 
 * @returns 
 */
module.exports.run = async (interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        throw new Error("Vous n'avez pas les permissions pour faire ça !");
    }

    const start = convertStringToDate(interaction.options.get("début", true).value);
    const duration = convertStringToDuration(interaction.options.get("durée", true).value);
    const end = new Date(new Date().getTime() + duration);

    console.log(start, duration)

    if (!start || start.getTime() <= new Date().getTime()) throw new Error("La date de début n'est pas valide.");
    else if (!duration || !end || end.getTime() <= start.getTime()) throw new Error("La durée n'est pas valide.");

    await Event.create(start, end);

    interaction.reply(":white_check_mark: Début de l'évènement dans **" + durationTime(start.getTime() - new Date().getTime()) + "** !");
};

module.exports.info = {
    name: "start-event",
    description: "permet de commencer l'évènement.",
    options: [{
        name: "début",
        description: "La date de début de l'évènement (hh:mm MM-dd-yyyy).",
        type: ApplicationCommandOptionType.String,
        required: true
    },
    {
        name: "durée",
        description: "La durée de l'évènement (ex: 2h).",
        type: ApplicationCommandOptionType.String,
        required: true
    }]
};