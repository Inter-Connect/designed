const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Creates a poll')
        .addStringOption(option => option.setName('title').setDescription('Title for your embed').setRequired(true))
        .addStringOption(option => option.setName('description').setDescription('Enter a string').setRequired(true))
        .addStringOption(option => option.setName('color').setDescription('Enter a hexcode!').setRequired(true))
        .addStringOption(option => option.setName('options').setDescription('How many options?').setRequired(true).addChoice('Two options: Yes or No', 'yn').addChoice('Three options: Yes, No & Maybe.', 'ymn').addChoice('10 options, numbers 1-10', 'num'))
        .addStringOption(option => option.setName('image').setDescription('Enter a URL').setRequired(false)),
	async execute(interaction) {
        //getting data and formatting
        interaction.reply({content: 'You created an embed!', ephemeral: true})
        const title = interaction.options.getString('title');
        const color = interaction.options.getString('color');
        const image = interaction.options.getString('image');
        const option = interaction.options.getString('options');
        var instr
        if(option == 'yn') {
             instr = '\n\n 🔺 - Yes    🔻 - No'
         }
        else if(option == 'ymn') {
             instr = '\n\n 🔺 - Yes    🟥 - Maybe    🔻 - No'
        }
        else if(option == 'num') {
             instr = '\n\n React on a scale of 1-10'
        }
        const description = interaction.options.getString('description');

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
                .setDescription(description  + instr)
                .setColor(color)
                .setImage(image);
        }
		channel.createWebhook('Embed Webhook. If you see this, somethings wrong', {
            avatar: avatar,
        })
            .then(async webhook => {
                console.log(`Created webhook ${webhook}`)
                let message = await webhook.send({
                    username: interaction.member.displayName,
                    avatarURL: avatar,
                    embeds: [embed],
                });
                if(option == 'yn') {
                    await message.react('🔺')
                    await message.react('🔻')
                 }
                 else if(option == 'ymn') {
                     await message.react('🔺 ')
                     await message.react('🟥')
                     await message.react('🔻')
                  }
                  else if(option == 'num') {
                     await message.react('1️⃣')
                     await message.react('2️⃣')
                     await message.react('3️⃣')
                     await message.react('4️⃣')
                     await message.react('5️⃣')
                     await message.react('6️⃣')
                     await message.react('7️⃣')
                     await message.react('8️⃣')
                     await message.react('9️⃣')
                     await message.react('🔟')
                  }
                webhook.delete()
            })
            .catch(console.error)
	},
};