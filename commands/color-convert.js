const { SlashCommandBuilder } = require('@discordjs/builders');
var convert = require('color-convert');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('convert')
		.setDescription('Convert color formats!')
        .addStringOption(option => option.setName('input').setDescription('What do you want to go into the converter? (rbg support will be added soon)').setRequired(true).addChoice('hexcode', 'hexcode').addChoice('name', 'name'))
        .addStringOption(option => option.setName('output').setDescription('What do you want to come out?').setRequired(true).addChoice('hexcode', 'hexcode').addChoice('rgb', 'rgb').addChoice('name', 'name'))
        .addStringOption(option => option.setName('color').setDescription('Enter a color').setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('input');
        const output = interaction.options.getString('output');
        var color = interaction.options.getString('color');
        var conversion

        console.log(input)
        console.log(output)
        console.log(color)

        if(color.charAt(0) !== '#' && input === 'hexcode') {
            color = '#' + color
        }

        if(input === 'hexcode') {
            if(output === 'hexcode') {
                conversion = color
            }
            else if(output === 'color') {
                conversion = convert.hex.keyword(color)
            }
            else if(output === 'rgb') {
                conversion = convert.hex.rgb(color)
            }
        }
        else if(input === 'color') {
            try {
                if(output === 'color') {
                    conversion = color
                }
                else if(output === 'hexcode') {
                    conversion = convert.keyword.hex(color)
                }
                else if(output === 'rgb') {
                    conversion = convert.keyword.rgb(color)
                }
            }
            catch(err){
                conversion = "Uh oh, it seems that didn't work!"
            }
        }
        await interaction.reply(conversion + ' ')
	},
};