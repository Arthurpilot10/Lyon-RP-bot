const { SlashCommandBuilder } = require("discord.js");
const { getUser } = require("../../utils/users");
const config = require("../../config");
module.exports = {
  data: new SlashCommandBuilder().setName("solde").setDescription("Voir son solde"),
  async execute(interaction) {
    const user = await getUser(interaction.user.id);
    await interaction.reply({ content: `Solde : ${user.balance}${config.currency}.`, ephemeral: true });
  }
};
