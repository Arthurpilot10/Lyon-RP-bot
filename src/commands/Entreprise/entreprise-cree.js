const { SlashCommandBuilder } = require("discord.js");
const Entreprise = require("../../models/Entreprise");
module.exports = {
  data: new SlashCommandBuilder().setName("entreprise-cree").setDescription("Créer une entreprise")
    .addStringOption(o => o.setName("nom").setDescription("Nom").setRequired(true))
    .addStringOption(o => o.setName("type").setDescription("Type").setRequired(true))
    .addIntegerOption(o => o.setName("nombre_employes").setDescription("Nombre d'employés").setRequired(true).setMinValue(0))
    .addStringOption(o => o.setName("fondateurs").setDescription("Mentions des fondateurs").setRequired(true)),
  async execute(interaction) {
    await Entreprise.create({
      name: interaction.options.getString("nom"),
      type: interaction.options.getString("type"),
      employeeCount: interaction.options.getInteger("nombre_employes"),
      founders: interaction.options.getString("fondateurs").match(/\d{17,20}/g) || [],
      createdBy: interaction.user.id
    });
    await interaction.reply("Entreprise créée.");
  }
};
