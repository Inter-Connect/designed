const { SlashCommandBuilder } = require('@discordjs/builders');
const { getText } = require('../services/ai.js')
const { apiKey } = require('../config.json')
var randomColor = require('randomcolor')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getmood')
		.setDescription('gets the mood of what you say!')
        .addStringOption(option => option.setName('input').setDescription('Enter a string')),
	async execute(interaction) {
        await interaction.deferReply();
        const text = interaction.options.getString('input');
		const textReturn = await getMood(text, apiKey)
        const embed = new MessageEmbed()
            .setColor(randomColor())
            .setTitle('Your result')
            .setDescription(textReturn + '\n\n *Answer generated from https://deepai.org/*')
            .setTimestamp()
        await interaction.editReply({embeds: [embed]});
	},
};