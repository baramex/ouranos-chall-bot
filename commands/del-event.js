const { CommandInteraction, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const Event = require("../models/event.model");

/**
 * 
 * @param {CommandInteraction} interaction 
 * @returns 
 */
module.exports.run = async (interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        throw new Error("Vous n'avez pas les permissions pour faire ça !");
    }

    if (!await Event.getEvent()) throw new Error("Il n'y a aucun évènement.");

    await Event.removeEvent();

    interaction.reply(":white_check_mark: L'évènement a été supprimé !");
};

module.exports.info = {
    name: "start-event",
    description: "permet de supprimer l'évènement le plus récent."
};