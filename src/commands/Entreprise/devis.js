const { SlashCommandBuilder } = require("discord.js");
const Devis = require("../../models/Devis");
const config = require("../../config");
module.exports = {
  data: new SlashCommandBuilder().setName("devis").setDescription("Envoyer un devis")
    .addUserOption(o => o.setName("client").setDescription("Client").setRequired(true))
    .addStringOption(o => o.setName("entreprise").setDescription("Entreprise").setRequired(true))
    .addIntegerOption(o => o.setName("montant").setDescription("Montant").setRequired(true).setMinValue(1))
    .addStringOption(o => o.setName("description").setDescription("Description").setRequired(true)),
  async execute(interaction) {
    const client = interaction.options.getUser("client");
    const devis = await Devis.create({ targetId: client.id, authorId: interaction.user.id, entreprise: interaction.options.getString("entreprise"), amount: interaction.options.getInteger("montant"), description: interaction.options.getString("description") });
    await interaction.reply(`Devis envoyé à ${client}. ID : ${devis._id}. Montant : ${devis.amount}${config.currency}.`);
  }
};
