const { SlashCommandBuilder } = require('@discordjs/builders');
const { url } = require('inspector');
const fetch = require("node-fetch")
const { MessageEmbed } = require('discord.js');
var randomColor = require('randomcolor')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('apod')
		.setDescription('Gets the nasa picture of the day!'),
	async execute(interaction) {
    await interaction.deferReply();
        try {
            fetch('https://api.nasa.gov/planetary/apod?api_key=A2PqnJVXsBkKFfUKUojEE1h6VaXpHlw2UKL8huIq').then(res => {
                return res.json();
              }).then( async (info) => {
                try{
                  const url = info['url']
                  const explanation = info['explanation']
                  console.log(url);
                  const embed = new MessageEmbed()
                    .setColor(randomColor())
                    .setTitle('NASA APOD')
                    .setDescription(explanation)
                    .setImage(url)
                    .setTimestamp()
                  await sleep(3000)
                  return interaction.editReply({ embeds: [embed]})
                }
                catch(err){
                  console.log(err)
                }
              })
          }
          catch(err){
            console.log(err)
          };
	},
};