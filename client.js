const Discord = require("discord.js");

const COLORS = {
    error: "FF0000",
    info: "00F2FF",
    warning: "ffc107",
    valid: "00FF03",
    casino: "FFD700"
}

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds
    ]
});
client.login(process.env.BOT_TOKEN);

/**
 * @type {{guild:Discord.Guild,footer:Object}}
 */
let options = { guild: undefined, footer: undefined };

module.exports = { COLORS, client, options };