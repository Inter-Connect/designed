const { SlashCommandBuilder } = require('@discordjs/builders');
const randomColor = require('randomcolor');
const namer = require('color-namer')
const { MessageEmbed } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('color')
		.setDescription('Get a random, nice color!'),
	async execute(interaction) {
        let color = randomColor()
        let names = namer(color, { pick: ['ntc'] })
        const embed = new MessageEmbed()
            .setColor(color)
            .setTitle('Your new color!')
            .setDescription('Hex: `' + color + '` Name: `' + names.ntc[0].name + '`\n\nSee it on the side of this embed!')
            .setTimestamp()
        await interaction.reply({embeds: [embed]})
	},
};