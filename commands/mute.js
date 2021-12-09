const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Replies with Pong!')
        .addUserOption(option => option.setName('person').setDescription('Who do you want to mute?').setRequired(true)),
	async execute(interaction) {
        const user = interaction.options.getUser('person');
        const member = await interaction.member.guild.members.fetch(user.id) 
        try {
            let role= interaction.member.guild.roles.cache.find(role => role.name === "muted");
            member.roles.add(role);
        }
        catch(err) {
            console.log(err)
        }
        interaction.reply('ok')
	},
};