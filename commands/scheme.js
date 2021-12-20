var ColorScheme = require('color-scheme');
const { createCanvas, loadImage } = require('canvas')
const { MessageAttachment, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
var randomColor = require('randomcolor')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scheme')
		.setDescription('Replies with Pong!')
        .addIntegerOption(option => option.setName('hue').setDescription('The hue of the starting color. 0 - 360').setRequired(true))
        .addStringOption(option => option.setName('type').setDescription('The type of scheme').setRequired(true).addChoice('Monochromatic- 4 colors', 'mono').addChoice('Contrast- 8 Colors', 'contrast').addChoice('Triade - 12 colors', 'triade').addChoice('Tetrade - 16 Colors', 'tetrade').addChoice('Analogic - 12 colors', 'analogic'))
        .addStringOption(option => option.setName('variation').setDescription('Alter the produced colors').setRequired(true).addChoice('Regular- No Change.', 'default').addChoice('Pastel- HSV high value and low-intermediate saturation.', 'pastel').addChoice('Soft- darker pastel colors.', 'soft').addChoice('Light- Very light, almost washed-out colors.', 'light').addChoice('Hard- Deeper, very saturated colors.', 'hard').addChoice('Pale- Colors with more gray; less saturated.', 'pale')),
	async execute(interaction) {
		var scheme = new ColorScheme;
        const type = interaction.options.getString('type');
        const variation = interaction.options.getString('variation');
        const hue = interaction.options.getInteger('hue');
        if(hue > 360) {
            return interaction.reply("Sorry, but hue can't be that large")
        }
        scheme.from_hue(hue)
            .scheme(type)
            .variation(variation);
        var colors = scheme.colors();

        const canvas = createCanvas(400, 200)
        const ctx = canvas.getContext('2d')
        for (let i = 0; i < colors.length; i++) {
            ctx.fillStyle = '#' + colors[i];
            ctx.fillRect(i * (400 / colors.length), 0, 400 / colors.length, 200);
        }
        const attachment = new MessageAttachment(canvas.toBuffer(), 'colors.png');


        const embed = new MessageEmbed()
            .setTitle('Your new color scheme!')
            .setDescription('#' + colors.toString().replace(new RegExp(',', 'g'), ' - #'))
            .setColor(randomColor())
            .setImage('attachment://colors.png')

        const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setLabel('Help with this')
				.setStyle('LINK')
                .setURL('https://scheme.designedbot.com'),
        );

        interaction.reply({ embeds: [embed], files: [attachment], components: [row] });
	},
};