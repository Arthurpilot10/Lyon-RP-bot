const { SlashCommandBuilder } = require("discord.js");
const Devis = require("../../models/Devis");
module.exports = {
  data: new SlashCommandBuilder().setName("devis-refuser").setDescription("Refuser un devis")
    .addStringOption(o => o.setName("id").setDescription("ID du devis").setRequired(true)),
  async execute(interaction) {
    const devis = await Devis.findById(interaction.options.getString("id"));
    if (!devis || devis.targetId !== interaction.user.id) return interaction.reply({ content: "Devis introuvable.", ephemeral: true });
    if (devis.status !== "en attente") return interaction.reply({ content: "Ce devis n'est plus en attente.", ephemeral: true });
    devis.status = "refusé"; await devis.save();
    await interaction.reply("Devis refusé.");
  }
};
