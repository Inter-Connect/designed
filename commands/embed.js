const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('Makes your message an embed')
        .addStringOption(option => option.setName('title').setDescription('Title for your embed').setRequired(true))
        .addStringOption(option => option.setName('description').setDescription('Enter a string').setRequired(true))
        .addStringOption(option => option.setName('color').setDescription('Enter a hexcode!').setRequired(true))
        .addStringOption(option => option.setName('image').setDescription('Enter a URL').setRequired(false)),
	async execute(interaction) {
        //getting data and formatting
        interaction.reply({content: 'You created an embed!', ephemeral: true})
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const color = interaction.options.getString('color');
        const image = interaction.options.getString('image');
        //posting the embed
        let channel = interaction.channel
        let avatar = interaction.member.displayAvatarURL({ format: 'jpg' })
        var embed
        if(image) {
            embed = new MessageEmbed()
                .setTitle(title)
                .setDescription(description)
                .setColor(color)
                .setImage(image);
        }
        else {
            embed = new MessageEmbed()
                .setTitle(title)
                .setDescription(description)
                .setColor(color)
                .setImage(image);
        }
		channel.createWebhook('Embed Webhook. If you see this, somethings wrong', {
            avatar: avatar,
        })
            .then(async webhook => {
                console.log(`Created webhook ${webhook}`)
                await webhook.send({
                    username: interaction.member.displayName,
                    avatarURL: avatar,
                    embeds: [embed],
                });
                webhook.delete()
            })
            .catch(console.error)
	},
};