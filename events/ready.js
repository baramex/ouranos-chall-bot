const { ActivityType } = require("discord.js");
const Enmap = require("enmap");
const { client, options } = require("../client");
const fs = require("fs");
const { updateFlags } = require("../modules/flags");

module.exports = {
    name: "ready",
    run: async function () {
        console.log("Ready !");

        client.user.setActivity({ name: "Ouranos Chall | v" + require("../package.json").version, type: ActivityType.Watching });
        let guild = client.guilds.cache.first();

        if (!guild) throw new Error("Unfound guild.");
        options.guild = guild;

        options.footer = { text: "🎉 Ouranos Chall | by baramex#6527", iconURL: guild.iconURL() };

        client.commands = new Enmap();

        fs.readdir("./commands/", (err, files) => {
            if (err) return console.error(err);
            files.forEach(file => {
                if (!file.endsWith(".js")) return;
                let props = require(`../commands/${file}`);

                let c = guild.commands.cache.find(a => a.name == props.info.name);
                if (c) {
                    guild.commands.edit(c, { description: props.info.description, options: props.info.options || [] }).catch(console.error);
                }
                else {
                    guild.commands.create({
                        name: props.info.name,
                        description: props.info.description,
                        options: props.info.options || []
                    }).catch(console.error);
                }

                client.commands.set(props.info.name, props);
            });
        });

        updateFlags().catch(console.error);
    }
}