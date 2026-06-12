const { SlashCommandBuilder } = require("discord.js");
const Devis = require("../../models/Devis");
const { getUser } = require("../../utils/users");
const config = require("../../config");
module.exports = {
  data: new SlashCommandBuilder().setName("devis-accepter").setDescription("Accepter un devis")
    .addStringOption(o => o.setName("id").setDescription("ID du devis").setRequired(true)),
  async execute(interaction) {
    const devis = await Devis.findById(interaction.options.getString("id"));
    if (!devis || devis.targetId !== interaction.user.id) return interaction.reply({ content: "Devis introuvable.", ephemeral: true });
    if (devis.status !== "en attente") return interaction.reply({ content: "Ce devis n'est plus en attente.", ephemeral: true });
    const client = await getUser(interaction.user.id);
    if (client.balance < devis.amount) return interaction.reply({ content: "Solde insuffisant.", ephemeral: true });
    const author = await getUser(devis.authorId);
    client.balance -= devis.amount; author.balance += devis.amount; devis.status = "accepté";
    await client.save(); await author.save(); await devis.save();
    await interaction.reply(`Devis accepté. Montant payé : ${devis.amount}${config.currency}.`);
  }
};
