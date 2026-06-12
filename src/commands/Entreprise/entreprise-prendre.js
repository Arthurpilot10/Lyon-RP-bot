const { SlashCommandBuilder } = require("discord.js");
const Entreprise = require("../../models/Entreprise");
module.exports = {
  data: new SlashCommandBuilder().setName("entreprise-prendre").setDescription("Utiliser les services d'une entreprise")
    .addStringOption(o => o.setName("entreprise").setDescription("Nom").setRequired(true))
    .addStringOption(o => o.setName("demande").setDescription("Demande").setRequired(true)),
  async execute(interaction) {
    const e = await Entreprise.findOne({ name: new RegExp(`^${interaction.options.getString("entreprise")}$`, "i") });
    if (!e) return interaction.reply({ content: "Entreprise introuvable.", ephemeral: true });
    await interaction.reply(`Demande envoyée pour ${e.name}. Client : ${interaction.user}. Demande : ${interaction.options.getString("demande")}.`);
  }
};
