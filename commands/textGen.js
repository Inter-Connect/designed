const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { getText } = require('../services/ai.js')
const { apiKey } = require('../config.json');
const randomColor = require('randomcolor');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('textgen')
		.setDescription('gets your text generation!')
        .addStringOption(option => option.setName('input').setDescription('Enter a string')),
	async execute(interaction) {
        await interaction.deferReply();
        const text = interaction.options.getString('input');
		const textReturn = await getText(text, apiKey)
        const result = new MessageEmbed()
            .setColor(randomColor())
            .setTitle('Your result')
            .setDescription(textReturn + '\n\n *Text generated from https://deepai.org/machine-learning-model/text-generator*')
            .setTimestamp()
        await interaction.editReply({embeds: [result]});
	},
};