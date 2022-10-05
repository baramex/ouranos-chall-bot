const { CommandInteraction, PermissionsBitField, EmbedBuilder } = require("discord.js");
const { COLORS, options } = require("../client");
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

    const flags = await Flag.getAll();

    const embed = new EmbedBuilder()
        .setColor(COLORS.info)
        .setTitle(":checkered_flag: | Ouranos Chall・Flags")
        .setFooter(options.footer)
        .setFields({
            name: "Voici la liste des `" + (await flags).length + "` flags disponibles pour le moment.",
            value: flags.map(a => `- \`${a.flag}\` : \`${a.points}\` points`).join("\n") ||"Aucun"
        });

    interaction.reply({ embeds: [embed] });
};

module.exports.info = {
    name: "list-flags",
    description: "permet de récupérer la liste des flags."
};