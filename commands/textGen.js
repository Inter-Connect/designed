const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { getText } = require('../services/ai.js')
const { apiKey } = require('../config.json');
const randomColor = require('randomcolor');
const Filter = require('swearzh')
    filter = new Filter({
        englishList: ['naked']
    })


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('textgen')
		.setDescription('Generate text based on a prompt using an AI')
        .addStringOption(option => option.setName('input').setDescription('Enter a prompt').setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const text = interaction.options.getString('input');
		var textReturn = await getText(text, apiKey)
        textReturn = textReturn  + '\n\n *Text generated from https://deepai.org/machine-learning-model/text-generator*'
        if(filter.isProfane(text)) {
            textReturn = "Unfortunatly, this text was deemed innapropriate, and has been removed."
        }
        const result = new MessageEmbed()
            .setColor(randomColor())
            .setTitle('Your result')
            .setDescription(textReturn)
            .setTimestamp()
        await sleep(3000)
        await interaction.editReply({embeds: [result]});
	},
};