const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");
const Event = require("../models/event.model");
const Flag = require("../models/flag.model");
const { updateFlags } = require("../modules/flags");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {import("discord.js").Interaction} interaction 
     * @returns 
     */
    run: async function (interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId == "check-flag") {
            const event = await Event.getEvent(true);
            if (!event) return interaction.reply({ content: "Il n'y a aucun évènement.", ephemeral: true });

            const modal = new ModalBuilder().setTitle("Valider un flag").setCustomId("check-flag-modal-" + Date.now()).setComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("flag").setLabel("Flag").setMinLength(6).setMaxLength(30).setRequired(true).setStyle(TextInputStyle.Short).setPlaceholder("ORA{...}")));
            interaction.showModal(modal);

            const res = await interaction.awaitModalSubmit({ time: 1000 * 60 * 5, filter: m => m.customId == modal.data.custom_id });

            const flag = res.fields.getField("flag").value;
            if (!Flag.testFlag(flag)) return res.reply({ content: "Le format du flag n'est pas valide.", ephemeral: true });

            const fl = await Flag.getFlag(flag);
            if (!fl) return res.reply({ content: "Le flag est invalide.", ephemeral: true });

            const user = event.users.find(a => a.id == interaction.user.id);

            if (user && user.flags.find(a => a._id.equals(fl._id))) return res.reply({ content: "Vous avez déjà validé ce flag.", ephemeral: true });

            if (!user) event.users.push({ id: interaction.user.id, flags: [fl._id] });
            else user.flags.push(fl._id);

            await event.save();
            updateFlags().catch(console.error);

            res.reply({ content: "Le flag a été validé !\n:triangular_flag_on_post: + " + fl.points + " points", ephemeral: true });
        }
    }
};