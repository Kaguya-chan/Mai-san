const Command = require("../../util/Command.js");
const { RichEmbed } = require("discord.js");

class Hug extends Command {
    constructor (client) {
        super(client, {
            name: "hug",
            description: "Hug an user or get hugged!",
            category: "Weeb",
            usage: "hug [user]",
            guildOnly: true,
            aliases: ["none"]
        });
    }

    async run (message, args, level) {
        try {
            let member = message.mentions.members.first();
            if (member) {
                await this.client.nekoslife.sfw.hug().then(json => {
                    if (member === message.author) {
                        let embed = new RichEmbed()
                            .setColor(0x00FFFF)
                            .setTitle(`Oh, you are hugging yourself? Well, let me hug you instead!`)
                            .setImage(json.url);
                        return message.channel.send({embed});
                    } else if (member === this.client.user) {
                        let embed = new RichEmbed()
                            .setColor(0x00FFFF)
                            .setTitle(`Oh, you are hugging me? I'm not that warm! 😳`)
                        return message.channel.send({embed});
                    }
                    let embed = new RichEmbed()
                        .setColor(0x00FFFF)
                        .setTitle(`${message.author.tag} hugged ${member.user.tag}!`)
                        .setImage(json.url);
                    message.channel.send({embed});
                });
            } else {
                let embed = new RichEmbed()
                    .setColor(0x00FFFF)
                    .setTitle(`${message.author.tag} got hugged!`)
                    .setImage(json.url);
                message.channel.send({embed});
            }
        } catch(err) {
            this.client.logger.error(err.stack);
            return this.client.embed("APIError", message);
        }
    }
}

module.exports = Hug;