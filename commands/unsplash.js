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
		.setName('unplash')
		.setDescription('Get a random unsplash picture!'),
	async execute(interaction) {
    await interaction.deferReply();
        try {
            fetch('https://api.unsplash.com/photos/random/?client_id=pkOzFzuIBOQN41aTYqt7P3ULHsjhHFj8r3UhYXOAsYw').then(res => {
                return res.json();
              }).then( async (info) => {
                try{
                  const url = info['urls']['regular']
                  const photoUrl = info['links']['html']
                  const download = info['links']['download']
                  const embed = new MessageEmbed()
                    .setColor(randomColor())
                    .setTitle('Your Image')
                    .setDescription(`[Support the creator](${photoUrl})\n[Download](${download})`)
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