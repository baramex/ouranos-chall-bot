const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require("discord.js");
const Event = require("../models/event.model");
const { formatDate } = require("../service/utils");
const { options, COLORS, client } = require("../client");

async function updateFlags() {
    const channel = options.guild.channels.cache.get(process.env.FLAGS_CHANNEL_ID);
    if (!channel) return;

    const event = await Event.getEvent();
    const valid = Event.isValid(event);
    const started = Event.isStarted(event);

    const embed = new EmbedBuilder()
        .setColor(COLORS.casino)
        .setTitle(":checkered_flag: | Ouranos Chall・Flags")
        .setFooter(options.footer)
        .setDescription(!event ? "Il n'y a aucun évènement pour le moment." : (valid ?
            !started ? `L'évènement n'a pas encore commencé : \`${formatDate(event.start)}\`.` : `L'évènement est terminé : \`${formatDate(event.end)}\`.` : "" +
                event?.users ? "\n" + event.users.sort((a, b) => b.flags.reduce((p, c) => p + c.points, 0) - a.flags.reduce((p, c) => p + c.points, 0)).map((a, i) => `\`#${i + 1} ${options.guild.members.cache.get(a.id)?.user.tag}\` - ${a.flags.length} flags validés - \`${a.flags.reduce((p, c) => p + c.points, 0)} points\``).join("\n") : "")
        );

    const row = new ActionRowBuilder()
        .setComponents(
            new ButtonBuilder().setCustomId("check-flag").setEmoji("🏁").setLabel("Valider un flag").setStyle(ButtonStyle.Success)
        );

    const message = (await channel.messages.fetch({ limit: 5 })).find(m => m.author.id == client.user.id);
    if (message) message.edit({ embeds: [embed], components: [row] });
    else channel.send({ embeds: [embed], components: [row] });
}

module.exports = { updateFlags };