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

    const points = interaction.options.get("points", true).value;
    let flag = interaction.options.get("flag", true).value;

    if (points % 25 != 0) throw new Error("Le nombre de point doit être un multiple de 25.");
    if (!flag.startsWith("ORA{")) flag = "ORA{" + flag;
    if (!flag.endsWith("}")) flag += "}";

    if (!Flag.testFlag(flag)) throw new Error("Le flag n'est pas valide, il doit contenir des lettres ou des chiffres et au maximum 25 caractères.");
    if (await Flag.getFlag(flag)) throw new Error("Ce flag existe déjà !");

    const fl = await Flag.create(points, flag);

    interaction.reply(":white_check_mark: Le flag a bien été créé !\nFlag: `" + fl.flag + "`\nPoints: `" + fl.points + "`");
};

module.exports.info = {
    name: "create-flag",
    description: "permet de créer un flag.",
    options: [{
        name: "points",
        description: "Le nombre de point qu'il rapporte.",
        type: ApplicationCommandOptionType.Number,
        minValue: 25,
        maxValue: 500,
        required: true
    },
    {
        name: "flag",
        description: "Le flag.",
        type: ApplicationCommandOptionType.String,
        maxLength: 25,
        required: true
    }]
};