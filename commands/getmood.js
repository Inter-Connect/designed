const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { getMood } = require('../services/ai.js')
const { apiKey } = require('../config.json')
var randomColor = require('randomcolor')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getmood')
		.setDescription('gets the mood of what you say!')
        .addStringOption(option => option.setName('input').setDescription('Enter a string').setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const text = interaction.options.getString('input');
		const textReturn = await getMood(text, apiKey)
        const embed = new MessageEmbed()
            .setColor(randomColor())
            .setTitle('Your result')
            .setDescription(textReturn + '\n\n *Answer generated from https://deepai.org/*')
            .setTimestamp()
        await sleep(3000)
        await interaction.editReply({embeds: [embed]});
	},
};