const { SlashCommandBuilder } = require("discord.js");
const Entreprise = require("../../models/Entreprise");
module.exports = {
  data: new SlashCommandBuilder().setName("entreprise-liste").setDescription("Liste des entreprises"),
  async execute(interaction) {
    const list = await Entreprise.find().limit(20);
    if (!list.length) return interaction.reply("Aucune entreprise enregistrée.");
    const lines = ["Nom | Type | Employés | Fondateurs", "--- | --- | --- | ---"];
    for (const e of list) lines.push(`${e.name} | ${e.type || "Non renseigné"} | ${e.employeeCount ?? 0} | ${e.founders.map(id => `<@${id}>`).join(", ") || "Non renseigné"}`);
    await interaction.reply(lines.join("\n"));
  }
};
