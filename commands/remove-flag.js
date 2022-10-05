const { CommandInteraction, PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const Flag = require("../models/flag.model");

/**
 * 
 * @param {CommandInteraction} interaction 
 * @returns 
 */
module.exports.run = async (interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        throw new Error("Vous n'avez pas les permissions pour faire ça !");
    }

    let flag = interaction.options.get("flag", true).value;

    if (!flag.startsWith("ORA{")) flag = "ORA{" + flag;
    if (!flag.endsWith("}")) flag += "}";

    const del = await Flag.removeFlag(flag);
    if (del.deletedCount == 0) throw new Error("Ce flag n'existe pas !");

    interaction.reply(":white_check_mark: Le flag `" + flag + "` a bien été supprimé !");
};

module.exports.info = {
    name: "remove-flag",
    description: "permet de retirer un flag.",
    options: [
        {
            name: "flag",
            description: "Le flag.",
            type: ApplicationCommandOptionType.String,
            maxLength: 25,
            required: true
        }]
};